'use strict'

const users = require('./data/users')

const siteConfig = {
  title: 'AdMob Plus',
  tagline: 'Trustable AdMob Cordova Plugin',
  url: 'https://admob-plus.github.io',
  baseUrl: '/',
  enableUpdateTime: true,

  projectName: 'admob-plus.github.io',
  organizationName: 'admob-plus',
  editUrl: 'https://github.com/admob-plus/admob-plus/edit/master/docs/',

  headerIcon: 'img/logo.png',
  headerLinks: [
    { doc: 'installation', label: 'Docs' },
    { doc: 'faq', label: 'FAQ' },
    { page: 'users', label: 'Users' },
    { blog: true, label: 'Blog' },
    { page: 'funding', label: 'Funding' },
  ],

  colors: {
    primaryColor: '#F9B90A',
    secondaryColor: '#E5352F',
  },

  highlight: {
    theme: 'default',
  },

  // Add custom scripts here that would be placed in <script> tags
  scripts: ['https://buttons.github.io/buttons.js'],

  /* On page navigation for the current documentation page */
  onPageNav: 'separate',

  users,
}

module.exports = siteConfig
