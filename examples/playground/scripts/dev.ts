import dotenv from 'dotenv'
import execa from 'execa'

enum Platform {
  android = 'android',
  browser = 'browser',
  ios = 'ios',
}

const main = async () => {
  dotenv.config()

  const platform = (process.env.PLATFORM as Platform) || Platform.ios
  await execa('cordova', ['prepare'], { stdio: 'inherit' })

  switch (platform) {
    case Platform.browser:
      await Promise.all([
        execa(
          'cra-build-watch',
          [
            '--build-path',
            process.env.BUILD_PATH,
            '--after-rebuild-hook',
            `cordova build ${platform}`,
          ],
          {
            stdio: 'inherit',
          },
        ),
        execa('cordova', ['run', platform], { stdio: 'inherit' }),
      ])
      return
    case Platform.android:
      await execa('open', ['-a', 'Android Studio', 'platforms/android'], {
        stdio: 'inherit',
      })
      break
    case Platform.ios:
      await execa('open', ['platforms/ios/AdMob Plus Playground.xcworkspace'], {
        stdio: 'inherit',
      })
      await execa(
        'cra-build-watch',
        [
          '--build-path',
          process.env.BUILD_PATH,
          '--after-rebuild-hook',
          `rsync -avz www/ platforms/${platform}/www`,
        ],
        {
          stdio: 'inherit',
        },
      )
      break
    default:
  }
}

if (require.main === module) main()
