import { NextResponse } from 'next/server'

export async function GET() {
    try {
      const response = NextResponse.json({ message: 'Déconnecté' });
      response.cookies.set('session', '', { maxAge: 0, path: '/', httpOnly: true });
      return response;
    } catch (error) {
      return NextResponse.json({ message: 'Erreur pendant la déconnexion' }, { status: 500 });
    }
  }