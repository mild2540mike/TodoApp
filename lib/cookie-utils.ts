import nookies from 'nookies';
import { encryptAES, decryptAES } from '@/lib/encryption-utils';

const NEXT_PUBLIC_TODO_STORE_COOKIE_EXPIRE_MINUTE = process.env.NEXT_PUBLIC_TODO_STORE_COOKIE_EXPIRE_MINUTE || '60'

const cookieOptions = () => {
    return {
        maxAge: parseInt(NEXT_PUBLIC_TODO_STORE_COOKIE_EXPIRE_MINUTE) * 60,
        path: '/',
        sameSite: true,
        secure: true,
    }
}

function setCookieValue(name: any, value: any) {
    return {
        name: name,
        value: encryptCookieValue(value),
        ...cookieOptions,
      }
}

function encryptCookieValueOptions(value: any, enable: any, secret: any, salt: any) {
    return (enable === '1'
    ? encryptAES(value, salt, secret)
    : JSON.stringify(value))
}

function decryptCookieValueOptions(value: any, enable: any, secret: any, salt: any) {
    try {
        return (enable === '1'
        ? decryptAES(value, salt, secret)
        : JSON.parse(value))
    } catch (err) {
        return null
    }
}

function encryptCookieValue(value: any) {
    return encryptCookieValueOptions(value, process.env.NEXT_PUBLIC_TODO_STORE_COOKIE_ENCRYPT_ENABLE, process.env.NEXT_PUBLIC_TODO_STORE_COOKIE_ENCRYPT_SECRET, process.env.NEXT_PUBLIC_TODO_STORE_COOKIE_ENCRYPT_SALT)
}

function decryptCookieValue(value: any) {
    return decryptCookieValueOptions(value, process.env.NEXT_PUBLIC_TODO_STORE_COOKIE_ENCRYPT_ENABLE, process.env.NEXT_PUBLIC_TODO_STORE_COOKIE_ENCRYPT_SECRET, process.env.NEXT_PUBLIC_TODO_STORE_COOKIE_ENCRYPT_SALT)
}

function getCookieServer(context: any, name: any) {
    const str = nookies.get(context)[name]
    if (!str) return null
    const val = decryptCookieValue(str)

    return val
}

function setCookieServer(context: any, name: any, value: any) {
    const str = JSON.stringify(value)
    const val = encryptCookieValue(str)

    nookies.set(context, name, val, cookieOptions)
}

function getCookieClient(name: any) {
    return getCookieServer(null, name)
}

function setCookieClient(name: any, value: any) {
    setCookieServer(null, name, value)
}

export {
    cookieOptions,
    encryptCookieValueOptions,
    decryptCookieValueOptions,
    encryptCookieValue,
    decryptCookieValue,
    setCookieValue,
    getCookieServer,
    setCookieServer,
    getCookieClient,
    setCookieClient
}