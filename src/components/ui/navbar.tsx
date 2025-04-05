import { cn } from "@/lib/utils"
import { HTMLAttributes, forwardRef } from "react"

const Navbar = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <nav
      ref={ref}
      className={cn(
        "flex items-center justify-between p-4",
        className
      )}
      {...props}
    />
  )
)
Navbar.displayName = "Navbar"

const NavbarBrand = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center", className)}
      {...props}
    />
  )
)
NavbarBrand.displayName = "NavbarBrand"

const NavbarContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center space-x-4", className)}
      {...props}
    />
  )
)
NavbarContent.displayName = "NavbarContent"

const NavbarItem = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
)
NavbarItem.displayName = "NavbarItem"

export { Navbar, NavbarBrand, NavbarContent, NavbarItem }