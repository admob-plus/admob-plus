import execa from 'execa'
import path from 'path'

function getPlatform() {
  const platform = process.env.PLATFORM || ''
  if (platform.indexOf('android') === 0) {
    return 'android'
  }
  if (platform.indexOf('ios') === 0) {
    return 'ios'
  }
  return null
}

test('pass tests', async () => {
  const platform = getPlatform()
  if (!platform) {
    return
  }

  const { code } = await execa('cordova-testbed', ['--platform', platform, '--plugin', '.'], {
    cwd: path.join(__dirname, '..'),
    reject: false,
    stdio: 'inherit',
  })
  expect(code).toBe(0)
})
