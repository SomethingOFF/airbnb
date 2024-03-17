import { create } from "zustand"

interface LoginModelStore {
    open: boolean
    onOpen: () => void
    onClose: () => void
}



const useLoginModel = create<LoginModelStore>((set) => ({
    open: false,
    onOpen: () => set({ open: true }),
    onClose: () => set({ open: false })
}))

export default useLoginModel