export interface Prefectures {
  prefCode: number;
  prefName: string;
}

export interface YearPopulation {
  year: number;
  value: number;
}

export type TotalPopulation = Prefectures[] & YearPopulation[]

export interface ActionType {
  type: string;
  prefectures?: Prefectures[];
  checkPrefecture?: TotalPopulation;
  deletePref?: Prefectures;
} 

export interface StoreStateType {
  prefectureList: Prefectures[];
  checkPrefecture: TotalPopulation[];
}

// StoreState-Object
export interface StateType {
  StoreState: StoreStateType;
}