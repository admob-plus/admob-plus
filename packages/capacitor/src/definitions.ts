declare global {
  interface PluginRegistry {
    AdmobPlusPlugin?: AdmobPlusPluginPlugin
  }
}

export interface AdmobPlusPluginPlugin {
  echo(options: { value: string }): Promise<{ value: string }>
}
