import { create } from "zustand"

type ToastType = "default" | "success" | "error"

interface ToastState {
  message: string
  type: ToastType
  isOpen: boolean
  showToast: (message: string, type?: ToastType) => void
  hideToast: () => void
}

export const useToast = create<ToastState>((set) => ({
  message: "",
  type: "default",
  isOpen: false,
  showToast: (message: string, type: ToastType = "default") =>
    set({ message, type, isOpen: true }),
  hideToast: () => set({ isOpen: false }),
}))