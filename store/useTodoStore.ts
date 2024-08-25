
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { encryptedSessionLocalStorage } from './encryptedSessionLocalStorage'

const initialState = {
    id: '',
    id_removed: '',
}

const useTodoStore = create(
    persist(
        (set) => ({
            ...initialState,
            setId: (val: any) => set({ id: val }),
            setIdRemoved: (val: any) => set({ id_removed: val }),
        }),
        {
            name: 'TODO_STORE',
            storage: createJSONStorage(() => encryptedSessionLocalStorage),
        },
    ),
)

export default useTodoStore