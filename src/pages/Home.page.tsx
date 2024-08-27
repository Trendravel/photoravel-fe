/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useState } from "react";

import LocationInfoData from '../api/testdata/LocationInfo.json';
import BottomSheet from "../components/BottomSheet";
import Map from "../components/Map";
import PanButton from "../components/PanButton";
import UpperMenu from "../components/UpperMenu";
import { MapInfo } from "../types/Position";

const Home = () => {
    const BACKEND_ADDRESS = import.meta.env.VITE_BACKEND_API_ADDRESS;
    const [locationData, setLocationData] = useState(LocationInfoData);
    const [mapState, setMapState] = useState<MapInfo>({ center: { lat: 37.5665, lng: 126.978 }, level: 3 });
    const [currentPos, setCurrentPos] = useState({
        center: { lat: 36.769989, lng: 126.931633 },
        level: 6
    })

    useEffect(() => { // mapState가 변경될 때 새로운 장소 정보 불러오기
        console.log(mapState)
        /** 
        axios.get(`${BACKEND_ADDRESS}/nowPosition?latitude=${mapState.center.lat}&longitude=${mapState.center.lng}&range=${mapState.level}`)
            .then((res) => { setLocationData(res); })
            .catch((e) => { console.log(e); })
        */
    , [mapState]})

    return (
        <HomeContainer>
            <Map data={locationData} pos={currentPos} onMapStateChange={setMapState}/>
            <UpperMenu/>
            <BottomSheet data={locationData}/>
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