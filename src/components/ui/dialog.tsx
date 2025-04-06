
import * as React from "react"
import { cn } from "@/lib/utils"

export interface DialogProps extends React.HTMLAttributes<HTMLDialogElement> {
  open?: boolean
  onClose?: () => void
}

const Dialog = React.forwardRef<HTMLDialogElement, DialogProps>(
  ({ className, children, open, onClose, ...props }, ref) => {
    const dialogRef = React.useRef<HTMLDialogElement>(null)

    React.useEffect(() => {
      const dialog = dialogRef.current
      if (!dialog) return

      if (open) {
        dialog.showModal()
      } else {
        dialog.close()
      }
    }, [open])

    return (
      <dialog
        ref={dialogRef}
        className={cn(
          "relative z-50 rounded-lg bg-background p-6 shadow-lg",
          className
        )}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose?.()
          }
        }}
        {...props}
      >
        {children}
      </dialog>
    )
  }
)
Dialog.displayName = "Dialog"

const DialogContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("space-y-4", className)}
    {...props}
  >
    {children}
  </div>
))
DialogContent.displayName = "DialogContent"

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
DialogTitle.displayName = "DialogTitle"

const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = "DialogDescription"

export {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
}
