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
            <Button href="https://github.com/admob-plus/admob-plus">
              <translate>GitHub</translate>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </SplashContainer>
)

const ExternalLink = ({ href, children }) => (
  <a href={href} rel="external nofollow">
    {children}
  </a>
)

const ProjectCellContent = ({ urls }) => {
  if (urls) {
    return (
      <span>
        {urls.map(url => (
          // eslint-disable-next-line jsx-a11y/accessible-emoji
          <ExternalLink key={url} href={url}>
            ❌
          </ExternalLink>
        ))}
      </span>
    )
  }
  if (urls === null) {
    return '❓'
  }
  return '✅'
}

const ProjectTableRow = ({
  url,
  name,
  adSharing,
  binaryFiles,
  remoteControl,
}) => (
  <tr>
    <td style={{ textAlign: 'left' }}>
      <ExternalLink href={url}>{name}</ExternalLink>
    </td>
    <td>
      <ProjectCellContent urls={adSharing} />
    </td>
    <td>
      <ProjectCellContent urls={binaryFiles} />
    </td>
    <td>
      <ProjectCellContent urls={remoteControl} />
    </td>
  </tr>
)

const CompareTable = () => (
  <div className="productShowcaseSection paddingBottom">
    <h2>
      <translate>Compare to other projects</translate>
    </h2>
    <table className="logos">
      <tr>
        <th>Project</th>
        <th>No Ad-Sharing</th>
        <th>Fully Open Sourced</th>
        <th>No Remote Control</th>
      </tr>
      {[
        {
          url: 'https://github.com/admob-google/admob-cordova',
          name: 'admob',
          adSharing: null,
          binaryFiles: [
            'https://github.com/admob-google/admob-cordova/blob/master/src/android/libs/admobadplugin.jar',
            'https://github.com/admob-google/admob-cordova/blob/master/src/ios/AdmobAPI.framework/AdmobAPI',
          ],
          remoteControl: null,
        },
        {
          url: 'https://github.com/appfeel/admob-google-cordova',
          name: 'cordova-admob',
          adSharing: [
            'https://github.com/appfeel/admob-google-cordova/blob/3f122f278a323a4bc9e580f400182a7bd690a346/src/android/AdMobAds.java#L569',
          ],
          binaryFiles: false,
          remoteControl: false,
        },
        {
          url: 'https://github.com/cranberrygame/cordova-plugin-ad-admob',
          name: 'cordova-plugin-ad-admob',
          adSharing: [
            'https://github.com/cranberrygame/cordova-plugin-ad-admob/blob/7aaa397b19ab63579d6aa68fbf20ffdf795a15fc/src/android/AdMobPlugin.java#L330',
          ],
          binaryFiles: false,
          remoteControl: false,
        },
        {
          url: 'https://github.com/ratson/cordova-plugin-admob-free',
          name: 'cordova-plugin-admob-free',
          adSharing: false,
          binaryFiles: false,
          remoteControl: false,
        },
        {
          url: 'https://github.com/sunnycupertino/cordova-plugin-admob-simple',
          name: 'cordova-plugin-admob-simple',
          adSharing: [
            'https://github.com/sunnycupertino/cordova-plugin-admob-simple/blob/a58846c1ea14188a4aef44381ccd28ffdcae3bfa/src/android/AdMob.java#L207',
          ],
          binaryFiles: false,
          remoteControl: [
            'https://github.com/sunnycupertino/cordova-plugin-admob-simple/blob/f7cc64e9e018f2146b2735b5ae8d3b780fa24f72/src/android/AdMob.java#L728',
          ],
        },
        {
          url: 'https://github.com/admob-plus/admob-plus',
          name: 'cordova-admob-plus',
          adSharing: false,
          binaryFiles: false,
          remoteControl: false,
        },
        {
          url: 'https://github.com/floatinghotpot/cordova-admob-pro',
          name: 'cordova-plugin-admobpro',
          adSharing: [
            'https://github.com/floatinghotpot/cordova-admob-pro/wiki/License-Agreement#3-win-win-partnership',
          ],
          binaryFiles: [
            'https://unpkg.com/cordova-plugin-extension@1.5.4/src/android/cordova-generic-ad.jar',
            'https://unpkg.com/cordova-plugin-extension@1.5.4/src/ios/libCordovaGenericAd.a',
          ],
          remoteControl: [
            'https://forum.ionicframework.com/t/don-t-use-admob-pro-plugin-steal-30/90245',
            'https://drive.google.com/file/d/0B5vtpya8P4b-NUZTdUhBVkFlU0E/view',
          ],
        },
      ].map(props => (
        <ProjectTableRow key={props.name} {...props} />
      ))}
    </table>
  </div>
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
              content: `Do not
                [send](https://github.com/sunnycupertino/cordova-plugin-admob-simple/blob/f7cc64e9e018f2146b2735b5ae8d3b780fa24f72/src/android/AdMob.java#L728)
                [your application information](https://forum.ionicframework.com/t/don-t-use-admob-pro-plugin-steal-30/90245)
                to a remote server to control whether ad could be displayed. Therefore, you don't lose revenue because
                [some server bugs](https://drive.google.com/file/d/0B5vtpya8P4b-NUZTdUhBVkFlU0E/view).`,
              title: <translate>No Remote Control</translate>,
            },
          ]}
          layout="threeColumn"
        />
      </Container>
      <CompareTable />
    </div>
  </div>
)

module.exports = Index
