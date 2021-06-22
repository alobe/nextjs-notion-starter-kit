import * as React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import cs from 'classnames'
import { useRouter } from 'next/router'
import { useSearchParam, useHover } from 'react-use'
import BodyClassName from 'react-body-classname'
import useDarkMode from 'use-dark-mode'
import { PageBlock } from 'notion-types'
import { FaMoon, FaSun, FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';

import { Tweet, TwitterContextProvider } from 'react-static-tweets'

// core notion renderer
import { NotionRenderer, Code, Collection, CollectionRow } from 'react-notion-x'

// utils
import { getBlockTitle } from 'notion-utils'
import { mapPageUrl, getCanonicalPageUrl } from 'lib/map-page-url'
import { mapNotionImageUrl } from 'lib/map-image-url'
import { getPageDescription } from 'lib/get-page-description'
import { getPageTweet } from 'lib/get-page-tweet'
import { searchNotion } from 'lib/search-notion'
import * as types from 'lib/types'
import * as config from 'lib/config'

// components
import { CustomFont } from './CustomFont'
import { Loading } from './Loading'
import { Page404 } from './Page404'
import { PageHead } from './PageHead'
import { PageActions } from './PageActions'
import { GitHubShareButton } from './GitHubShareButton'
import { ReactUtterances } from './ReactUtterances'

import styles from './styles.module.css'

// const Code = dynamic(() =>
//   import('react-notion-x').then((notion) => notion.Code)
// )
//
// const Collection = dynamic(() =>
//   import('react-notion-x').then((notion) => notion.Collection)
// )
//
// const CollectionRow = dynamic(
//   () => import('react-notion-x').then((notion) => notion.CollectionRow),
//   {
//     ssr: false
//   }
// )

const Pdf = dynamic(() => import('react-notion-x').then((notion) => notion.Pdf))

const PageCover = dynamic(() => import('./PageCover'), { ssr: false })

const Equation = dynamic(() =>
  import('react-notion-x').then((notion) => notion.Equation)
)

// we're now using a much lighter-weight tweet renderer react-static-tweets
// instead of the official iframe-based embed widget from twitter
// const Tweet = dynamic(() => import('react-tweet-embed'))

const Modal = dynamic(
  () => import('react-notion-x').then((notion) => notion.Modal),
  { ssr: false }
)

export const NotionPage: React.FC<types.PageProps> = ({
  site,
  recordMap,
  error,
  pageId
}) => {
  const router = useRouter()
  const lite = useSearchParam('lite')

  const params: any = {}
  if (lite) params.lite = lite

  // lite mode is for oembed
  const isLiteMode = lite === 'true'
  const searchParams = new URLSearchParams(params)

  const darkMode = useDarkMode(false, { classNameDark: 'dark-mode' })

  if (router.isFallback) {
    return <Loading />
  }

  const keys = Object.keys(recordMap?.block || {})
  const block = recordMap?.block?.[keys[0]]?.value

  if (error || !site || !keys.length || !block) {
    return <Page404 site={site} pageId={pageId} error={error} />
  }

  const title = getBlockTitle(block, recordMap) || site.name

  // console.log('notion page', {
  //   isDev: config.isDev,
  //   title,
  //   pageId,
  //   rootNotionPageId: site.rootNotionPageId,
  //   recordMap
  // })

  if (!config.isServer) {
    // add important objects to the window global for easy debugging
    const g = window as any
    g.pageId = pageId
    g.recordMap = recordMap
    g.block = block
  }

  const siteMapPageUrl = mapPageUrl(site, recordMap, searchParams)

  const canonicalPageUrl =
    !config.isDev && getCanonicalPageUrl(site, recordMap)(pageId)

  // const isRootPage =
  //   parsePageId(block.id) === parsePageId(site.rootNotionPageId)
  const isBlogPost =
    block.type === 'page' && block.parent_table === 'collection'
  const showTableOfContents = !!isBlogPost
  const minTableOfContentsItems = 3

  const socialImage = mapNotionImageUrl(
    (block as PageBlock).format?.page_cover || config.defaultPageCover,
    block
  )

  const socialDescription =
    getPageDescription(block, recordMap) ?? config.description

  let comments: React.ReactNode = null
  let pageAside: React.ReactChild = null

  // only display comments and page actions on blog post pages
  if (isBlogPost) {
    if (config.utterancesGitHubRepo) {
      comments = (
        <ReactUtterances
          repo={config.utterancesGitHubRepo}
          issueMap='issue-term'
          issueTerm='title'
          theme={darkMode.value ? 'photon-dark' : 'github-light'}
        />
      )
    }

    const tweet = getPageTweet(block, recordMap)
    if (tweet) {
      pageAside = <PageActions tweet={tweet} />
    }
  } else {
    // pageAside = <PageSocial />
  }

  const [hoveredE] = useHover((hover) => {
    const socials = [
      config.twitter && {
        link: `https://twitter.com/${config.twitter}`,
        icon: <FaTwitter />,
        color: '#55a6e9'
      },
      config.github && {
        link: `https://github.com/${config.github}`,
        icon: <FaGithub />,
        color: '#a6cf59'
      },
      config.linkedin && {
        link: `https://www.linkedin.com/in/${config.linkedin}`,
        icon: <FaLinkedin />,
        color: '#c27070'
      },
    ].filter(Boolean)
    return (
      <div className="fixed flex flex-row-reverse items-center top-16 right-6" style={{zIndex: 201}}>
        <img src="/img/logo.png" className="w-10 h-10 ml-2 rounded-md animate__animated animate__heartBeat animate__infinite hover:animate-spin cursor-pointer" />
        <div className={`${hover ? 'w-auto h-auto' : 'h-0 w-0'} overflow-hidden transition-all flex`}>
          {socials.map((s, i) => <a href={s.link} target='_blank' className="text-4xl ml-3" style={{color: s.color}} key={i}>{s.icon}</a>)}
          <i className="text-4xl ml-3 cursor-pointer" style={{color: darkMode.value ? '#9159e6' : '#eec752'}} onClick={() => darkMode.toggle()}>{darkMode.value ? <FaMoon /> : <FaSun />}</i>
        </div>
      </div>
    );
  });
  const isRootPage = pageId === site.rootNotionPageId;
  console.log('site.rootNotionPageId :>> ', site.rootNotionPageId);

  return (
    <TwitterContextProvider
      value={{
        tweetAstMap: (recordMap as any).tweetAstMap || {},
        swrOptions: {
          fetcher: (id) =>
            fetch(`/api/get-tweet-ast/${id}`).then((r) => r.json())
        }
      }}
    >
      <PageHead site={site} />

      <Head>
        <meta property='og:title' content={title} />
        <meta property='og:site_name' content={site.name} />

        <meta name='twitter:title' content={title} />
        <meta property='twitter:domain' content={site.domain} />

        {config.twitter && (
          <meta name='twitter:creator' content={`@${config.twitter}`} />
        )}

        {socialDescription && (
          <>
            <meta name='description' content={socialDescription} />
            <meta property='og:description' content={socialDescription} />
            <meta name='twitter:description' content={socialDescription} />
          </>
        )}

        {socialImage ? (
          <>
            <meta name='twitter:card' content='summary_large_image' />
            <meta name='twitter:image' content={socialImage} />
            <meta property='og:image' content={socialImage} />
          </>
        ) : (
          <meta name='twitter:card' content='summary' />
        )}

        {canonicalPageUrl && (
          <>
            <link rel='canonical' href={canonicalPageUrl} />
            <meta property='og:url' content={canonicalPageUrl} />
            <meta property='twitter:url' content={canonicalPageUrl} />
          </>
        )}

        <title>{title}</title>
      </Head>

      <CustomFont site={site} />

      {isLiteMode && <BodyClassName className='notion-lite' />}

      {hoveredE}

      <NotionRenderer
        bodyClassName={cs(
          styles.notion,
          isRootPage && 'index-page'
        )}
        components={{
          pageLink: ({
            href,
            as,
            passHref,
            prefetch,
            replace,
            scroll,
            shallow,
            locale,
            ...props
          }) => (
            <Link
              href={href}
              as={as}
              passHref={passHref}
              prefetch={prefetch}
              replace={replace}
              scroll={scroll}
              shallow={shallow}
              locale={locale}
            >
              <a {...props} />
            </Link>
          ),
          code: Code,
          collection: Collection,
          collectionRow: CollectionRow,
          tweet: Tweet,
          modal: Modal,
          pdf: Pdf,
          equation: Equation
        }}
        recordMap={recordMap}
        rootPageId={site.rootNotionPageId}
        fullPage={!isLiteMode}
        darkMode={darkMode.value}
        previewImages={site.previewImages !== false}
        showCollectionViewDropdown={false}
        showTableOfContents={showTableOfContents}
        minTableOfContentsItems={minTableOfContentsItems}
        defaultPageIcon={config.defaultPageIcon}
        defaultPageCover={config.defaultPageCover}
        defaultPageCoverPosition={config.defaultPageCoverPosition}
        mapPageUrl={siteMapPageUrl}
        mapImageUrl={mapNotionImageUrl}
        searchNotion={searchNotion}
        pageFooter={comments}
        pageCover={isRootPage ? <PageCover/> : undefined}
        pageHeader={<div className="">dafad</div>}
        pageAside={pageAside}
        // footer={
        //   <Footer
        //     isDarkMode={darkMode.value}
        //     toggleDarkMode={darkMode.toggle}
        //   />
        // }
      />

      {/* <GitHubShareButton /> */}
    </TwitterContextProvider>
  )
}
