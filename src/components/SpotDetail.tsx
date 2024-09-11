import styled from "@emotion/styled";

import { CategoryButton } from "./BottomSheet";
import { BottomSheetContentContainer } from "./LocationDetail";
import MediumSpotCard from "./MediumSpotCard";
import { InfoText, SimplifiedInfoContainer } from "./ReviewDetail";
import SpotData from "../api/testdata/spotMultiRead.json"
import { MultiSpot } from "../types/Spot";

const SpotListContainer = styled.div`
    margin-top: 1em;
`;

const SpotDetail = () => {
    const spotData:MultiSpot[] = SpotData;

    return (
        <BottomSheetContentContainer>
            <SimplifiedInfoContainer>
                <div>
                    <InfoText color="">
                        사진 스팟
                    </InfoText>
                    <InfoText color="#FF808A">
                        n개
                    </InfoText>
                </div>
                <CategoryButton color="#FF808A">
                    + 스팟 등록하기
                </CategoryButton>
            </SimplifiedInfoContainer>
            <SpotListContainer>
                {
                    spotData.map((spot) =>
                        <MediumSpotCard data={spot}/>
                    )
                }
            </SpotListContainer>
        </BottomSheetContentContainer>
       
    )
}

export default SpotDetail;