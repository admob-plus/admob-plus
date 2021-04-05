#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(RNAdMobPlus, NSObject)

RCT_EXTERN_METHOD(start:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end
