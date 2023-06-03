const versions = require('./versions.json')

const allDocHomesPaths = [
  '/docs/',
  '/docs/next/',
  ...versions.slice(1).map((version) => `/docs/${version}/`),
]

const typedocConfig = {
  readme: 'none',
  sidebar: {
    sidebarFile: null,
  },
}

module.exports = {
  title: 'AdMob Plus',
  tagline: 'Trustable AdMob Plugin for Cordova, Capacitor, Ionic',
  url: 'https://admob-plus.github.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'admob-plus',
  projectName: 'admob-plus.github.io',
  trailingSlash: false,
  onBrokenLinks: 'warn',
  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    prism: {
      additionalLanguages: ['java', 'swift'],
    },
    navbar: {
      title: 'AdMob Plus',
      logo: {
        alt: 'AdMob Plus Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        { to: 'blog', label: 'Blog', position: 'left' },
        { to: 'users', label: 'Users', position: 'left' },
        {
          type: 'docsVersionDropdown',
          position: 'right',
          dropdownActiveClassDisabled: true,
          dropdownItemsAfter: [
            {
              to: '/versions',
              label: 'All versions',
            },
          ],
        },
        { to: 'funding', label: 'Funding', position: 'right' },
        {
          href: 'https://github.com/admob-plus/admob-plus',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: 'docs/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'User Showcase',
              href: '/users',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/admob-plus/admob-plus',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} <a href="https://github.com/admob-plus/admob-plus/graphs/contributors">AdMob Plus Contributors</a>.`,
    },
  },
  plugins: [
    [
      'docusaurus-plugin-typedoc',
      {
        ...typedocConfig,
        id: 'typedoc-capacitor',
        entryPoints: ['../packages/capacitor/src/index.ts'],
        tsconfig: '../packages/capacitor/tsconfig.json',
        out: 'capacitor/api',
      },
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        ...typedocConfig,
        id: 'typedoc-cordova',
        entryPoints: ['../packages/cordova/src/www/index.ts'],
        tsconfig: '../packages/cordova/tsconfig.json',
        out: 'cordova/api',
      },
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        ...typedocConfig,
        id: 'typedoc-cordova-consent',
        entryPoints: ['../packages/cordova-consent/src/www/index.ts'],
        tsconfig: '../packages/cordova-consent/tsconfig.json',
        out: 'cordova/consent/api',
      },
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        ...typedocConfig,
        id: 'typedoc-ionic',
        entryPoints: ['../packages/ionic/src/ngx/index.ts'],
        tsconfig: '../packages/ionic/tsconfig.json',
        out: 'ionic/api',
        excludeExternals: true,
      },
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        ...typedocConfig,
        id: 'typedoc-react-native',
        entryPoints: ['../packages/react-native/src/index.ts'],
        tsconfig: '../packages/react-native/tsconfig.json',
        out: 'react-native/api',
      },
    ],
  ],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/admob-plus/admob-plus/edit/master/website/',
          lastVersion: 'current',
        },
        blog: {
          showReadingTime: true,
          editUrl:
            'https://github.com/admob-plus/admob-plus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
}
