import { Prefectures, TotalPopulation } from "../types/Type";

export const FEACHPREFECTURES = "feachPrefectures";

export const CHECKPREFECTURE = "checkPrefecture";

export const DELETECHECKPREF = "deleteCheckPref";

export const feachPrefectures = (prefectures: Prefectures[]) => {
  return {
    type: FEACHPREFECTURES,
    prefectures: prefectures,
  };
};

export const checkPrefecture = (totalPopulation: TotalPopulation) => {
  return {
    type: CHECKPREFECTURE,
    checkPrefecture: totalPopulation,
  };
};

export const deleteCheckPref = (prefBase: Prefectures) => {
  return {
    type: DELETECHECKPREF,
    deletePref: prefBase,
  };
}
