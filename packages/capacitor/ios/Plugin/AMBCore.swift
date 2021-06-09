
import Foundation
import UIKit
import GoogleMobileAds

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
