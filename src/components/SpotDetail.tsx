import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { CategoryButton } from "./BottomSheet";
import { BottomSheetContentContainer } from "./LocationDetail";
import MediumSpotCard from "./MediumSpotCard";
import { InfoText, SimplifiedInfoContainer } from "./ReviewDetail";
import { jsonConnection } from "../api/connectBackend";
import { ApiResponse } from "../types/Common";
import { spotMultiRead } from "../types/Spot";

const SpotListContainer = styled.div`
    margin-top: 1em;
`;

const SpotDetail = (props: {selectedSpotData: spotMultiRead[] | null, setSelectedSpotData: (data: spotMultiRead[] | null) => void}) => {
    const location = useLocation();
    const navigate = useNavigate();
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
        })
    }, [])
    
    useEffect(() => {
        props.setSelectedSpotData(spotData);
    }, [spotData])
    
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
                <CategoryButton
                color="#FF808A"
                onClick={() => navigate(`/addspot?spotfor=${locationId}`)}
                >
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