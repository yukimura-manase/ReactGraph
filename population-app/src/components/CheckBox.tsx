import { Prefectures } from "../types/Type";
import axios from "axios";
import { useDispatch } from "react-redux";
import { checkPrefecture, deleteCheckPref } from "../actions/ActionCreator";
import "./Style.css";

export const CheckBox = (props: Prefectures) => {

  const dispatch = useDispatch();

  // 人口構成データAPIと通信 & StoreStateに加工したデータを保管する
  const composition = (event: React.ChangeEvent<HTMLInputElement> , prefCode: number, prefName: string) => {
    
    // CheckBoxのON/OFF-Check
    const checkBool = event.target.checked;

    // CheckBoxがONの時は、Setする
    if (checkBool) {

      const apiKey = "01ZALSVrITFH12XwfS2VlTEf6NstZxLDqaEuDs43";

      // X-API-KEY を Setting
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        }
      };

      const params = {
        cityCode: "-",
        prefCode: `${prefCode}`,
      };

      const urlSearchParam = new URLSearchParams(params).toString();

      // 人口構成データAPI
      const comPositionAPI = `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?${urlSearchParam}`;

      axios.get(comPositionAPI, config)
      .then( (res) => {

        const totalPopulation = res.data.result.data.find( (val: {label:string, data: object[]}) => val.label === '総人口' ).data;

        const prefBase = { prefCode, prefName };

        totalPopulation.unshift(prefBase);

        // Storeに保存
        dispatch(checkPrefecture(totalPopulation));

      })
      .catch(console.error);
    } else {
      const prefBase = { prefCode, prefName };

      // CheckBox-OFF => StoreState から削除する
      dispatch(deleteCheckPref(prefBase));
    }
    
  };

  return (
    <label key={props.prefCode} className="Pref-CheckBox">
        <input type="checkbox" name="prefecture" value={props.prefCode}
          onChange={ (event)=>{composition(event, props.prefCode, props.prefName)} }
        />
        {props.prefName}
    </label> 
  );
};