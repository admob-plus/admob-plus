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
  const buildPath = process.env.BUILD_PATH
  await execa('example', ['prepare'], { stdio: 'inherit' })

  switch (platform) {
    case Platform.browser:
      await Promise.all([
        execa(
          'cra-build-watch',
          [
            '--build-path',
            buildPath,
            '--after-rebuild-hook',
            `cordova build ${platform}`,
          ],
          { stdio: 'inherit' },
        ),
        execa('cordova', ['run', platform], { stdio: 'inherit' }),
      ])
      return
    case Platform.android:
      await Promise.all([
        execa('example', ['open-android'], { stdio: 'inherit' }),
        execa(
          'cra-build-watch',
          [
            '--build-path',
            buildPath,
            '--after-rebuild-hook',
            `rsync -avz www/ platforms/${platform}/app/src/main/assets/www`,
          ],
          { stdio: 'inherit' },
        ),
      ])
      break
    case Platform.ios:
      await Promise.all([
        execa('example', ['dev', 'ios'], { stdio: 'inherit' }),
        execa(
          'cra-build-watch',
          [
            '--build-path',
            buildPath,
            '--after-rebuild-hook',
            `rsync -avz www/ platforms/${platform}/www`,
          ],
          { stdio: 'inherit' },
        ),
      ])
      break
    default:
  }
}

if (require.main === module) main()
