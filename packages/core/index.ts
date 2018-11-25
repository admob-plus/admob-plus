export type AdUnitIDOption =
  | string
  | {
      android: string;
      ios: string;
    }

export interface IAdRequest {
  id?: AdUnitIDOption
}
