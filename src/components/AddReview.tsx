/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

import { BottomSheetContentContainer } from "./LocationDetail";
import { FormContainer, SubmitButton } from "../pages/AddInfo.page";
import { FileLabel, ImageInput, PreviewImage } from "../pages/AddPlace.page";


const Title = styled.p`
    text-align: left;
    font-size: 14pt;
    font-weight: 500;
    margin-bottom: 1em;
`;

export const DescriptionArea = styled.textarea`
    font-family: "Noto Sans KR";
    width: 100%;
    height: 5em;
    border-bottom: 1px solid #cccccc;
    font-size: 14pt;
`;

const AddReview = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParam = new URLSearchParams(location.search);
    const spotId = queryParam.get("spotfor");

    const reviewType = spotId? "SpotReview":"LocationReview";

    useEffect(() => {
        console.log(reviewType)
    }, [])

    const [imageSrc, setImageSrc] = useState<string | null>(null);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLLabelElement>) => {
        const files = event.type === 'change' ? event.target.files : event.dataTransfer.files;
        if (files && files.length > 0) {
            const file = files[0];
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setImageSrc(e.target?.result as string);
                };
                reader.readAsDataURL(file);
            } else {
                alert('이미지 파일만 선택할 수 있습니다.');
            }
        }
    };

    return (
        <BottomSheetContentContainer>
            <Title style={{marginTop: "0.25em"}}>
            리뷰 작성하기
            </Title>
            <FormContainer margin="auto auto 1em">
                <FileLabel
                width="50%"
                height="6em"
                htmlFor="imageUpload"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleFileSelect}
                >
                    {imageSrc ?
                        (
                        <PreviewImage src={imageSrc} alt="미리보기" />
                        ):
                        (
                        "이미지 등록하기"
                        )
                    }
                </FileLabel>
                <ImageInput
                type="file"
                accept="image/*"
                id="imageUpload"
                onChange={handleFileSelect}
                />
                <Rating iconsCount={5} allowFraction/>
                <DescriptionArea
                onTouchStart={(e) => e.stopPropagation()}
                placeholder="여기에 설명을 추가하세요"
                />
            </FormContainer>
            <SubmitButton type="submit">리뷰 작성하기</SubmitButton>
        </BottomSheetContentContainer>
    )
}

export default AddReview;