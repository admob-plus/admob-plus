import Foundation
import UIKit
import GoogleMobileAds

enum AMBCoreError: Error {
    case notImplemented
    case unknown
}

protocol AMBHelperAdapter {
}

extension AMBHelperAdapter {
}

class AMBHelper {
    static let window = UIApplication.shared.keyWindow!

    static var topAnchor: NSLayoutYAxisAnchor {
        if #available(iOS 11.0, *) {
            return window.safeAreaLayoutGuide.topAnchor
        } else {
            return window.topAnchor
        }
    }

    static var bottomAnchor: NSLayoutYAxisAnchor {
        if #available(iOS 11.0, *) {
            return window.safeAreaLayoutGuide.bottomAnchor
        } else {
            return window.bottomAnchor
        }
    }

    let adapter: AMBHelperAdapter

    init(_ adapter: AMBHelperAdapter) {
        self.adapter = adapter
    }
}

protocol AMBCoreContext {
    func optString(_ name: String) -> String?

    func optId() -> Int?
    func optAdUnitID() -> String?
    func optGADRequest() -> GADRequest

    func resolve(_ data: [String: Any])
    func resolve(_ data: Bool)

    func reject(_ msg: String)
}

extension AMBCoreContext {
    func optAd() -> AMBCoreAd? {
        guard let id = optId(),
              let ad = AMBCoreAd.ads[id]
        else {
            return nil
        }
        return ad
    }

    func optAdOrError() -> AMBCoreAd? {
        if let ad = optAd() {
            return ad
        } else {
            reject("Ad not found: \(optId() ?? -1)")
            return nil
        }
    }

    func resolve() {
        resolve([:])
    }

    func resolve(_ data: Bool) {
        resolve(["value": data])
    }

    func reject() {
        return reject(AMBCoreError.unknown)
    }

    func reject(_ error: Error) {
        reject(error.localizedDescription)
    }
}

class AMBCoreAd: NSObject {
    static var ads = [Int: AMBCoreAd]()

    let id: Int
    let adUnitId: String
    let adRequest: GADRequest

    init(id: Int, adUnitId: String, adRequest: GADRequest) {
        self.id = id
        self.adUnitId = adUnitId
        self.adRequest = adRequest

        super.init()

        DispatchQueue.main.async {
            AMBCoreAd.ads[id] = self
        }
    }

    convenience init?(_ ctx: AMBCoreContext) {
        guard let id = ctx.optId(),
              let adUnitId = ctx.optAdUnitID()
        else {
            return nil
        }
        self.init(id: id, adUnitId: adUnitId, adRequest: ctx.optGADRequest())
    }

    deinit {
        DispatchQueue.main.async {
            AMBCoreAd.ads.removeValue(forKey: self.id)
        }
    }
}
