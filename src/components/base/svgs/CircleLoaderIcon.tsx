import { cn } from '@/lib/utils'

export const CircleLoaderIcon: React.FC<React.ComponentProps<'svg'>> = ({
  className,
  ...props
}) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={cn(
        'w-7 h-7 animate-spin text-secondary-foreground',
        className,
      )}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      {...props}
    >
      <circle
        className="opacity-75"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        strokeDasharray="30 10"
      ></circle>
    </svg>
  )
}
