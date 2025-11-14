"use client"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface SignupTypeProps {
  value: boolean
  onValueChange: (value: boolean) => void
  className?: string
}

function SignupType({ value, onValueChange, className }: SignupTypeProps) {
  return (
    <div className={cn("flex items-center justify-center gap-4", className)}>
      <Label 
        className={cn(
          "text-base font-medium cursor-pointer transition-colors",
          !value ? "text-blue-700" : "text-neutral-600"
        )}
        onClick={() => onValueChange(false)}
      >
        Empresa
      </Label>
      
      <Switch
        checked={value}
        onCheckedChange={onValueChange}
        className="data-[state=checked]:bg-white data-[state=unchecked]:bg-white border-blue-600 cursor-pointer"
      />
      
      <Label 
        className={cn(
          "text-base font-medium cursor-pointer transition-colors",
          value ? "text-blue-700" : "text-neutral-600"
        )}
        onClick={() => onValueChange(true)}
      >
        Produtor Rural
      </Label>
    </div>
  )
}

export { SignupType }
