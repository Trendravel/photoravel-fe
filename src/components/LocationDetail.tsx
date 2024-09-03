import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

import { Rate } from "./LocationInfo";
import MultipleImageViewer from "./MultipleImageViewer";
import { SingleLocation } from "../types/Location";


export const BottomSheetContentContainer = styled.div`
    display: block;
    margin-top: 0.5em;
    padding: 0.25em 1.5em 0.5em 1.5em;
`;

const MainInfoContainer = styled.div`
    margin: 1em 0em 1em 0em;
`;

const PlaceName = styled.p`
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

const RatingArea = styled.div`
    text-align: left;
    margin: 1.5em 0.25em 1em 0.25em;
    font-size: 10pt;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
`
const SingleRate = styled.p`
    text-align: left;
    font-weight: 500;
    font-size: 10pt;
    margin-left: 0.5em;
`;

const ReviewContent = styled.div`
    display: flex;
    padding: 0.5em 0 0.5em 0;
    font-size: 11pt
`;

const ReviewBox = styled.div`
    width: 70vw;
    height: 6em;
    padding: 0.5em;
    border-radius: 0.25em;
    border: 1px solid #d0d0d0;
`;

const ReviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 1em;
    width: 100%;
    height: 6.5em;
    padding: 0.25em;
    overflow-x: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
`

const ReviewImage = styled.img`
    width: 4em;
    height: 4em;
    padding: 0.1em;
`;

const Description = styled.div`
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

const LocationDetail = (props: {data: SingleLocation}) => {
    const navigate = useNavigate();

    return (
        <BottomSheetContentContainer
            onTouchStart={(e) => { e.stopPropagation(); }}
        >
            <MultipleImageViewer height="20vh" src={props.data.images}/>
            <MainInfoContainer
                onTouchStart={(e) => { e.stopPropagation(); }}
            >
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
                    <p style={{fontWeight: "400", fontSize: "9pt"}}
                        onClick={() => {
                            navigate(`/place?reviewfor=${props.data.locationId}`) 
                        }}
                    >
                        전체보기 &gt;
                    </p>
                </RatingArea>
                <ReviewContainer>
                    {
                        props.data.recentReviewDtos.map((review) => 
                            <ReviewBox>
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

export default LocationDetail;