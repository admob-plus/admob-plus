import {pkgsDirJoin} from '../utils.js';

export default () => ({
  files: [],
  pkgDir: pkgsDirJoin('cordova-native'),
  targetDir: 'src/admob/plus/cordova/nativead',
});
