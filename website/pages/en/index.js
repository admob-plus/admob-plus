'use strict'

const React = require('react')

const siteConfig = require(`${process.cwd()}/siteConfig.js`)
/* eslint-disable node/no-missing-require */
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
  </div>
)

module.exports = Index
