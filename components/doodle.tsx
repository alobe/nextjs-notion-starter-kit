import React, { memo } from 'react'
import 'css-doodle' // https://github.com/css-doodle/css-doodle

interface DoodleProps {
  className: string
  templateStr: string
  doodleStyle?: string
}

export const Doodle = memo(({className, templateStr, doodleStyle = ''}: DoodleProps) => {
  const doodle = {__html: `<css-doodle style=${doodleStyle}>${templateStr}</css-doodle>`}
  return <div className={className} dangerouslySetInnerHTML={doodle} />
});

export default Doodle;
