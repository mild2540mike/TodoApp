
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { encryptedCookieStorage } from '@/store/encryptedCookieStorage'

const initialState = {
    username: '',
    access_token: '',
}

const useLoginStore = create(
    persist(
        (set) => ({
            ...initialState,
            setAll: (val: any) => set(val),
        }),
        {
            name: 'LOGIN',
            storage: createJSONStorage(() => encryptedCookieStorage),
        },
    ),
)

export default useLoginStore