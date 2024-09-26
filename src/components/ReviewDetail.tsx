import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { CategoryButton } from "./BottomSheet";
import FullMultipleImageViewer from "./FullMultipleImageViewer";
import { BottomSheetContentContainer } from "./LocationDetail";
import ReviewData from "../api/testdata/readLocationReviews.json"
import MultipleImageIconFile from "../assets/images/gallery.png";
import { SingleReview } from "../types/Review";

// 별점 평균, 갯수 등의 간략한 정보
export const SimplifiedInfoContainer = styled.div`
    display: flex;
    justify-content: space-between;
    text-align: left;
    margin: 1em 0.5em 1em 0.5em;
`;

export const InfoText = styled.p<{color: string}>`
    color: ${(props) => props.color};
    font-weight: 500;
    font-size: 14pt;
`;

// 리뷰들을 보여주는 컨테이너
const ReviewContainer = styled.div`
    display: block;
    overflow-y: scroll;
`;

// 리뷰들의 내용 전체를 담는 공간
const Review = styled.div`
    text-align: left;
    border-top: 1px solid #cccccc;
    padding: 1em;
    margin-top: 0.5em;
`;

const DetailInfo = styled.p`
    margin-top: 0.5em;
    font-size: 10pt;
    text-align: right;
    color: #cccccc;
`;

const ReviewImageContainer = styled.div`
    position: relative;
    display: inline-block;
    margin: 0.5em auto auto auto;
`;

const ReviewImage = styled.img`
    border-radius: 0.5em;
    width: 8em;
    height: 8em;
`;

const MultipleImageIcon = styled.img`
    position: absolute;
    width: 1.5em;
    height: 1.5em;
    top: 0.5em;
    right: 0.5em;
    z-index: 1;
`;

const ReviewDetail = () => { // 상세 리뷰 조회 & 리뷰 업로드
    
    const navigate = useNavigate();
    const location = useLocation();
    const queryParam = new URLSearchParams(location.search);
    const reviewId = queryParam.get("reviewfor");
    const spotId = queryParam.get("spotfor");

    const reviewType = spotId && reviewId? "SpotReview":"LocationReview";

    const reviews:SingleReview[] = ReviewData; // TODO: 장소/스팟 리뷰 데이터 선택적 핸들링
    const reviewCount = reviews.length;
    const [rateAverage, setRateAverage] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [images, setImages] = useState([""]);
    
    useEffect(() => {
        let totalRate = 0;
        
        reviews.forEach((review) => {
            totalRate += review.rating;
        })

        setRateAverage(totalRate / reviewCount || 0);

        console.log(reviewType);
    }, [])

    const changeIsOpen = () => {
        if (isOpen)
            setIsOpen(false);
        else 
            setIsOpen(true)
    }

    return (
        <BottomSheetContentContainer>
            
            <SimplifiedInfoContainer>
                <div>
                <InfoText color="">
                    리뷰
                </InfoText>
                <InfoText color="#FF808A">
                    ⭐️ {rateAverage} ({reviewCount})
                </InfoText>
                </div>
                <CategoryButton
                color="#FF808A"
                onClick={() => {
                    if (reviewType === "LocationReview") {
                        navigate(`/place?addreviewto=${reviewId}`)
                    } else if (reviewType === "SpotReview") {
                        navigate(`/place?spotfor=${spotId}&addreviewto=${spotId}`)
                    }
                }}
                >
                    + 리뷰 작성하기
                </CategoryButton>
            </SimplifiedInfoContainer>
            <ReviewContainer>
                {
                    reviews.map((review) =>
                        <Review key={review.reviewId}>
                            <p style={{
                                fontWeight: "500",
                                marginBottom: "0.75em"
                            }}>
                                ⭐️ {review.rating}
                            </p>
                            <p>{review.content}</p>
                            <div
                                style={{textAlign: "center"}}
                            >
                            {
                                review.images[0]?
                                <ReviewImageContainer
                                    onTouchStart={(e) => e.preventDefault()}
                                    onTouchEnd={(e) => {
                                        e.preventDefault();
                                        setImages(review.images);
                                        changeIsOpen();
                                    }}
                                >
                                    {
                                        review.images[1]?
                                        <MultipleImageIcon
                                        src={MultipleImageIconFile}
                                        />
                                        :
                                        <></>
                                    }
                                    <ReviewImage
                                    src={review.images[0]}
                                    />
                                </ReviewImageContainer>
                                :
                                <></>
                            }
                            </div>
                            <DetailInfo>
                                {review.createdAt}
                            </DetailInfo>
                        </Review>
                    )
                }
            </ReviewContainer>
            <FullMultipleImageViewer
                images={images}
                changeIsOpen={changeIsOpen}
                isOpen={isOpen}
            />
        </BottomSheetContentContainer>
    )
    
}

export default ReviewDetail;