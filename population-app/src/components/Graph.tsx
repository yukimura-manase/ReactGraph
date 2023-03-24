import { Chart } from "react-google-charts";
import { useSelector } from "react-redux";
import { StateType, TotalPopulation, Prefectures, YearPopulation } from "../types/Type";

import "./Style.css";

const checkSelector = (state: StateType)=> {
  return state.StoreState.checkPrefecture;
};


// CheckBoxのONでStoreからDataを引っ張ってきて、動的に折れ線グラフを作成する。

export const Graph = () => {

	const checkPrefList = useSelector(checkSelector);

	// dataの部分は、CheckBoxと連動して動的に作成する => Storeで管理する！
	const graphData: (string | number)[][] = [
		["年"], ['1960年'],
		['1965年'], ['1970年'],
		['1975年'], ['1980年'],
		['1985年'], ['1990年'], 
		['1995年'], ['2000年'], 
		['2005年'], ['2010年'], 
		['2015年'], ['2020年'], 
	];

	  // [ [ {...} ], [ {...} ] ]の形で都道府県データセットが入ってくる。
		checkPrefList.forEach( (prefDataSet: TotalPopulation) => {
			let firstFlag = true;

			let loopTimes = 0;

			const displayRecodeNum = 13;

			let recodeCount = 1;

			const dataSetLength = prefDataSet.length;

			prefDataSet.forEach( (prefObj: Prefectures | YearPopulation) => {

				loopTimes++;

				if (firstFlag) {

					const basePref = prefObj as Prefectures;

					graphData[0].push(basePref.prefName);
					firstFlag = false;

					// 最後のループでは、FlagとLoopCounterの初期化をする
				} else if (dataSetLength === loopTimes) {

					firstFlag = true;
					loopTimes = 0;

				} else if (displayRecodeNum + 1 > recodeCount) {

					const yearData = prefObj as YearPopulation;
					
					// 12回(1965~2020年)
					graphData[recodeCount].push(yearData.value);
					recodeCount++;
				}
			});

		});

	const options = {
		chart: {
			title: "都道府県の人口推移グラフ",
			subtitle: "1960〜2020年",
		},
		series: {
			1: { curveType: "function" },
		},
	};


	return (
		<div>
    { 
      graphData[0].length === 1
      ? 
      <h2 className="NoCheck-MSG" >チェックボックスから人口の推移を確認したい都道府県を選択してください。</h2>
      :
			<div className="Graph-Block" >
				<Chart
					chartType="Line"
					width="90%"
					height="500px"
					data={graphData}
					options={options}
				/>
			</div>
    }
    </div>
	);
};
  