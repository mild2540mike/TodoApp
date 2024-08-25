import { decryptAES, encryptAES } from "@/lib/encryption-utils"

const encryptedLocalStorage = {
    getItem: (name: string) => {
        const str = localStorage.getItem(name)
        if (!str) return null

        const val = (process.env.NEXT_PUBLIC_TODO_STORE_LOCAL_STORAGE_ENCRYPT_ENABLE === '1' 
            ? decryptAES(str, process.env.NEXT_PUBLIC_TODO_SERVER_CLIENT_ENCRYPT_SALT, process.env.NEXT_PUBLIC_TODO_SERVER_CLIENT_ENCRYPT_SECRET) 
            : str)

        return JSON.parse(val)
    },
    setItem: (name: string, value: string) => {
        const str = JSON.stringify(value)
        
        const val = (process.env.NEXT_PUBLIC_TODO_STORE_LOCAL_STORAGE_ENCRYPT_ENABLE === '1' 
            ? encryptAES(str, process.env.NEXT_PUBLIC_TODO_SERVER_CLIENT_ENCRYPT_SALT, process.env.NEXT_PUBLIC_TODO_SERVER_CLIENT_ENCRYPT_SECRET) 
            : str)

        localStorage.setItem(name, val)
    },
    removeItem: (name: string) => localStorage.removeItem(name),
}

export {
    encryptedLocalStorage
}