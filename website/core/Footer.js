'use strict'

const React = require('react')

class Footer extends React.Component {
  docUrl(doc, language) {
    const { baseUrl } = this.props.config
    return `${baseUrl}docs/${language ? `${language}/` : ''}${doc}`
  }

  render() {
    const githubUrl = 'https://github.com/admob-plus/admob-plus'
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <div>
            <h5>Docs</h5>
            <a href={this.docUrl('installation.html')}>Getting Started</a>
          </div>
          <div>
            <h5>Community</h5>
            <a href={`${this.props.config.baseUrl}users`}>User Showcase</a>
          </div>
          <div>
            <h5>More</h5>
            <a href={githubUrl}>GitHub</a>
            <a href={`${githubUrl}/issues`}>Issues</a>
            <a
              className="github-button"
              href={githubUrl}
              data-icon="octicon-star"
              data-count-href="/admob-plus/admob-plus"
              data-show-count
              data-count-aria-label="# stargazers on GitHub"
              aria-label="Star this project on GitHub"
            >
              Star
            </a>
          </div>
        </section>
      </footer>
    )
  }
}

module.exports = Footer
