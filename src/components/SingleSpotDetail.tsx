// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styled from "@emotion/styled";

import { BottomSheetContentContainer, MainInfoContainer, PlaceName, RatingArea, Description, SeeMoreText, ReviewContainer, ReviewBox, SingleRate, ReviewContent, ReviewImage } from "./LocationDetail";
import { Rate } from "./LocationInfo";
import MultipleImageViewer from "./MultipleImageViewer";
import SpotData from "../api/testdata/spotSingleRead.json"
import { SingleSpot } from "../types/Spot";

const SingleSpotDetail = () => {
    
    const spotData:SingleSpot = SpotData;
    
    return (
        <BottomSheetContentContainer>
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
                            e.stopPropagation()
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
                                onClick={() => {}}
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