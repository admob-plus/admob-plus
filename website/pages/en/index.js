'use strict'

const React = require('react')

const siteConfig = require(`${process.cwd()}/siteConfig.js`)
/* eslint-disable node/no-missing-require */
const { Container, GridBlock } = require('../../core/CompLibrary.js')
const { translate } = require('../../server/translate.js')
/* eslint-enable node/no-missing-require */

const Button = props => (
  <div className="pluginWrapper buttonWrapper">
    <a className="button" href={props.href} target={props.target || '_self'}>
      {props.children}
    </a>
  </div>
)

const SplashContainer = props => (
  <div className="homeContainer">
    <div className="homeSplashFade">
      <div className="wrapper homeWrapper">{props.children}</div>
    </div>
  </div>
)

const ProjectTitle = () => (
  <h2 className="projectTitle">
    {siteConfig.title}
    <small>{siteConfig.tagline}</small>
  </h2>
)

const HomeSplash = () => (
  <SplashContainer>
    <div className="inner">
      <ProjectTitle />
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">
            <Button href={`${siteConfig.baseUrl}docs/installation`}>
              <translate>Get Started</translate>
            </Button>
            <Button href="https://github.com/admob-suite/admob-suite">
              <translate>GitHub</translate>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </SplashContainer>
)

const Index = ({ language = '' }) => (
  <div>
    <HomeSplash language={language} />
    <div className="mainContainer">
      <Container padding={['bottom', 'top']} background="light">
        <GridBlock
          align="center"
          contents={[
            {
              content: `Unlike
                [some](https://github.com/appfeel/admob-google-cordova/blob/3f122f278a323a4bc9e580f400182a7bd690a346/src/android/AdMobAds.java#L569)
                [other](https://github.com/sunnycupertino/cordova-plugin-admob-simple/blob/a58846c1ea14188a4aef44381ccd28ffdcae3bfa/src/android/AdMob.java#L207)
                [plugins](https://github.com/floatinghotpot/cordova-admob-pro/wiki/License-Agreement#3-win-win-partnership),
                this plugin does not share your advertising revenue by randomly display developer's owned ads.`,
              title: <translate>No Ad-Sharing</translate>,
            },
            {
              content: `Except Google provided
                [AdMob SDKs](https://cocoapods.org/pods/GoogleMobileAds),
                every line of code are on Github. You don't risk to
                [execute](https://github.com/admob-google/admob-cordova/blob/master/src/android/libs/admobadplugin.jar)
                [compiled](https://unpkg.com/cordova-plugin-extension@1.5.4/src/android/cordova-generic-ad.jar)
                [binary](https://unpkg.com/cordova-plugin-extension@1.5.4/src/ios/libCordovaGenericAd.a).`,
              title: <translate>Fully Open Source</translate>,
            },
            {
              content:
                "Do not send your application information to a remote server to control whether ad could be displayed. Therefore, you don't lose revenue because some server bugs.",
              title: <translate>No Remote Control</translate>,
            },
          ]}
          layout="threeColumn"
        />
      </Container>
    </div>
  </div>
)

module.exports = Index
