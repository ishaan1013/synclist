import * as React from "react"
import { VariantProps, cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none data-[state=open]:bg-zinc-100",
  {
    variants: {
      variant: {
        default: "bg-zinc-900 text-white hover:bg-zinc-700",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        outline: "bg-transparent border border-zinc-200 hover:bg-zinc-100",
        subtle: "bg-zinc-100 text-zinc-900 hover:bg-zinc-200",
        ghost:
          "bg-transparent hover:bg-zinc-100 data-[state=open]:bg-transparent",
        link: "bg-transparent underline-offset-2 hover:underline text-zinc-900 hover:bg-transparent",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-2 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
