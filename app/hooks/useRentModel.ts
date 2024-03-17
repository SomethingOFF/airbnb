import { create } from "zustand"

interface RentModelStore {
    open: boolean
    onOpen: () => void
    onClose: () => void
}



const useRentModel = create<RentModelStore>((set) => ({
    open: false,
    onOpen: () => set({ open: true }),
    onClose: () => set({ open: false })
}))

export default useRentModel