import styled from "@emotion/styled";

import { BottomSheetContentContainer } from "./LocationDetail";
import { MultipleLocation } from "../types/Location";
import ReviewData from "../api/testdata/Review.json"
import { SingleReview } from "../types/Review";
import { useEffect, useState } from "react";

// 별점 평균, 갯수 등의 간략한 정보
const SimplifiedInfoContainer = styled.div`
`;

// 리뷰들을 보여주는 컨테이너
const ReviewContainer = styled.div`

`;

// 리뷰들의 내용이 담기는 공간
const Review = styled.div`

`;

const ReviewDetail = () => { // 상세 리뷰 조회 & 리뷰 업로드
    
    const reviews:SingleReview[] = ReviewData;
    const reviewCount = reviews.length;
    const [rateAverage, setRateAverage] = useState(0);
    
    useEffect(() => {
        let totalRate = 0;
        
        reviews.forEach((review) => {
            totalRate += review.rating;
        })

        setRateAverage(totalRate / reviewCount || 0);
    }, [])
    

    return (
        <BottomSheetContentContainer>
            <SimplifiedInfoContainer> 
                리뷰 평균(갯수): {rateAverage} ({reviewCount})
            </SimplifiedInfoContainer>
            <ReviewContainer>
                {
                    reviews.map((review) =>
                        <Review key={review.reviewId}>
                            {review.content}
                        </Review>
                    )
                }
                
            </ReviewContainer>
        </BottomSheetContentContainer>
    )
    
}

export default ReviewDetail;