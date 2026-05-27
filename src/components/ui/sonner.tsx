import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"
import { PiShieldWarning } from "react-icons/pi";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group font-sans"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <PiShieldWarning className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      toastOptions={{
        style: {
          background: "#ffffff",
          color: "#F31260",
          border: "1px solid #e5e7eb",
          borderRadius: "0.75rem",
          boxShadow: "none"
        },
        classNames: {
          toast: "font-sans text-xs items-start",
          title: "!font-medium text-xs !text-[#111827]",
          description: "text-[11px] !text-[#6a7282]",
          icon: "text-[#F31260] -mt-4",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }