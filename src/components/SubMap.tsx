import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

import { Position } from "../types/Position";

const KakaoMap = (props: {pos: Position, setPos: React.Dispatch<React.SetStateAction<Position>>}) => {
    const [state, setState] = useState({
        center: {
            lat: 36.769989,
            lng: 126.931633
        }
    })
    

    useEffect(() => {
        const getCurrentPosition = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setState({
                            center: {
                                lat: latitude,
                                lng: longitude
                            }
                        });
                    },
                    () => {
                        alert("현재 위치를 가져올 수 없습니다.");
                    }
                );
            } else {
                alert("이 브라우저는 Geolocation을 지원하지 않습니다.");
            }
        };

        getCurrentPosition();
    }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행

    return (
        <Map
        center={state.center}
        isPanto={true} // 부드러운 이동
        style={{
            width: "100vw",
            height: "40vh",
            position: "relative",
            zIndex: 0
        }}
        level={5} // 지도의 확대 레벨
        onClick={(_, mouseEvent) => {
            const latlng = mouseEvent.latLng;

            props.setPos({
                latitude: latlng.getLat(),
                longitude: latlng.getLng()
            })

        }}
        >
            <MapMarker
                position={{
                    lat: props.pos.latitude,
                    lng: props.pos.longitude
                }}
            />
        </Map>
    )
}

export default KakaoMap;