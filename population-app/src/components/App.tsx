import React,{ useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { feachPrefectures } from "../actions/ActionCreator";
import { Main } from "./Main";

import "./Style.css";

const App = () => {

  const dispatch = useDispatch();

  const prefApi = `https://opendata.resas-portal.go.jp/api/v1/prefectures`; // 都道府県一覧データAPI

  const apiKey = "01ZALSVrITFH12XwfS2VlTEf6NstZxLDqaEuDs43";

  // X-API-KEY を Setting
  const config = { headers: {
    "Content-Type": "application/json",
    "x-api-key": apiKey
  } }

  // axios通信で、APIサーバー経由でDBからデータを取得する！
  useEffect(()=>{

    // 都道府県の一覧データを取得するAPI通信
    axios.get(prefApi, config)
    .then( (res) => {

      const prefectures = res.data.result;

      // Storeに保存
      dispatch(feachPrefectures(prefectures));
    })
    .catch(console.error);
    
  });


  return (
    <div className="App">
      <header className="App-Header">
        <h1>都道府県の人口推移アプリ</h1>
      </header>
      <Main />
    </div>
  );
};

export default App;
