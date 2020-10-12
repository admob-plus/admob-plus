import Link from '@docusaurus/Link'
import useBaseUrl from '@docusaurus/useBaseUrl'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import clsx from 'clsx'
import React from 'react'
import styles from './styles.module.css'

const ExternalLink = ({ href, children }) => (
  <a href={href} rel="external nofollow">
    {children}
  </a>
)

const features = [
  {
    title: 'No Ad-Sharing',
    imageUrl: 'img/saco.svg',
    description: (
      <>
        Unlike&nbsp;
        <ExternalLink href="https://github.com/appfeel/admob-google-cordova/blob/3f122f278a323a4bc9e580f400182a7bd690a346/src/android/AdMobAds.java#L569">
          some
        </ExternalLink>
        &nbsp;
        <ExternalLink href="https://github.com/sunnycupertino/cordova-plugin-admob-simple/blob/a58846c1ea14188a4aef44381ccd28ffdcae3bfa/src/android/AdMob.java#L207">
          other
        </ExternalLink>
        &nbsp;
        <ExternalLink href="https://github.com/floatinghotpot/cordova-admob-pro/wiki/License-Agreement#3-win-win-partnership">
          plugins
        </ExternalLink>
        , this plugin does not share your advertising revenue by randomly
        display developer&apos;s owned ads.
      </>
    ),
  },
  {
    title: 'Fully Open Source',
    imageUrl: 'img/open-source.svg',
    description: (
      <>
        Except Google provided&nbsp;
        <ExternalLink href="https://cocoapods.org/pods/Google-Mobile-Ads-SDK">
          AdMob SDKs
        </ExternalLink>
        , every line of code are on Github. You don&apos;t risk to&nbsp;
        <ExternalLink href="https://github.com/admob-google/admob-cordova/blob/master/src/android/libs/admobadplugin.jar">
          execute
        </ExternalLink>
        &nbsp;
        <ExternalLink href="https://unpkg.com/cordova-plugin-extension@1.5.4/src/android/cordova-generic-ad.jar">
          compiled
        </ExternalLink>
        &nbsp;
        <ExternalLink href="https://unpkg.com/cordova-plugin-extension@1.5.4/src/ios/libCordovaGenericAd.a">
          binary
        </ExternalLink>
        .
      </>
    ),
  },
  {
    title: 'No Remote Control',
    imageUrl: 'img/cute-locks.svg',
    description: (
      <>
        Do not&nbsp;
        <ExternalLink href="https://github.com/sunnycupertino/cordova-plugin-admob-simple/blob/f7cc64e9e018f2146b2735b5ae8d3b780fa24f72/src/android/AdMob.java#L728">
          send
        </ExternalLink>
        &nbsp;
        <ExternalLink href="https://forum.ionicframework.com/t/don-t-use-admob-pro-plugin-steal-30/90245">
          your application information
        </ExternalLink>
        &nbsp; to a remote server to control whether ad could be displayed.
        Therefore, you don&apos;t lose revenue because{' '}
        <ExternalLink href="https://drive.google.com/file/d/0B5vtpya8P4b-NUZTdUhBVkFlU0E/view">
          some server bugs
        </ExternalLink>
        .
      </>
    ),
  },
]

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl)
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

function Home() {
  const context = useDocusaurusContext()
  const { siteConfig = {} } = context
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/')}
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map(props => (
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  <Feature key={props.title} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  )
}

export default Home
