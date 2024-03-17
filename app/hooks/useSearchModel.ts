import { create } from "zustand"

interface SearchModel {
    open: boolean
    onOpen: () => void
    onClose: () => void
}



const useSearchModel = create<SearchModel>((set) => ({
    open: false,
    onOpen: () => set({ open: true }),
    onClose: () => set({ open: false })
}))

export default useSearchModel