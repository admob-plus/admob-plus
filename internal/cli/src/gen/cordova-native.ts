import { pkgsDirJoin } from '../utils'

export default () => ({
  files: [],
  pkgDir: pkgsDirJoin('cordova-native'),
  targetDir: 'src/admob/plus/cordova/nativead',
})
