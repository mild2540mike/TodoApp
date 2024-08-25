import { NextRequest, NextResponse } from 'next/server'
import { decryptCookieValue } from './lib/cookie-utils';
 
export function middleware(request: NextRequest) {
    const cookie = request.cookies.get('LOGIN');
    const val = decryptCookieValue(cookie?.value);

    if (!val) {
        return NextResponse.rewrite(new URL('/', request.url));
    }
}
 
export const config = {
  matcher: '/home/:path*',
}