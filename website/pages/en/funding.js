'use strict'

const React = require('react')

/* eslint-disable node/no-missing-require */
const siteConfig = require(`${process.cwd()}/siteConfig.js`)
const { Container, GridBlock } = require('../../core/CompLibrary.js')
const { translate } = require('../../server/translate.js')
/* eslint-enable node/no-missing-require */

const Funding = () => {
  const fundOptions = [
    {
      title: 'Recurring',
      content:
        '[Stripe-powered Signup Page](https://ratson.name/fund-admob-plus/)',
    },
    {
      title: 'One-Off',
      content: `[![PayPal](${
        siteConfig.baseUrl
      }img/paypal.svg)](https://www.paypal.me/ratsonal)`,
    },
  ]
  return (
    <div className="mainContainer">
      <Container
        padding={['bottom']}
        className="documentContainer postContainer"
      >
        <div className="showcaseSection">
          <div className="prose">
            <h1>
              <translate>Funding AdMob-Plus!</translate>
            </h1>

            <GridBlock
              align="center"
              layout="twoColumn"
              contents={fundOptions}
            />
          </div>
        </div>
        <div className="post">
          <header className="postHeader">
            <h2>
              <translate>Supporting AdMob-Plus</translate>
            </h2>
          </header>
          <p>
            AdMob-Plus is an MIT-licensed open source project. It&apos;s an
            independent project maintened by{' '}
            <a href="https://github.com/ratson">@ratson</a>.
          </p>
          <p>Your support will fund him to</p>
          <ul>
            <li>Maintain cordova-plugin-admob-free and its support.</li>
            <li>
              Develop AdMob Plus with faster releases, more features, and higher
              quality.
            </li>
            <li>
              Allow more time to be invested in documentation, issue triage, and
              community support.
            </li>
            <li>Safeguard the future development of AdMob Plus.</li>
          </ul>
        </div>
        <div className="showcaseSection">
          <div className="prose">
            <GridBlock
              align="center"
              layout="twoColumn"
              contents={fundOptions.slice().reverse()}
            />
          </div>
        </div>
      </Container>
    </div>
  )
}

Funding.title = 'Funding'

module.exports = Funding
