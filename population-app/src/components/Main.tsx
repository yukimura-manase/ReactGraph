import { useSelector } from "react-redux";
import { CheckBox } from "./CheckBox";
import { Graph } from "./Graph";
import { Prefectures, StateType } from "../types/Type";


const prefSelector = (state: StateType)=> {
  return state.StoreState.prefectureList;
};

export const Main = () => {

  const prefData = useSelector(prefSelector);

  return (
    <div>
      <div className="Container">
      {
        prefData.map((pref: Prefectures) => {
          return (
            <CheckBox key={pref.prefCode} {...pref} />
          )
        }
        )
      }
      </div>
      <div className="Graph-Style-Support"></div>
      <Graph />
    </div>
  );
};