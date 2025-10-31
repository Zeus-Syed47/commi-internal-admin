// store/editStore.ts
import { create } from 'zustand'

interface EditState {
  isEditing: boolean
  setEditing: (value: boolean) => void
  toggleEditing: () => void
}

export const useEditStore = create<EditState>((set) => ({
  isEditing: false,
  setEditing: (value) => set({ isEditing: value }),
  toggleEditing: () => set((state) => ({ isEditing: !state.isEditing })),
}))
