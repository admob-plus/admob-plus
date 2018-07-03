class AMSBanner: NSObject {
    weak var plugin: AMSPlugin!

    init(plugin: AMSPlugin) {
        super.init()

        self.plugin = plugin
    }

    deinit {
        plugin = nil
    }
}
