import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

import { Rate } from "./LocationInfo";
import MultipleImageViewer from "./MultipleImageViewer";
import SmallSpotCard from "./SmallSpotCard";
import SpotInfo from "../api/testdata/spotMultiRead.json";
import { SingleLocation } from "../types/Location";
import { MultiSpot, spotMultiRead } from "../types/Spot";

export const BottomSheetContentContainer = styled.div`
    display: block;
    margin-top: 0.5em;
    padding: 0.25em 1.5em 0.5em 1.5em;
`;

export const MainInfoContainer = styled.div`
    margin: 1em 0em 1em 0em;
`;

export const PlaceName = styled.p`
    font-size: 15pt;
    text-align: left;
    font-weight: 500;
`;

const Address = styled.p`
    margin-top: 0.4em;
    text-align: left;
    color: #999999;
    font-weight: 500;
    font-size: 9pt;
`;

export const RatingArea = styled.div`
    text-align: left;
    margin: 1.5em 0.25em 0.5em 0.25em;
    display: flex;
    justify-content: space-between;
`
export const SingleRate = styled.p`
    text-align: left;
    font-weight: 500;
    font-size: 10pt;
    margin-left: 0.5em;
`;

export const ReviewContent = styled.div`
    display: flex;
    padding: 0.5em 0 0.5em 0;
    font-size: 11pt
`;

export const ReviewBox = styled.div`
    width: 70vw;
    height: 6em;
    padding: 0.5em;
    border-radius: 0.25em;
    border: 1px solid #d0d0d0;
`;

export const ReviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 1em;
    width: 100%;
    height: 6.5em;
    padding: 0.25em;
    overflow-x: scroll;
    overflow-y: none;
    -ms-overflow-style: none;
    scrollbar-width: none;
`

export const ReviewImage = styled.img`
    width: 4em;
    height: 4em;
    padding: 0.1em;
`;

export const Description = styled.div`
    overflow-y: scroll;
    max-height: 5em;
    margin-top: 0.5em;
    padding: 0.5em;
    border-radius: 0.5em;
    background-color: #f8f8f8;
    box-shadow: 0 1px 1px 1px #f4f4f4;
    font-size: 11pt;
    white-space: pre-line;
`;

const SpotCardContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 12.5em;
    gap: 1em;
    overflow-x: scroll;
    overflow-y: none;
    -ms-overflow-style: none;
    scrollbar-width: none;
`;

const SpotContainer = styled.div`
    text-align: left;
`;

const SpotText = styled.p`
    font-weight: 500;
`;

export const SeeMoreText = styled.p`
    font-size: 9pt;
    font-weight: 400;
`;

const LocationDetail = (props: {data: SingleLocation}) => {
    const navigate = useNavigate();
    const spotData:MultiSpot[] = SpotInfo;

    return (
        <BottomSheetContentContainer>
            <MultipleImageViewer height="20vh" src={props.data.images}/>
            <MainInfoContainer>
                <PlaceName>{props.data.name}</PlaceName>
                <Address>📍 {props.data.address}</Address>
                <Description>
                    { props.data.description }
                </Description>
                <RatingArea>
                    <Rate>
                        ⭐ {props.data.ratingAvg} ({props.data.reviewCounts >= 99?
                                                    "99" :props.data.reviewCounts })
                    </Rate>
                    <SeeMoreText
                        onClick={(e) => {
                            e.stopPropagation()
                            navigate(`/place?reviewfor=${props.data.locationId}`) 
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
                        props.data.recentReviewDtos.map((review, i) => 
                            <ReviewBox
                                key={i}
                                onClick={() => navigate(`/place?reviewfor=${props.data.locationId}`) }
                            >
                                <SingleRate>
                                    ⭐️ {review.rating}
                                </SingleRate>
                                <ReviewContent>
                                    {
                                        review.images[0]? <ReviewImage src={review.images[0]}/>:<></>
                                    }
                                    {review.content}
                                </ReviewContent>
                            </ReviewBox>
                        )
                    }
                    
                </ReviewContainer>
                <SpotContainer>
                    <RatingArea>
                        <SpotText>
                            이 장소의 포토스팟 📸
                        </SpotText>
                        <SeeMoreText
                        onClick={(e) => {
                            e.stopPropagation()
                            navigate(`/place?spotfor=${props.data.locationId}`) 
                        }}
                        >
                            전체보기 &gt;
                        </SeeMoreText>
                    </RatingArea>
                    
                    <SpotCardContainer
                    onTouchStart={(e) => e.stopPropagation()}
                    onTouchEnd={(e) => e.stopPropagation()}
                    >
                        {
                            spotData.map((spot: spotMultiRead) =>
                                <SmallSpotCard
                                key={spot.spotId}
                                data={spot}
                                />
                            )
                        }
                    </SpotCardContainer>
                </SpotContainer>
            </MainInfoContainer>
        </BottomSheetContentContainer>
    )
    
}

export default LocationDetail;