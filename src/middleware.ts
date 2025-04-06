
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const isAuth = request.cookies.has('auth')
  
  if (!isAuth && request.nextUrl.pathname.startsWith('/account')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/account/:path*',
}
