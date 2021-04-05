@objc(RNAdMobPlus)
class RNAdMobPlus: NSObject {
    @objc func start(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
        print("started")
        resolve("started")
    }
}
