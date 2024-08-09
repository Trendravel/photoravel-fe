import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

import LocationInfo_Type from "../api/datatype/LocationInfo_Type";
import PanPosition from "../api/datatype/PanPosition_Type";
import useKakaoLoader from "../api/useKakaoLoader"

const KakaoMap = (props: { data: LocationInfo_Type[], pos: PanPosition}) => {
    const locationData = props.data;
    const [state, setState] = useState(props.pos)

    useEffect(() => {
        setState(props.pos)
    });
    
    useKakaoLoader()

    return (
        <Map
        center={state.center}
        isPanto={true} // 부드러운 이동
        style={{
            width: "100vw",
            height: "100vh",
            position: "relative",
            zIndex: 0
        }}
        level={6} // 지도의 확대 레벨
        >
            {
            locationData.map((data:LocationInfo_Type) =>
                <MapMarker
                key={data.id}
                position={{
                    lat: data.latitude,
                    lng: data.longitude,
                }}/>
            )
            }
        </Map>
    )
}

export default KakaoMap;