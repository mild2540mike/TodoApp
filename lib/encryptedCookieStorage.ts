import nookies from 'nookies';
import { decryptCookieValue, encryptCookieValue } from '@/lib/cookie-utils';

const NEXT_PUBLIC_TODO_STORE_COOKIE_EXPIRE_MINUTE = process.env.NEXT_PUBLIC_TODO_STORE_COOKIE_EXPIRE_MINUTE || '60'

const encryptedCookieStorage = {
    getItem: (name: any) => {
        const str = nookies.get(null)[name]
        if (!str) return null

        const val = decryptCookieValue(str)
        return JSON.parse(val)
    },
    setItem: (name: any, value: any) => {
        const str = JSON.stringify(value)
        const val = encryptCookieValue(str)
            
        nookies.set(null, name, val, {
            maxAge: parseInt(NEXT_PUBLIC_TODO_STORE_COOKIE_EXPIRE_MINUTE) * 60,
            path: '/',
            sameSite: true,
            secure: true,
        })
    },
    removeItem: (name: any) => nookies.destroy(null, name),
}

export {
    encryptedCookieStorage
}