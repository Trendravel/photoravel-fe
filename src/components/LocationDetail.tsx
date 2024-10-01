import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

import { Rate } from "./LocationInfo";
import MultipleImageViewer from "./MultipleImageViewer";
import SmallSpotCard from "./SmallSpotCard";
import SpotInfo from "../api/testdata/spotMultiRead.json";
import { SingleLocation } from "../types/Location";
import { MultiSpot, spotMultiRead } from "../types/Spot";
import { useEffect, useState } from "react";
import jsonConnection from "../api/connectBackend";
import { ApiResponse } from "../types/Common";

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

const LocationDetail = (props: {data: SingleLocation | undefined }) => {
    const navigate = useNavigate();
    // TODO: 스팟 불러오기
    
    const locationData = props.data;
    const [spotData, setSpotData] = useState<MultiSpot[] | undefined>(undefined);
    
    useEffect(() => {
        jsonConnection.get<ApiResponse<MultiSpot[]>>(`/public/location/${locationData?.locationId}/spots`)
        .then((res) => {
            const data = res.data.data;
            setSpotData(data);
            
            if (spotData)
                console.log(spotData);
        })
        .catch((e) => {
            alert("스팟을 불러오는데 실패했습니다!");
            console.error(e);
        })
    }, [])

    return (
        <BottomSheetContentContainer>
            {
                (locationData !== undefined) &&
                <>
                <MultipleImageViewer height="20vh" src={locationData.images}/>
                <MainInfoContainer>
                    <PlaceName>{locationData.name}</PlaceName>
                    <Address>📍 {locationData.address}</Address>
                    <Description>
                        { locationData.description }
                    </Description>
                    <RatingArea>
                        <Rate>
                            { 
                            (locationData.reviewCounts=== 0)?
                                "리뷰"
                            :
                                <>⭐ {locationData.ratingAvg} ({locationData.reviewCounts >= 99?
                                    "99+" :locationData.reviewCounts })</>
                            }
                            
                        </Rate>
                        <SeeMoreText
                            onClick={(e) => {
                                e.stopPropagation()
                                navigate(`/place?reviewfor=${locationData!.locationId}`) 
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
                            (locationData.reviewCounts === 0)? 
                            <ReviewBox>
                                리뷰가 없습니다!
                            </ReviewBox>
                            :
                            locationData.recentReviewDtos.map((review, i) => 
                                <ReviewBox
                                    key={i}
                                    onClick={() => navigate(`/place?reviewfor=${locationData.locationId}`) }
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
                                navigate(`/place?spotfor=${locationData.locationId}`) 
                            }}
                            >
                                전체보기 &gt;
                            </SeeMoreText>
                        </RatingArea>
                        
                        <SpotCardContainer
                        style={(spotData?.length === 0)? {
                            height: '8.5em'
                        }:{}}
                        onTouchStart={(e) => e.stopPropagation()}
                        onTouchEnd={(e) => e.stopPropagation()}
                        >
                            {
                                (spotData?.length !== 0 && spotData)?
                                spotData.map((spot: spotMultiRead) =>
                                    <SmallSpotCard
                                    key={spot.spotId}
                                    data={spot}
                                    />
                                )
                                :
                                <ReviewBox>
                                    등록된 포토스팟이 없습니다!
                                </ReviewBox>
                            }
                        </SpotCardContainer>
                    </SpotContainer>
                </MainInfoContainer>
                </>
            }
        </BottomSheetContentContainer>
    )
    
}

export default LocationDetail;