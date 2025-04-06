"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const toastVariants = cva(
  "fixed bottom-4 right-4 flex items-center justify-between p-4 rounded-lg shadow-lg transition-all transform translate-y-0",
  {
    variants: {
      variant: {
        default: "bg-white text-gray-900 dark:bg-gray-800 dark:text-white",
        success: "bg-green-500 text-white",
        error: "bg-red-500 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface ToastProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof toastVariants> {
  onClose?: () => void
}

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant, onClose, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(toastVariants({ variant }), className)} {...props}>
        <div className="mr-2">{children}</div>
        {onClose && (
          <button onClick={onClose} className="p-1 hover:opacity-70 transition-opacity">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    )
  }
)
Toast.displayName = "Toast"

export { type ToastProps }