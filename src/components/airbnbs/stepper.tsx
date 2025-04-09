import { MinusIcon } from '../base/svgs/MinusIcon'
import { PlusIcon } from '../base/svgs/PlusIcon'

import { Button } from './button'

interface Props {
  max?: number
  min?: number
  value: number
  onChange: (value: number) => void
  formatter: (value: number) => React.ReactNode
}
export const Stepper: React.FC<Props> = ({
  min = 0,
  max = Infinity,
  value,
  formatter,
  onChange,
}) => {
  return (
    <div className="flex items-center justify-center w-full">
      <Button
        rounded="full"
        variant="outline"
        size="icon"
        className="box-border w-8 h-8 p-4"
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        <MinusIcon />
      </Button>
      <div className="w-16 px-4 py-2 text-center whitespace-nowrap overflow-ellipsis">
        {formatter(value)}
      </div>
      <Button
        rounded="full"
        variant="outline"
        size="icon"
        className="box-border w-8 h-8 p-4"
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        <PlusIcon />
      </Button>
    </div>
  )
}
