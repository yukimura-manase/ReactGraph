import { FEACHPREFECTURES, CHECKPREFECTURE, DELETECHECKPREF } from "../actions/ActionCreator";
import { ActionType, StoreStateType } from "../types/Type";

export const initialState: StoreStateType = {
  prefectureList: [],
  checkPrefecture: [],
};

export default (state = initialState, action: ActionType) => {
  switch (action.type) {

    // App作成時の都道府県の一覧データを取得するAPI通信のStoreState保管処理
    case FEACHPREFECTURES: {
      return { ...state, prefectureList: action.prefectures };
    }

    // CheckBox選択(ON)による人口構成データAPI通信のStoreState保管処理 => 後から追加される
    case CHECKPREFECTURE: {

      const copyCheckList = [ ...state.checkPrefecture ];

      if (action.checkPrefecture) copyCheckList.push(action.checkPrefecture);

      return { ...state, checkPrefecture: copyCheckList };
    }

    // CheckBox選択(OFF)によるStoreStateからの一部・削除処理
    case DELETECHECKPREF: {

      const deleteTarget = action.deletePref;

      const copyCheckList = [ ...state.checkPrefecture ];

      if (deleteTarget) {

        let deleteIndex = 0;
        copyCheckList.forEach( (prefeDataSet, index) => {
          if ( prefeDataSet[0].prefCode === deleteTarget.prefCode ) deleteIndex = index;
        });
        
        copyCheckList.splice(deleteIndex, 1);
      }
      return { ...state, checkPrefecture: copyCheckList };
    }

    default:
      return state;
  }
};
