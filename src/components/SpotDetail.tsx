import styled from "@emotion/styled";
import { useEffect, useState } from "react";

import { CategoryButton } from "./BottomSheet";
import { BottomSheetContentContainer } from "./LocationDetail";
import MediumSpotCard from "./MediumSpotCard";
import { InfoText, SimplifiedInfoContainer } from "./ReviewDetail";
import { spotMultiRead } from "../types/Spot";
import { jsonConnection } from "../api/connectBackend";
import { ApiResponse } from "../types/Common";
import { useLocation } from "react-router-dom";

const SpotListContainer = styled.div`
    margin-top: 1em;
`;

const SpotDetail = (props: {selectedSpotData: spotMultiRead[] | null, setSelectedSpotData: (data: spotMultiRead[] | null) => void}) => {
    const location = useLocation();
    const queryParam = new URLSearchParams(location.search);
    const locationId = queryParam.get('spotfor');
    const [spotData, setSpotData] = useState<spotMultiRead[] | null>(null);

    useEffect(() => {
        jsonConnection.get<ApiResponse<spotMultiRead[]>>(`/public/location/${locationId}/spots`)
        .then((res) => {
            const data = res.data.data;
            console.log(data);
            if (data)
                setSpotData(data);
        })
        .catch((e) => {
            console.error(e);
            alert("스팟을 불러오는 데 실패했습니다!")
        })
    }, [])
    
    useEffect(() => {
        props.setSelectedSpotData(spotData);
    }, [])
    
    return (
        <BottomSheetContentContainer>
            {
                spotData &&
                <>
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
                </>
            }
            
        </BottomSheetContentContainer>
       
    )
}

export default SpotDetail;