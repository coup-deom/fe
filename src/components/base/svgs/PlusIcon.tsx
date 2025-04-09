export const PlusIcon: React.FC<React.ComponentProps<'svg'>> = ({
  ...props
}) => {
  return (
    <svg
      {...props}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0.5 7.39453H14.5" stroke="black" stroke-width="2" />
      <path d="M7.5 0.394531L7.57564 14.3943" stroke="black" stroke-width="2" />
    </svg>
  )
}
