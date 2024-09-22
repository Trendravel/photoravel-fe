// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styled from "@emotion/styled";
import { useLocation, useNavigate } from "react-router-dom";

import { BottomSheetContentContainer, MainInfoContainer, PlaceName, RatingArea, Description, SeeMoreText, ReviewContainer, ReviewBox, SingleRate, ReviewContent, ReviewImage } from "./LocationDetail";
import { Rate } from "./LocationInfo";
import MultipleImageViewer from "./MultipleImageViewer";
import SpotData from "../api/testdata/spotSingleRead.json"
import { SingleSpot } from "../types/Spot";

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
    const id = queryParam.get("id");
    const spotId = queryParam.get("spotfor");

    const spotData:SingleSpot = SpotData;
    
    return (
        <BottomSheetContentContainer>
            <SpotTitle>
                📍 스팟 상세정보
            </SpotTitle>
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
                            navigate(`/place?spotfor=${spotId}&reviewfor=${id}`);
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
        </BottomSheetContentContainer>
    )
}

export default SingleSpotDetail;