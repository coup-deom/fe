export const HomeIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_214_2270)">
        <rect width="24" height="24" fill="white" />
        <path d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z" fill="#222222" />
      </g>
      <defs>
        <clipPath id="clip0_214_2270">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}
