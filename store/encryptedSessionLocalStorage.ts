import { encryptAES, decryptAES } from '@/lib/encryption-utils';

const NEXT_PUBLIC_TODO_STORE_LOCAL_STORAGE_EXPIRE_MINUTE = process.env.NEXT_PUBLIC_TODO_STORE_LOCAL_STORAGE_EXPIRE_MINUTE || '60'

const encryptedSessionLocalStorage = {
    getItem: (name: any) => {
        const str = localStorage.getItem(name)
        if (!str) return null

        const val = (process.env.NEXT_PUBLIC_TODO_STORE_LOCAL_STORAGE_ENCRYPT_ENABLE === '1' 
            ? decryptAES(str, process.env.NEXT_PUBLIC_TODO_STORE_LOCAL_STORAGE_ENCRYPT_SALT, process.env.NEXT_PUBLIC_TODO_STORE_LOCAL_STORAGE_ENCRYPT_SECRET) 
            : str)

        let item = val
        let expire = parseInt(item.LOCAL_STORAGE_EXPIRED)
        if (isNaN(expire)? 0 : expire < Date.now()) {
            localStorage.removeItem(name)
            return null
        }
        return item
    },
    setItem: (name: any, value: any) => {
        const obj = JSON.parse(value)
        obj.LOCAL_STORAGE_EXPIRED = Date.now() + (parseInt(NEXT_PUBLIC_TODO_STORE_LOCAL_STORAGE_EXPIRE_MINUTE) * 60 * 1000)
        const str = JSON.stringify(obj)
        
        const val = (process.env.NEXT_PUBLIC_TODO_STORE_LOCAL_STORAGE_ENCRYPT_ENABLE === '1' 
            ? encryptAES(str, process.env.NEXT_PUBLIC_TODO_STORE_LOCAL_STORAGE_ENCRYPT_SALT, process.env.NEXT_PUBLIC_TODO_STORE_LOCAL_STORAGE_ENCRYPT_SECRET) 
            : str)

        localStorage.setItem(name, val)
    },
    removeItem: (name: any) => localStorage.removeItem(name),
}

export {
    encryptedSessionLocalStorage
}