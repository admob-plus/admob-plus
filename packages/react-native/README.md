
# react-native-ad-mob-plus

## Getting started

`$ npm install react-native-ad-mob-plus --save`

### Mostly automatic installation

`$ react-native link react-native-ad-mob-plus`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-ad-mob-plus` and add `RNAdMobPlus.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNAdMobPlus.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import admob.plus.rn.RNAdMobPlusPackage;` to the imports at the top of the file
  - Add `new RNAdMobPlusPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-ad-mob-plus'
  	project(':react-native-ad-mob-plus').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-ad-mob-plus/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-ad-mob-plus')
  	```


## Usage
```javascript
import RNAdMobPlus from 'react-native-ad-mob-plus';

// TODO: What to do with the module?
RNAdMobPlus;
```
  