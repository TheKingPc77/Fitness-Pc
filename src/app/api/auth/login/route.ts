import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('❌ Supabase environment variables not configured')
      return NextResponse.json(
        { 
          error: 'Configuração do Supabase incompleta.',
          details: 'Configure as variáveis NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY'
        },
        { status: 503 }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email é obrigatório' },
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

    // PASSWORDLESS OTP: Enviar OTP via Supabase (6 dígitos)
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true, // Permite criar usuário se não existir
      }
    })

    if (error) {
      console.error('❌ Erro ao enviar OTP:', error)
      return NextResponse.json(
        { error: error.message || 'Erro ao enviar código. Tente novamente.' },
        { status: 500 }
      )
    }

    console.log('✅ OTP de login enviado para:', email)

    return NextResponse.json({
      success: true,
      message: 'Código de verificação enviado! Verifique seu email.',
      email: email
    })

  } catch (error) {
    console.error('❌ Erro no login:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
