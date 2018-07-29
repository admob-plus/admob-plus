'use strict'

const siteConfig = {
  title: 'AdMob Plus',
  tagline: 'Trustable AdMob Cordova Plugin',
  url: 'https://admob-plus.github.io',
  baseUrl: '/',

  projectName: 'admob-plus.github.io',
  organizationName: 'admob-plus',
  editUrl: 'https://github.com/admob-plus/admob-plus/edit/master/docs/',

  headerLinks: [
    { doc: 'installation', label: 'Docs' },
    { doc: 'faq', label: 'FAQ' },
    { blog: true, label: 'Blog' },
    { href: 'https://ratson.name/fund-admob-plus/', label: 'Funding' },
  ],

  colors: {
    primaryColor: '#2E8555',
    secondaryColor: '#205C3B',
  },

  highlight: {
    theme: 'default',
  },

  // Add custom scripts here that would be placed in <script> tags
  scripts: ['https://buttons.github.io/buttons.js'],

  /* On page navigation for the current documentation page */
  onPageNav: 'separate',
}

module.exports = siteConfig
