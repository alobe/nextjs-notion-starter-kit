import React, { memo } from 'react';
import { Doodle } from '../doodle'

export default memo(() => {
  const str = `
    @grid: 50x1 / 80%;

    @place-cell: center;
    @size: calc(100% / @I * @i);

    transform: rotate(calc(@i * 5deg));

    border-radius: 30%;
    border: 1px solid hsla(
      calc(10 + 4 * @i), 70%, 68%, @r.8
    );
  `
  return (
    <div className="h-32 w-full bg-white">
      <Doodle className="" templateStr={str} />
    </div>
  )
});
