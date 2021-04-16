import React, { memo } from 'react'
import 'css-doodle' // https://github.com/css-doodle/css-doodle

interface DoodleProps {
  className: string
  templateStr: string
}

export const Doodle = memo(({className, templateStr}: DoodleProps) => {
  const doodle = {__html: `<css-doodle>${templateStr}</css-doodle>`}
  return <div className={className} dangerouslySetInnerHTML={doodle} />
});

