"use client"

import { Toast } from "./toast"
import { useToast } from "@/hooks/use-toast"

export function Toaster() {
  const { toasts, removeToast } = useToast()

  return (
    <>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          variant={toast.variant}
          onClose={() => removeToast(toast.id)}
        >
          {toast.message}
        </Toast>
      ))}
    </>
  )
}