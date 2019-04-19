
  Pod::Spec.new do |s|
    s.name = 'AdmobPlusCapacitor'
    s.version = '0.0.1'
    s.summary = 'Capacitor AdMob Plugin'
    s.license = 'MIT'
    s.homepage = 'https://github.com/admob-plus/admob-plus.git'
    s.author = 'Ratson'
    s.source = { :git => 'https://github.com/admob-plus/admob-plus.git', :tag => s.version.to_s }
    s.source_files = 'ios/Plugin/Plugin/**/*.{swift,h,m,c,cc,mm,cpp}'
    s.ios.deployment_target  = '11.0'
    s.dependency 'Capacitor'
  end