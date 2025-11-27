import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Inicializar Resend apenas se a API key estiver disponível
const resendApiKey = process.env.RESEND_API_KEY
const resend = resendApiKey ? new Resend(resendApiKey) : null

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

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email é obrigatório' },
        { status: 400 }
      )
    }

    // Buscar usuário pelo email
    const { data: users } = await supabaseAdmin.auth.admin.listUsers()
    const user = users?.users.find(u => u.email === email)

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      )
    }

    // Verificar se já existe código não expirado
    const { data: existingCode } = await supabaseAdmin
      .from('user_verifications')
      .select('*')
      .eq('email', email)
      .eq('verified', false)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (existingCode) {
      const expiresAt = new Date(existingCode.expires_at)
      const now = new Date()
      
      // Se código ainda é válido (menos de 10 minutos), não permitir reenvio
      if (now < expiresAt) {
        const minutesLeft = Math.ceil((expiresAt.getTime() - now.getTime()) / 60000)
        return NextResponse.json(
          { error: `Código ainda válido. Aguarde ${minutesLeft} minuto(s) para solicitar novo código.` },
          { status: 429 }
        )
      }
    }

    // Gerar novo código
    const otpCode = generateOTP()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutos

    // Salvar novo código
    const { error: dbError } = await supabaseAdmin
      .from('user_verifications')
      .insert({
        user_id: user.id,
        email: email,
        otp_code: otpCode,
        expires_at: expiresAt.toISOString(),
        verified: false
      })

    if (dbError) {
      console.error('Erro ao salvar código:', dbError)
      return NextResponse.json(
        { error: 'Erro ao gerar novo código' },
        { status: 500 }
      )
    }

    // Enviar email apenas se Resend estiver configurado
    if (resend) {
      try {
        await resend.emails.send({
          from: 'FitAI Pro <onboarding@resend.dev>',
          to: email,
          subject: 'Novo código de verificação - FitAI Pro',
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Novo código de verificação</title>
              </head>
              <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
                <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
                  <tr>
                    <td align="center">
                      <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
                        <tr>
                          <td style="background: linear-gradient(135deg, #f97316 0%, #ec4899 50%, #a855f7 100%); padding: 40px 30px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold;">⚡ FitAI Pro</h1>
                            <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 16px; opacity: 0.9;">Seu personal trainer inteligente</p>
                          </td>
                        </tr>
                        
                        <tr>
                          <td style="padding: 40px 30px;">
                            <h2 style="margin: 0 0 20px 0; color: #1e293b; font-size: 24px; font-weight: bold;">Novo código de verificação 🔄</h2>
                            
                            <p style="margin: 0 0 20px 0; color: #475569; font-size: 16px; line-height: 1.6;">
                              Você solicitou um novo código de verificação. Use o código abaixo para confirmar seu cadastro:
                            </p>
                            
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                              <tr>
                                <td align="center" style="background-color: #f1f5f9; border-radius: 12px; padding: 30px;">
                                  <p style="margin: 0 0 10px 0; color: #64748b; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Seu novo código</p>
                                  <p style="margin: 0; color: #1e293b; font-size: 48px; font-weight: bold; letter-spacing: 8px; font-family: 'Courier New', monospace;">${otpCode}</p>
                                </td>
                              </tr>
                            </table>
                            
                            <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 8px; margin: 20px 0;">
                              <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.6;">
                                ⏰ <strong>Atenção:</strong> Este código expira em <strong>10 minutos</strong>.
                              </p>
                            </div>
                          </td>
                        </tr>
                        
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

        console.log('✅ Novo código enviado para:', email)
      } catch (emailError) {
        console.error('❌ Erro ao enviar email:', emailError)
      }
    } else {
      console.warn('⚠️ Resend API key não configurada - email não enviado')
    }

    return NextResponse.json({
      success: true,
      message: 'Novo código enviado com sucesso!'
    })

  } catch (error) {
    console.error('Erro ao reenviar código:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}