/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

import useKakaoLoader from "../api/useKakaoLoader";
import { Location } from "../types/Location";
import { MapInfo } from "../types/Position";

const KakaoMap = (props: { data: Location[], pos: MapInfo, onMapStateChange: (newState: MapInfo) => void}) => {
    const locationData = props.data;
    const [state, setState] = useState(props.pos);
    const BACKEND_ADDRESS = import.meta.env.VITE_BACKEND_API_ADDRESS;

    const debounce = (func: (map:kakao.maps.Map) => void, delay: number) => {
        let timeout: number;
        return (...args: [map: kakao.maps.Map]) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    };

    useEffect(() => {
        setState(props.pos);
    }, [props.pos]);

    useKakaoLoader();

    const handleCenterChanged = useCallback(debounce((map: kakao.maps.Map) => {
        const newState: MapInfo = {
            center: {
                lat: map.getCenter().getLat(),
                lng: map.getCenter().getLng(),
            },
            level: map.getLevel(),
        };
        
        setState(newState);
        props.onMapStateChange(newState);
    }, 300), [props]);


    return (
        <Map
            center={state.center}
            isPanto={true} // 부드러운 이동
            style={{
                width: "100vw",
                height: "100vh",
                position: "relative",
                zIndex: 0,
            }}
            level={state.level} // 지도의 확대 레벨
            onCenterChanged={handleCenterChanged} // 중심 좌표 변경 시 핸들러 추가
        >
            {
                locationData.map((data: Location) =>
                    <MapMarker
                        key={data.id}
                        position={{
                            lat: data.latitude,
                            lng: data.longitude,
                        }} />
                )
            }
        </Map>
    );
}

export default KakaoMap;
