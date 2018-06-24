'use strict'

const React = require('react')

const siteConfig = require(`${process.cwd()}/siteConfig.js`)

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
    </div>
  </SplashContainer>
)

const Index = ({ language = '' }) => (
  <div>
    <HomeSplash language={language} />
  </div>
)

module.exports = Index
