/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';

import { BottomSheetContentContainer } from './LocationDetail';
import { FormContainer, SubmitButton } from '../pages/AddInfo.page';
import { FileLabel, ImageInput, PreviewImage } from '../pages/AddPlace.page';
import { getCookie } from '../api/useCookie';
import { formDataConnection } from '../api/connectBackend';

const AddReview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search);
  const spotId = queryParam.get('spotfor');
  const locationId = queryParam.get('addreviewto');

  const reviewType = spotId ? 'SPOT' : 'LOCATION';

  const [selectedPhotos, setSelectedPhotos] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [description, setDescriptiopn] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      const newFiles = Array.from(files);
      setSelectedPhotos((prev) => [...prev, ...newFiles]);

      const newPreviews = newFiles.map((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setPreviews((prev) => [...prev, reader.result as string]);
        };
        return null;
      });
    }
  };

  const handleRemove = (index: number) => {
    setSelectedPhotos((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUploadClick = () => {
    document.getElementById('file-upload')!.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
        reviewId: 0,
        reviewType: reviewType,
        content: description,
        rating: rating,
        userId: getCookie('memberId'),
        typeId: (reviewType === "LOCATION")? Number(locationId) : Number(spotId)
    };

    if (selectedPhotos.length !== 0) { // 사진이 있는 경우 form-data
        const formData = new FormData();
        formData.append('data', JSON.stringify(data));
        selectedPhotos.forEach((file, i) => {
            console.log(`images[${i}]: `, file)
            formData.append(`images[${i}]`, file);
        })
        
        console.log(formData.get('data'));
        console.log(formData.getAll('images[0]'));
    } else {
        console.log(data)
    }

  }

  useEffect(() => {
    console.log(reviewType);
  }, []);

  return (
    <BottomSheetContentContainer>
      <Title style={{ marginTop: '0.25em' }}>리뷰 작성하기</Title>
      <FormContainer 
        margin="auto auto 1em"
        onSubmit={handleSubmit}
      >
        <ImageUploadSection>
          <Label>이미지 등록하기</Label>
          <ReviewImageContainer>
            <PhotosLayout>
              {previews.length > 0 && (
                <PreviewImageLayout>
                  {previews.map((preview, index) => (
                    <PreviewImageContainer key={index}>
                      <PreviewImageWrapper>
                        <PreviewImages src={preview} />
                      </PreviewImageWrapper>
                      <RemoveButton
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => handleRemove(index)}
                      >
                        <FillBlack
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2Z"
                          vectorEffect="non-scaling-stroke"
                        />
                        <StrokeWhite
                          d="M7 7L13 13M13 7L7 13"
                          vectorEffect="non-scaling-stroke"
                        />
                      </RemoveButton>
                    </PreviewImageContainer>
                  ))}
                </PreviewImageLayout>
              )}
              <UploadImageBoxInput
                id="file-upload"
                type="file"
                accept="image/jpg, image/gif, image/png, image/jpeg, image/heic, image/webp"
                multiple
                onChange={handleFileChange}
              />
              <UploadImageBoxContainer onClick={handleUploadClick}>
                <UploadImageBoxHiddenInput />
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  color="black"
                >
                  <StrokeBlack
                    d="M10 4V10M10 10V16M10 10H4M10 10H16"
                    strokeMiterlimit="10"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
                <UploadImageCount>
                  {selectedPhotos ? `${selectedPhotos.length} / 10` : '+'}
                </UploadImageCount>
              </UploadImageBoxContainer>
            </PhotosLayout>
          </ReviewImageContainer>
        </ImageUploadSection>
        <Rating
        iconsCount={5}
        allowFraction
        onClick={(e) => setRating((e <= 1)? 1: e)}
        />
        <DescriptionArea
          onTouchStart={(e) => e.stopPropagation()}
          onChange={(e) => setDescriptiopn(e.target.value)}
          placeholder="여기에 설명을 추가하세요"
        />
        <SubmitButton
        type="submit"
        style={{width: 'fit-content', margin: 'auto'}}
        >
            리뷰 작성하기
        </SubmitButton>
      </FormContainer>
    </BottomSheetContentContainer>
  );
};

const Title = styled.p`
  text-align: left;
  font-size: 14pt;
  font-weight: 500;
  margin-bottom: 1em;
`;

const ImageUploadSection = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const ReviewImageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PhotosLayout = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  overflow-x: auto;
`;

const PreviewImageLayout = styled.div`
  display: flex;
  align-items: center;
`;

const PreviewImageContainer = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;
`;

const PreviewImageWrapper = styled.div`
  display: inline-flex;
  position: relative;
  align-items: center;
  justify-content: center;
  max-width: 109px;
  width: 109px;
  height: 131px;
  border-radius: 4px;
  z-index: 0;
`;

const PreviewImages = styled.img`
  object-fit: cover;
  max-width: 100%;
  width: 100%;
  height: 100%;
`;

const RemoveButton = styled.svg`
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
`;

const FillBlack = styled.path`
  fill: #000;
`;

const StrokeWhite = styled.path`
  stroke: #fff;
`;

const UploadImageBoxInput = styled.input`
  display: none;
`;

const UploadImageBoxContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  max-width: 109px;
  min-width: 109px;
  width: 100%;
  height: 131px;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid rgb(224, 224, 224);
  bacrground-color: rgb(255, 255, 255);
`;

const UploadImageBoxHiddenInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  margin: 0;
  padding: 0;
`;

const StrokeBlack = styled.path`
  stroke: #000;
`;

const UploadImageCount = styled.span`
  margin: 0;
  padding: 0;
  font-family: Pretendard;
  font-weight: 400;
  font-size: 11px;
  letter-spacing: 0;
  color: rgb(138, 138, 138, 1);
  line-height: 14px;
`;

const Label = styled.label`
  padding-bottom: 4px;
  font-size: 18px;
  display: block;
`;

export const DescriptionArea = styled.textarea`
  font-family: 'Noto Sans KR';
  width: 100%;
  height: 5em;
  border-bottom: 1px solid #cccccc;
  font-size: 14pt;
`;

export default AddReview;
