import React, { memo } from 'react';
import dynamic from 'next/dynamic';
import { Home } from 'components/home'

// const Baubles = dynamic(() => import('../components/baubles'), { ssr: false });

// export const getStaticProps = async () => {
//   try {
//     const props = await resolveNotionPage(domain)

//     return { props, revalidate: 10 }
//   } catch (err) {
//     console.error('page error', domain, err)

//     // we don't want to publish the error version of this page, so
//     // let next.js know explicitly that incremental SSG failed
//     throw err
//   }
// }

export default memo(() => {
  return (
    // <div className="relative m-0 p-0 w-full h-full overflow-hidden" style={{background: 'linear-gradient(180deg, #e6eaf5 0%, #f6f6f6 80%)'}}>
    //   <Baubles />
    // </div>
    <Home />
  )
})
