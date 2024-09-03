import styled from "@emotion/styled";

import { BottomSheetContentContainer } from "./LocationDetail";
import { MultipleLocation } from "../types/Location";

const SimplifiedInfoContainer = styled.div`
`;

const ReviewContainer = styled.div`

`;

const Review = styled.div`

`;

const ReviewDetail = () => { // 상세 리뷰 조회 & 리뷰 업로드
    

    return (
        <BottomSheetContentContainer>
            <SimplifiedInfoContainer>
                별점 정보 간략화
            </SimplifiedInfoContainer>
            <ReviewContainer>
                <Review>
                    리뷰1
                </Review>
                <Review>
                    리뷰2
                </Review>
            </ReviewContainer>
        </BottomSheetContentContainer>
    )
    
}

export default ReviewDetail;