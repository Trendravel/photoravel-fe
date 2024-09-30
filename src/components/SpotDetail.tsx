import styled from "@emotion/styled";
import { useEffect } from "react";

import { CategoryButton } from "./BottomSheet";
import { BottomSheetContentContainer } from "./LocationDetail";
import MediumSpotCard from "./MediumSpotCard";
import { InfoText, SimplifiedInfoContainer } from "./ReviewDetail";
import SpotData from "../api/testdata/spotMultiRead.json"
import { spotMultiRead } from "../types/Spot";

const SpotListContainer = styled.div`
    margin-top: 1em;
`;

const SpotDetail = (props: {selectedSpotData: spotMultiRead[] | null, setSelectedSpotData: (data: spotMultiRead[] | null) => void}) => {
    const spotData: spotMultiRead[] | null = SpotData;
    
    useEffect(() => {
        props.setSelectedSpotData(spotData);
    }, [])
    

    return (
        <BottomSheetContentContainer>
            <SimplifiedInfoContainer>
                <div>
                    <InfoText color="">
                        사진 스팟
                    </InfoText>
                    <InfoText color="#FF808A" style={{marginTop:"0.15em"}}>
                        {spotData.length}개
                    </InfoText>
                </div>
                <CategoryButton color="#FF808A">
                    + 스팟 등록하기
                </CategoryButton>
            </SimplifiedInfoContainer>
            <SpotListContainer>
                {
                    spotData.map((spot) =>
                        <MediumSpotCard
                            key={spot.spotId}
                            data={spot}
                        />
                    )
                }
            </SpotListContainer>
        </BottomSheetContentContainer>
       
    )
}

export default SpotDetail;