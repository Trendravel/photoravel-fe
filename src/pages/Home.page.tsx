import styled from "@emotion/styled";

import BottomSheet from "../components/BottomSheet";
import Map from "../components/Map";
import UpperMenu from "../components/UpperMenu";

const Home = () => {
    return (
        <HomeContainer>
            <Map/>
            <UpperMenu/>
            <BottomSheet/>
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