import { Map } from "react-kakao-maps-sdk";

import useKakaoLoader from "../api/useKakaoLoader"

const KakaoMap = () => {
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
        </Map>
    )
}

export default KakaoMap;