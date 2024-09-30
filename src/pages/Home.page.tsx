/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from "@emotion/styled";
import { useEffect, useState } from "react";

import { jsonConnection } from "../api/connectBackend";
import LocationInfoData from '../api/testdata/locationMultiRead.json';
import BottomSheet from "../components/BottomSheet";
import Map from "../components/Map";
import PanButton from "../components/PanButton";
import ReloadButton from "../components/ReloadButton";
import UpperMenu from "../components/UpperMenu";
import { ApiResponse } from "../types/Common";
import { MapInfo } from "../types/Position";
import { spotMultiRead } from "../types/Spot";

const Home = () => {
    const BACKEND_ADDRESS = import.meta.env.VITE_BACKEND_API_ADDRESS;
    const [locationData, setLocationData] = useState(LocationInfoData);
    const [isUpdated, setIsUpdated] = useState(true);
    const [mapState, setMapState] = useState<MapInfo>({ center: { lat: 37.5665, lng: 126.978 }, level: 3 });
    const [currentPos, setCurrentPos] = useState({
        center: { lat: 36.769989, lng: 126.931633 },
        level: 6
    })
    const [selectedSpotData, setSelectedSpotData] = useState<spotMultiRead[] | null>(null);

    const updateEvent = () => { // mapState 변경 시, 장소를 새로 불러올 클릭 이벤트
        
        jsonConnection.get<ApiResponse<MapInfo>>(`${BACKEND_ADDRESS}/public/nowPosition?latitude=${mapState.center.lat}&longitude=${mapState.center.lng}&range=${mapState.level*1000}`)
            .then((res) => { console.log(res) })
            .catch((e) => { console.log(e); })

       setIsUpdated(true);
    }

    useEffect(() => {
        //
    }, [])

    return (
        <HomeContainer>
            <Map
            locationData={locationData}
            pos={currentPos}
            spotData={selectedSpotData}
            onMapStateChange={setMapState}
            setIsUpdated={setIsUpdated}
            />
            <ReloadButton isOpen={!isUpdated} clickEvent={updateEvent}/>
            <UpperMenu/>
            <BottomSheet
            locationData={locationData}
            selectedSpotData={selectedSpotData}
            setSelectedSpotData={setSelectedSpotData}
            />
            <PanButton setPos={setCurrentPos}/>
        </HomeContainer>
    )
}

const HomeContainer = styled.div`
    position: fixed;
    width: 100vw;
    height: 100%;
    text-align: center;
    margin: 0;
    padding: 0;
    overflow: hidden;
`;

export default Home;