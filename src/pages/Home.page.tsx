import styled from "@emotion/styled";
import { useState } from "react";

import LocationInfoData from '../api/testdata/LocationInfo.json';
import BottomSheet from "../components/BottomSheet";
import Map from "../components/Map";
import PanButton from "../components/PanButton";
import UpperMenu from "../components/UpperMenu";

const Home = () => {
    const locationData = LocationInfoData;
    const [currentPos, setCurrentPos] = useState({
        center: { lat: 36.769989, lng: 126.931633 }
    })

    return (
        <HomeContainer>
            <Map data={locationData} pos={currentPos}/>
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