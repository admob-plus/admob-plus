declare global {
  interface PluginRegistry {
    AdmobPlus?: AdmobPlusPlugin
  }
}

export interface AdmobPlusPlugin {
  echo(options: { value: string }): Promise<{ value: string }>
}
