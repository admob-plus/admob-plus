import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import React from 'react'
import users from '../data/users'

const Showcase = ({ user }) => (
  <div key={user.infoLink} className="col col--2 margin-bottom--lg">
    <a href={user.infoLink} key={user.infoLink}>
      <img src={user.image} alt={user.caption} title={user.caption} />
    </a>
  </div>
)

const Users = () => {
  const context = useDocusaurusContext()
  const { siteConfig = {} } = context
  return (
    <Layout title={`Users - ${siteConfig.title}`}>
      <main className="container margin-vert--lg">
        <div className="text--center margin-bottom--xl">
          <h1>Who is using AdMob Plus?</h1>
        </div>
        <div className="row logos">
          {users.map(user => (
            <Showcase key={user.image} user={user} />
          ))}
        </div>
        <div className="text--center">
          <p>Is your project using AdMob Plus?</p>
          <p>
            Edit this page with a&nbsp;
            <a href="https://github.com/admob-plus/admob-plus/edit/master/website/src/data/users.js">
              Pull Request
            </a>
            &nbsp;to add your logo.
          </p>
        </div>
      </main>
    </Layout>
  )
}

export default Users
