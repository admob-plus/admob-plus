export interface AdmobPlusPlugin {
  echo(options: { value: string }): Promise<{ value: string }>
}
