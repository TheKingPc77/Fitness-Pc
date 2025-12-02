import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

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

    // Verificar se email já foi confirmado
    if (user.email_confirmed_at) {
      return NextResponse.json(
        { error: 'Email já confirmado' },
        { status: 400 }
      )
    }

    // Reenviar email de confirmação usando Supabase Auth
    const { error: resendError } = await supabaseAdmin.auth.admin.generateLink({
      type: 'signup',
      email: email,
    })

    if (resendError) {
      console.error('❌ Erro ao reenviar email:', resendError)
      return NextResponse.json(
        { error: 'Erro ao reenviar email de confirmação' },
        { status: 500 }
      )
    }

    console.log('✅ Email de confirmação reenviado para:', email)

    return NextResponse.json({
      success: true,
      message: 'Email de confirmação reenviado com sucesso!'
    })

  } catch (error) {
    console.error('Erro ao reenviar email:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
