import execa from 'execa'

const buildReactApp = () =>
  execa('react-scripts', ['build'], { stdio: 'inherit' })

const main = async () => {
  await buildReactApp()
}

export default main

if (require.main === module) main()
