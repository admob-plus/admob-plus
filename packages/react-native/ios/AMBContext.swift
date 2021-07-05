import GoogleMobileAds

class AMBContext: AMBCoreContext {
    func has(_ name: String) -> Bool {
        return opt(name) != nil
    }

    func optBool(_ name: String) -> Bool? {
        return opt(name) as? Bool
    }

    func optFloat(_ name: String) -> Float? {
        return opt(name) as? Float
    }

    func optInt(_ name: String) -> Int? {
        return opt(name) as? Int
    }

    func optString(_ name: String, _ defaultValue: String) -> String {
        if let v = opt(name) as? String {
            return v
        }
        return defaultValue
    }

    func optStringArray(_ name: String) -> [String]? {
        return opt(name) as? [String]
    }

    func resolve(_ data: [String: Any]) {
        promiseReolve(data)
    }

    func reject(_ msg: String) {
        promiseReject("unknown", msg, nil)
    }

    func reject(_ error: NSError) {
        promiseReject(error.code.description, error.localizedDescription, error)
    }

    func reject(_ error: Error?) {
        if error != nil {
            promiseReject("error", error!.localizedDescription, error)
        } else {
            reject()
        }
    }

    static weak var plugin: AdMobPlusRN!

    let opts: NSDictionary?
    let promiseReolve: RCTPromiseResolveBlock
    let promiseReject: RCTPromiseRejectBlock

    init(_ opts: NSDictionary?,
         _ resolve: @escaping RCTPromiseResolveBlock,
         _ reject: @escaping RCTPromiseRejectBlock) {
        self.opts = opts
        self.promiseReolve = resolve
        self.promiseReject = reject
    }

    func opt(_ key: String) -> Any? {
        return opts?.value(forKey: key)
    }

    func optGADServerSideVerificationOptions() -> GADServerSideVerificationOptions? {
        guard let ssv = opt("serverSideVerification") as? NSDictionary
        else {
            return nil
        }

        let options = GADServerSideVerificationOptions.init()
        if let customData = ssv.value(forKey: "customData") as? String {
            options.customRewardString = customData
        }
        if let userId = ssv.value(forKey: "userId") as? String {
            options.userIdentifier = userId
        }
        return options
    }
}
