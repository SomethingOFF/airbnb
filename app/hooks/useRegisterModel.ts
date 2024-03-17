import { create } from "zustand"

interface RegisterModelStore {
    open: boolean
    onOpen: () => void
    onClose: () => void
}



const useRegisterModel = create<RegisterModelStore>((set) => ({
    open: false,
    onOpen: () => set({ open: true }),
    onClose: () => set({ open: false })
}))

export default useRegisterModel