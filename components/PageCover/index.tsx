import React, { memo } from 'react';
import { Doodle } from '../doodle'

export default memo(() => {
  const str = `
    :doodle {
      @grid: 1x3 / 100vmax;
      position: absolute;
      top: 0; left: 0;
      z-index: 0;
    }

    width: 100%;
    height: 100%;
    position: absolute;
    transform: rotate(45deg);

    background: @m(100, (
      linear-gradient(transparent, @p(
        #FFFDE1@repeat(2, @p([0-9a-f])),
        #FB3569@repeat(2, @p([0-9a-f]))
      ))
      @r(0%, 100%) @r(0%, 100%) /
      @r(1px) @r(23vmin)
      no-repeat
    ));

    will-change: transform;
    animation: f 20s linear calc(-20s / @size() * @i()) infinite;
    @keyframes f {
      from { transform: translateY(-100%) }
      to { transform: translateY(100%) }
    }
  `
  return (
    <div className="h-32 w-full relative overflow-hidden">
      <Doodle className="h-full overflow-hidden" templateStr={str} doodleStyle={`transform:rotate(45deg)translate(-25%,0);`} />
    </div>
  )
});
