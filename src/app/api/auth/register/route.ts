import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    // Verificar se as variáveis de ambiente do Supabase estão configuradas
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('❌ Supabase environment variables not configured:', {
        hasUrl: !!supabaseUrl,
        hasServiceKey: !!supabaseServiceKey
      })
      return NextResponse.json(
        { 
          error: 'Configuração do Supabase incompleta.',
          details: 'Configure as variáveis NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY'
        },
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
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
    const { data: existingUser, error: listError } = await supabaseAdmin.auth.admin.listUsers()
    
    if (listError) {
      console.error('❌ Erro ao listar usuários:', listError)
      return NextResponse.json(
        { error: 'Erro ao verificar usuário existente' },
        { status: 500 }
      )
    }

    const userExists = existingUser?.users.find(u => u.email === email)

    if (userExists) {
      return NextResponse.json(
        { error: 'Este email já está cadastrado' },
        { status: 400 }
      )
    }

    // Criar usuário no Supabase com confirmação automática de email
    // O Supabase Auth enviará o email de confirmação automaticamente
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: false, // Supabase enviará email de confirmação
      user_metadata: {
        email
      }
    })

    if (authError || !authData.user) {
      console.error('❌ Erro ao criar usuário:', authError)
      return NextResponse.json(
        { error: 'Erro ao criar usuário. Tente novamente.' },
        { status: 500 }
      )
    }

    console.log('✅ Usuário criado no Supabase Auth:', authData.user.id)

    // Criar perfil do usuário
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .insert({
        id: authData.user.id,
        email: email,
        full_name: null,
        avatar_url: null
      })

    if (profileError) {
      console.warn('⚠️ Erro ao criar perfil (tabela pode não existir):', profileError)
    }

    // O Supabase Auth enviará automaticamente o email de confirmação
    console.log('✅ Email de confirmação será enviado pelo Supabase Auth')

    return NextResponse.json({
      success: true,
      message: 'Usuário criado com sucesso! Verifique seu email para confirmar o cadastro.',
      userId: authData.user.id,
      email: email
    })

  } catch (error) {
    console.error('❌ Erro no registro:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
