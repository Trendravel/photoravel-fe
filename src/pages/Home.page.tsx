import styled from "@emotion/styled";

import LocationInfoData from '../api/testdata/LocationInfo.json';
import BottomSheet from "../components/BottomSheet";
import Map from "../components/Map";
import UpperMenu from "../components/UpperMenu";

const Home = () => {
    const locationData = LocationInfoData;

    return (
        <HomeContainer>
            <Map data={locationData}/>
            <UpperMenu/>
            <BottomSheet data={locationData}/>
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
    background-color: #f0f0f0;
`;

export default Home;