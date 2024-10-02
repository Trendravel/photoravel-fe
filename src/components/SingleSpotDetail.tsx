// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { BottomSheetContentContainer, MainInfoContainer, PlaceName, RatingArea, Description, SeeMoreText, ReviewContainer, ReviewBox, SingleRate, ReviewContent, ReviewImage } from "./LocationDetail";
import { Rate } from "./LocationInfo";
import MultipleImageViewer from "./MultipleImageViewer";
import { jsonConnection } from "../api/connectBackend";
import { ApiResponse } from "../types/Common";
import { spotSingleRead } from "../types/Spot";

const SpotTitle = styled.p`
    text-align: left;
    font-weight: 600;
    font-size: 16pt;
    margin: 0.5em 0 0.5em 0;
`;

const SingleSpotDetail = () => { // To-do: 스팟 리뷰 연동 구현
    const navigate = useNavigate();
    const location = useLocation();
    const queryParam = new URLSearchParams(location.search);
    const spotId = queryParam.get("id");
    const locationId = queryParam.get("spotfor");
    const [spotData, setSpotData] = useState<spotSingleRead|null>(null);

    useEffect(() => {
        jsonConnection.get<ApiResponse<spotSingleRead>>(`/public/location/${locationId}/spot/${spotId}/detail`)
        .then((res) => {
            const data = res.data.data;
            if (data)
                setSpotData(data);
        })
    }, [])
    
    return (
        <BottomSheetContentContainer>
            <SpotTitle>
                📍 스팟 상세정보
            </SpotTitle>
            {
            spotData &&
            <>
            <MultipleImageViewer height="20vh" src={spotData.images}/>
            <MainInfoContainer>
                <PlaceName>
                    {spotData.title}
                </PlaceName>
                <Description>
                    {spotData.description}
                </Description>
                <RatingArea>
                    <Rate>
                    ⭐ {spotData.ratingAvg} ({spotData.reviewCounts >= 99?
                    "99" :spotData.reviewCounts })
                    </Rate>
                    <SeeMoreText
                        onTouchStart={(e) => {
                            e.stopPropagation();
                        }}
                        onClick={() => {
                            navigate(`/place?spotfor=${spotId}&reviewfor=${locationId}`);
                        }}
                    >
                        전체보기 &gt;
                    </SeeMoreText>
                </RatingArea>
                <ReviewContainer
                    onTouchStart={(e) => e.stopPropagation()}
                    onTouchEnd={(e) => e.stopPropagation()}
                >
                    {
                        spotData.recentReviewDtos.map((review, i) => 
                            <ReviewBox
                                key={i}
                            >
                                <SingleRate>
                                    ⭐️ {review.rating}
                                </SingleRate>
                                <ReviewContent>
                                    {
                                        review.images[0]? <ReviewImage src={review.images[0]}/>: <></>
                                    }
                                    {review.content}
                                </ReviewContent>
                            </ReviewBox>
                        )
                    }
                </ReviewContainer>
            </MainInfoContainer>
            </>
            }
        </BottomSheetContentContainer>
    )
}

export default SingleSpotDetail;