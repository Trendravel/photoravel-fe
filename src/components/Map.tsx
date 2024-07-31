import { useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

import LocationInfo_Type from "../api/datatype/LocationInfo_Type";
import useKakaoLoader from "../api/useKakaoLoader"

const KakaoMap = (props: { data: LocationInfo_Type[] }) => {
    const locationData = props.data;
    const [state, setState] = useState({
        // 지도의 초기 위치
        center: { lat: 36.769989, lng: 126.931633 },
      })
    
    if (navigator.geolocation) { 
        navigator.geolocation.getCurrentPosition((pos) => {
            setState({center: {lat: pos.coords.latitude, lng: pos.coords.longitude}})
        })
    }

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