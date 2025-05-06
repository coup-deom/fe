import { CheckIcon } from '../svgs/CheckIcon'
import { EditIcon } from '../svgs/EditIcon'

const InfoSectionRoot: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className="flex flex-col w-full gap-2">{children}</div>
}

interface InfoSectionItemProps {
  mode?: 'edit' | 'view'
  onModeChange?: (mode?: 'edit' | 'view') => void
  title?: React.ReactNode
  children?: React.ReactNode
}
const InfoSectionItem: React.FC<InfoSectionItemProps> = ({
  children,
  mode,
  onModeChange,
  title,
}) => {
  return (
    <div className="flex flex-col w-full p-4 gap-4 border-t-1 border-b-1 border-[#717171]">
      <div className="flex flex-row justify-between">
        <div className="flex flex-1 font-bold text-medium">{title}</div>
        {mode !== undefined && (
          <div>
            {mode === 'edit' ? (
              <CheckIcon onClick={() => onModeChange?.('view')} />
            ) : (
              <EditIcon onClick={() => onModeChange?.('edit')} />
            )}
          </div>
        )}
      </div>
      {children}
    </div>
  )
}

export const InfoSection = Object.assign(InfoSectionRoot, {
  Item: InfoSectionItem,
})
