class AMSAdBase: NSObject {
    weak var plugin: AMSPlugin!

    init(plugin: AMSPlugin) {
        super.init()

        self.plugin = plugin
    }

    deinit {
        plugin = nil
    }

    func createGADRequest() {
        let request = GADRequest()
        return request
    }
}
