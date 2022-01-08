import Link from '@docusaurus/Link'
import {
  useLatestVersion,
  useVersions,
} from '@docusaurus/plugin-content-docs/client'
import Layout from '@theme/Layout'
import React from 'react'

const Version: React.FC = () => {
  const versions = useVersions()
  const latestVersion = useLatestVersion()
  const pastVersions = versions.filter(
    (version) => version !== latestVersion && version.name !== 'current',
  )
  const stableVersion = pastVersions.shift()

  return (
    <Layout
      title="Versions"
      description="Versions page listing all documented site versions"
    >
      <main className="container margin-vert--lg">
        <h1>Documentation versions</h1>

        {stableVersion && (
          <div className="margin-bottom--lg">
            <h3 id="next">Current version (Stable)</h3>
            <p>
              Here you can find the documentation for current released version.
            </p>
            <table>
              <tbody>
                <tr>
                  <th>{stableVersion.name}</th>
                  <td>
                    <Link to={stableVersion.path}>Documentation</Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <div className="margin-bottom--lg">
          <h3 id="latest">Next version (Unreleased)</h3>
          <p>
            Here you can find the documentation for work-in-process unreleased
            version.
          </p>
          <table>
            <tbody>
              <tr>
                <th>{latestVersion.label}</th>
                <td>
                  <Link to={latestVersion.path}>Documentation</Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {pastVersions.length > 0 && (
          <div className="margin-bottom--lg">
            <h3 id="archive">Past versions (Not maintained anymore)</h3>
            <p>
              Here you can find documentation for previous versions of
              Docusaurus.
            </p>
            <table>
              <tbody>
                {pastVersions.map((version) => (
                  <tr key={version.name}>
                    <th>{version.label}</th>
                    <td>
                      <Link to={version.path}>Documentation</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </Layout>
  )
}

export default Version
