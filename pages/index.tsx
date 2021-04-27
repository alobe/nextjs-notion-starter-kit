import React, { memo } from 'react';
import { Home } from 'components/home'

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
  return <Home />
})
