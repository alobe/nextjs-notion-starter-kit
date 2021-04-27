import React, { memo } from 'react'
import dynamic from 'next/dynamic'

const Doodle = dynamic(() => import('../doodle'), { ssr: false })

const getBg = () => <Doodle className="relative top-20 left-20" templateStr={`
--color: @p(#51eaea, #fffde1, #ff9d76, #FB3569);
:doodle {
  @grid: 30x1 / 18vmin;
  --deg: @p(-180deg, 180deg);
}
:container {
  perspective: 30vmin;
}
:after, :before {
  content: '';
  background: var(--color);
  @place-cell: @r(100%) @r(100%);
  @size: @r(6px);
  @shape: heart;
}

@place-cell: center;
@size: 100%;

box-shadow: @m2(0 0 50px var(--color));
background: @m100(
  radial-gradient(var(--color) 50%, transparent 0)
  @r(-20%, 120%) @r(-20%, 100%) / 1px 1px
  no-repeat
);

will-change: transform, opacity;
animation: scale-up 12s linear infinite;
animation-delay: calc(-12s / @size() * @i());

@keyframes scale-up {
  0%, 95.01%, 100% {
    transform: translateZ(0) rotate(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  95% {
    transform:
      translateZ(35vmin) rotateZ(@var(--deg));
  }
}
`} />


const menu = () => {
  return (
    <Doodle className="absolute top-6 right-8 rounded-md animate__animated animate__heartBeat animate__infinite hover:animate-spin cursor-pointer" templateStr={`
      clip-path: polygon(100% 50%, 65.1132% 46.7876%, 13.0463% 66.4528%, 17.2746% 73.7764%, 60.3386% 38.5178%, 75% 6.69873%, 54.7746% 35.3054%, 45.7717% 90.2293%, 54.2283% 90.2293%, 45.2254% 35.3054%, 25% 6.69873%, 39.6614% 38.5178%, 82.7254% 73.7764%, 86.9537% 66.4528%, 34.8868% 46.7876%, 0% 50%, 34.8868% 53.2124%, 86.9537% 33.5472%, 82.7254% 26.2236%, 39.6614% 61.4822%, 25% 93.3013%, 45.2254% 64.6946%, 54.2283% 9.77074%, 45.7717% 9.77074%, 54.7746% 64.6946%, 75% 93.3013%, 60.3386% 61.4822%, 17.2746% 26.2236%, 13.0463% 33.5472%, 65.1132% 53.2124%);
      background: #9f41f7;
      width: 40px; height: 40px;
    `} />
  )
}

export const Home = ({}: {}) => {
  return (
    <div className="overflow-hidden flex absolute w-full h-full" style={{background: 'linear-gradient(90deg, #00c9ff 0%, #5ed846 100%)'}}>
      {getBg()}
      {menu()}
    </div>
  )
}
