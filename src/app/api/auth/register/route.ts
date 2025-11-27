import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Gerar código OTP de 4 dígitos
function generateOTP(): string {
  return Math.floor(1000 + Math.random() * 9000).toString()
}

export async function POST(request: NextRequest) {
  try {
    // Verificar se as variáveis de ambiente do Supabase estão configuradas
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Supabase environment variables not configured')
      return NextResponse.json(
        { error: 'Serviço temporariamente indisponível' },
        { status: 503 }
      )
    }

    // Cliente Supabase com service role para operações admin
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios' },
        { status: 400 }
      )
    }

    // Validar formato de email
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      )
    }

    // Validar senha (mínimo 6 caracteres)
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Senha deve ter no mínimo 6 caracteres' },
        { status: 400 }
      )
    }

    // Verificar se usuário já existe
    const { data: existingUser } = await supabaseAdmin.auth.admin.listUsers()
    const userExists = existingUser?.users.find(u => u.email === email)

    if (userExists) {
      return NextResponse.json(
        { error: 'Este email já está cadastrado' },
        { status: 400 }
      )
    }

    // Criar usuário no Supabase (sem confirmação automática)
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: false, // Não confirmar automaticamente
      user_metadata: {
        email
      }
    })

    if (authError || !authData.user) {
      console.error('Erro ao criar usuário:', authError)
      return NextResponse.json(
        { error: 'Erro ao criar usuário. Tente novamente.' },
        { status: 500 }
      )
    }

    // Gerar código OTP de 4 dígitos
    const otpCode = generateOTP()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutos

    // Salvar código no banco
    const { error: dbError } = await supabaseAdmin
      .from('user_verifications')
      .insert({
        user_id: authData.user.id,
        email: email,
        otp_code: otpCode,
        expires_at: expiresAt.toISOString(),
        verified: false
      })

    if (dbError) {
      console.error('Erro ao salvar código:', dbError)
      // Tentar deletar usuário criado
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id)
      return NextResponse.json(
        { error: 'Erro ao processar registro. Tente novamente.' },
        { status: 500 }
      )
    }

    // Enviar email com código (apenas se RESEND_API_KEY estiver configurada)
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend')
        const resend = new Resend(process.env.RESEND_API_KEY)
        
        await resend.emails.send({
          from: 'FitAI Pro <onboarding@resend.dev>',
          to: email,
          subject: 'Confirme seu cadastro - FitAI Pro',
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset=\"utf-8">
                <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0">
                <title>Confirme seu cadastro</title>
              </head>
              <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
                <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
                  <tr>
                    <td align="center">
                      <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
                        <!-- Header -->
                        <tr>
                          <td style="background: linear-gradient(135deg, #f97316 0%, #ec4899 50%, #a855f7 100%); padding: 40px 30px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold;">⚡ FitAI Pro</h1>
                            <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 16px; opacity: 0.9;">Seu personal trainer inteligente</p>
                          </td>
                        </tr>
                        
                        <!-- Content -->
                        <tr>
                          <td style="padding: 40px 30px;">
                            <h2 style="margin: 0 0 20px 0; color: #1e293b; font-size: 24px; font-weight: bold;">Bem-vindo ao FitAI Pro! 🎉</h2>
                            
                            <p style="margin: 0 0 20px 0; color: #475569; font-size: 16px; line-height: 1.6;">
                              Estamos muito felizes em ter você conosco! Para completar seu cadastro e começar sua jornada fitness, use o código de verificação abaixo:
                            </p>
                            
                            <!-- OTP Code Box -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                              <tr>
                                <td align="center" style="background-color: #f1f5f9; border-radius: 12px; padding: 30px;">
                                  <p style="margin: 0 0 10px 0; color: #64748b; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Seu código de verificação</p>
                                  <p style="margin: 0; color: #1e293b; font-size: 48px; font-weight: bold; letter-spacing: 8px; font-family: 'Courier New', monospace;">${otpCode}</p>
                                </td>
                              </tr>
                            </table>
                            
                            <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 8px; margin: 20px 0;">
                              <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.6;">
                                ⏰ <strong>Atenção:</strong> Este código expira em <strong>10 minutos</strong>. Se você não solicitou este cadastro, ignore este email.
                              </p>
                            </div>
                            
                            <p style="margin: 20px 0 0 0; color: #475569; font-size: 14px; line-height: 1.6;">
                              Após inserir o código, você terá acesso completo a:
                            </p>
                            
                            <ul style="margin: 10px 0 0 0; padding-left: 20px; color: #475569; font-size: 14px; line-height: 1.8;">
                              <li>Planos de treino personalizados com IA</li>
                              <li>Acompanhamento de progresso com fotos</li>
                              <li>Dietas adaptadas aos seus objetivos</li>
                              <li>Análise inteligente de refeições</li>
                            </ul>
                          </td>
                        </tr>
                        
                        <!-- Footer -->
                        <tr>
                          <td style="background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                            <p style="margin: 0 0 10px 0; color: #64748b; font-size: 14px;">
                              Precisa de ajuda? Entre em contato conosco
                            </p>
                            <p style="margin: 0; color: #94a3b8; font-size: 12px;">
                              © ${new Date().getFullYear()} FitAI Pro. Todos os direitos reservados.
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </body>
            </html>
          `
        })

        console.log('✅ Email enviado com sucesso para:', email)
      } catch (emailError) {
        console.error('❌ Erro ao enviar email:', emailError)
        // Não falhar o registro se o email falhar, apenas logar
      }
    } else {
      console.log('⚠️ RESEND_API_KEY não configurada. Email não enviado. Código OTP:', otpCode)
    }

    return NextResponse.json({
      success: true,
      message: 'Usuário criado com sucesso! Verifique seu email.',
      userId: authData.user.id,
      email: email
    })

  } catch (error) {
    console.error('Erro no registro:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}