'use client'

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface SheetProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  side?: 'right' | 'left' | 'top' | 'bottom'
}

export function Sheet({ isOpen, onClose, children, side = 'right' }: SheetProps) {
  const sideClasses = {
    right: 'right-0',
    left: 'left-0',
    top: 'top-0',
    bottom: 'bottom-0'
  }

  return isOpen ? (
    <>
      <div 
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div 
        className={cn(
          "fixed z-50 h-full w-full gap-4 bg-background p-6 shadow-lg transition-transform", 
          "sm:max-w-sm",
          sideClasses[side]
        )}
      >
        {children}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      </div>
    </>
  ) : null
}