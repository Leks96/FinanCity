import React, { FC, ReactNode } from 'react'
import { Tooltip as ANTDTooltip } from 'antd'
import { TooltipPlacement } from 'antd/lib/tooltip'
import styled from 'styled-components'
import { useDarkMode } from '../context'
import { CenteredImg } from '../styles'
import tw from 'twin.macro'

const ICON = styled(CenteredImg)<{ notDoxxed?: boolean; className?: string }>`
  ${tw`sm:h-[20px] sm:w-[20px] sm:ml-1.5 ml-2 cursor-pointer flex items-center justify-center self-center`}
  ${({ theme, notDoxxed }) => !notDoxxed && theme.measurements(theme.margin(1.5))}
  .tooltipIcon {
    ${tw`h-5 w-5 ml-3`}
  }
`

const TEXT = styled.span`
  ${tw`text-[12px] pb-2.5`}
  color: ${({ theme }) => theme.text0};
  font-family: 'Montserrat';
`

export const Tooltip: FC<{
  dark?: boolean
  lite?: boolean
  placement?: TooltipPlacement
  color?: string
  infoIcon?: boolean
  children: ReactNode
  notInherit?: boolean
  title?: string
  overlayClassName?: string
  className?: string
  overrideIcon?: string
}> = ({
  dark,
  lite,
  placement = 'topLeft',
  color = '#4b4b4b',
  children,
  notInherit,
  infoIcon = true,
  title,
  overlayClassName,
  className,
  overrideIcon
}) => {
  const { mode } = useDarkMode()

  const icon = `/img/assets/tooltip_${dark ? 'dark' : lite ? 'lite' : mode}_mode_icon.svg`
  return (
    <ANTDTooltip
      arrowPointAtCenter
      color={color}
      overlayInnerStyle={{
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        padding: '8px 8px 0',
        maxWidth: '180px'
      }}
      placement={placement}
      title={<TEXT> {title ? title : children}</TEXT>}
      overlayClassName={overlayClassName}
    >
      {infoIcon ? (
        <ICON notDoxxed={!!notInherit} className={className}>
          <img className="tooltipIcon" src={overrideIcon ?? icon} alt="tooltip" />
        </ICON>
      ) : (
        children
      )}
    </ANTDTooltip>
  )
}
