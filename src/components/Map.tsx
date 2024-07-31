import { Map, MapMarker } from "react-kakao-maps-sdk";

import useKakaoLoader from "../api/useKakaoLoader"
import LocationInfo_Type from "../api/datatype/LocationInfo_Type";

const KakaoMap = (props: { data: LocationInfo_Type[] }) => {
    const locationData = props.data;

    useKakaoLoader()

    return (
        <Map
        center={{
            lat: 36.769989,
            lng: 126.931633,
        }}
        style={{
            width: "100vw",
            height: "100vh",
            position: "relative",
            zIndex: 0
        }}
        level={5} // 지도의 확대 레벨
        >
            {
            locationData.map((data:LocationInfo_Type) =>
                <MapMarker
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