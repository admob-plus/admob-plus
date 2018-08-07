'use strict'

const React = require('react')

/* eslint-disable node/no-missing-require */
const siteConfig = require(`${process.cwd()}/siteConfig.js`)
const { Container } = require('../../core/CompLibrary.js')
const { translate } = require('../../server/translate.js')
/* eslint-enable node/no-missing-require */

class Users extends React.Component {
  renderUser(user) {
    return (
      <a href={user.infoLink} key={user.infoLink}>
        <img src={user.image} alt={user.caption} title={user.caption} />
      </a>
    )
  }

  render() {
    const showcase = siteConfig.users.map((user, i) => this.renderUser(user, i))

    return (
      <div className="mainContainer">
        <Container padding={['bottom']}>
          <div className="showcaseSection">
            <div className="prose">
              <h1>
                <translate>Who is using AdMob Plus?</translate>
              </h1>
            </div>
            <div className="logos">{showcase}</div>
            <div className="prose">
              <p>
                <translate>Is your project using AdMob Plus?</translate>
              </p>
              <p>
                Edit this page with a{' '}
                <a href="https://github.com/admob-plus/admob-plus/edit/master/website/data/users.js">
                  Pull Request
                </a>{' '}
                to add your logo.
              </p>
            </div>
          </div>
        </Container>
      </div>
    )
  }
}

Users.title = 'Users'

module.exports = Users
