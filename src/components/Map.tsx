/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useState } from "react";
import { Map, MapMarker, CustomOverlayMap, MarkerClusterer } from "react-kakao-maps-sdk";
import { useLocation, useNavigate } from "react-router-dom";

import useKakaoLoader from "../api/useKakaoLoader";
import MarkerImage from "../assets/images/pin.png";
import { MultipleLocation } from "../types/Location";
import { MapInfo } from "../types/Position";

const KakaoMap = (props: { data: MultipleLocation[], pos: MapInfo, onMapStateChange: (newState: MapInfo) => void, setIsUpdated: (state: boolean) => void }) => {
    const locationData = props.data;
    const [state, setState] = useState(props.pos);
    const BACKEND_ADDRESS = import.meta.env.VITE_BACKEND_API_ADDRESS;
    const navigate = useNavigate();
    const location = useLocation();
    const queryParam = new URLSearchParams(location.search);
    const id = queryParam.get("id");

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
        if (id === null)
            setState(props.pos);
    }, [props.pos]);

    useEffect(() => { // 장소 상세페이지 이동 시, 지도 이동 로직
        if (id) {
            const targetPlace = props.data.find((item) => item.locationId === Number(id))
                if (targetPlace) {
                    setState({
                        center: {
                            lat: targetPlace.latitude,
                            lng: targetPlace.longitude
                        },
                        level: 6
                    })
                } else {
                    alert("해당 장소 정보를 불러올 수 없습니다!")
                }
        }
    }, [props.data, id]);

    useKakaoLoader();

    const handleCenterChanged = useCallback(debounce((map: kakao.maps.Map) => {
        const newState: MapInfo = {
            center: {
                lat: map.getCenter().getLat(),
                lng: map.getCenter().getLng(),
            },
            level: map.getLevel(),
        };
        
        if (!id) {
            setState(newState);
            props.onMapStateChange(newState);
        }

        props.setIsUpdated(false);
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
            onClick={() => {
                if (id) {
                    navigate('/')
                }
            }}
        >
            <MarkerClusterer
                minLevel={8}
            >
            {
                locationData.map((data: MultipleLocation) => (
                    <div key={data.locationId}>
                        <MapMarker
                            key={data.locationId}
                            image={{
                                src: MarkerImage.toString(),
                                size: { width: 25, height: 25 }
                            }}
                            position={{
                                lat: data.latitude,
                                lng: data.longitude,
                            }}
                            onClick={() => { navigate(`/place?id=${data.locationId}`) }}
                        />
                        <CustomOverlayMap
                        position={{ lat: data.latitude, lng: data.longitude }}
                        yAnchor={1}>
                            <p
                            style={{
                                transform: 'translateY(20px)',
                                fontSize: '10pt'
                            }}>
                                {data.name}
                            </p>
                        </CustomOverlayMap>
                    </div>
                ))
            }
            </MarkerClusterer>
            
        </Map>
    );
}

export default KakaoMap;
