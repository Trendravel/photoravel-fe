import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { CategoryButton } from "./BottomSheet";
import FullMultipleImageViewer from "./FullMultipleImageViewer";
import { BottomSheetContentContainer, ControlContainer } from "./LocationDetail";
import NotFound from "./NotFound";
import { jsonConnection } from "../api/connectBackend";
import MultipleImageIconFile from "../assets/images/gallery.png";
import { ApiResponse } from "../types/Common";
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

const SpaceBetweenContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const DeleteText = styled.p`
    text-align: right;
    color: #aaaaaa;
`;

const ReviewDetail = () => { // 상세 리뷰 조회 & 리뷰 업로드
    
    const navigate = useNavigate();
    const location = useLocation();
    const queryParam = new URLSearchParams(location.search);
    const locationId = queryParam.get("reviewfor");
    const spotId = queryParam.get("spotfor");

    const reviewType = spotId && locationId? "SPOT":"LOCATION";

    const [reviews, setReviews] = useState<SingleReview[] | null> (null); // TODO: 장소/스팟 리뷰 데이터 선택적 핸들링
    const [reviewCount, setReviewCount] = useState<number | null>(null);
    const [rateAverage, setRateAverage] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [images, setImages] = useState([""]);
    const [totalRate, setTotalRate] = useState(0);

    const calculateAverageRate = (reviews: SingleReview[]) => {
        if (reviews.length === 0) return 0;
        const total = reviews.reduce((sum, review) => sum + review.rating, 0);
        return total / reviews.length;
    };


    useEffect(() => {
        if (reviewType === "LOCATION") {
            jsonConnection.get<ApiResponse<SingleReview[]>>(`/public/location/${locationId}/detail/reviews`)
            .then((res) => {
                const data = res.data.data;
                if (data) {
                    setReviews(data);
                    setReviewCount(data.length);

                    const average = calculateAverageRate(data);
                    setRateAverage(average);
                    
                }
            })
            .catch((e) => {
                alert("장소 리뷰를 불러오는데 실패했습니다!")
                console.error(e);
            })
        }        

        console.log(reviewType);
    }, [])

    const handleDelete = (reviewId: number) => {
        jsonConnection.delete(`/private/review/${reviewId}/delete`)
        .then((res) => {
            console.log(res);
            alert("리뷰가 삭제되었습니다.");
        })
        .catch((e) => {
            console.error(e);
            alert("리뷰 삭제 중 문제가 발생했습니다.")
        })
    }

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
                    if (reviewType === "LOCATION") {
                        navigate(`/place?addreviewto=${locationId}`)
                    } else if (reviewType === "SPOT") {
                        navigate(`/place?spotfor=${spotId}&addreviewto=${spotId}`)
                    }
                }}
                >
                    + 리뷰 작성하기
                </CategoryButton>
            </SimplifiedInfoContainer>
            <ReviewContainer>
                {
                    reviews?
                    reviews.map((review) =>
                        <Review key={review.reviewId}>
                            <SpaceBetweenContainer>
                                <p style={{
                                    fontWeight: "500",
                                    marginBottom: "0.75em"
                                }}>
                                    ⭐️ {review.rating}
                                </p>
                                <DeleteText
                                    onClick={() => handleDelete(review.reviewId)}
                                >
                                    삭제하기
                                </DeleteText>
                            </SpaceBetweenContainer>
                            
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
                    ):
                    <NotFound/>
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