import * as React from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils" 

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder?:string;
}

export function SearchBar({
  placeholder = "search here",
  className,
  ...props
}: SearchBarProps) {
  return (
    <div className="relative w-full">
      <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        placeholder={placeholder}
        className={cn(
          "pl-9 pr-3 py-2 rounded-md bg-gray-50 border-none focus:ring-0 focus:border-none placeholder:text-gray-400 text-sm text-gray-700",
          className
        )}
        {...props}
      />
    </div>
  )
}
