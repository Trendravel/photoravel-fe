import styled from '@emotion/styled';
import { useState } from 'react';

const AddSpot = () => {
  const [selectedPhotos, setSelectedPhotos] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

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

  return (
    <Container>
      <Header>📍 장소 등록하기</Header>
      <MapContainer>{/* 지도 컴포넌트가 들어갈 자리 */}</MapContainer>
      <ImageUploadSection>
        <Label>이미지 등록하기</Label>
        <ReviewImageContainer>
          <PhotosLayout>
            {previews.length > 0 && (
              <PreviewImageLayout>
                {previews.map((preview, index) => (
                  <PreviewImageContainer key={index}>
                    <PreviewImageWrapper>
                      <PreviewImage src={preview} />
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
      <Label>장소 이름</Label>
      <Input type="text" placeholder="장소 이름을 입력하세요" />
      <Label>장소 설명</Label>
      <Description rows={4} placeholder="장소에 대한 설명을 입력하세요" />
      <RegisterButton>장소 등록</RegisterButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Arial', sans-serif;
`;

const Header = styled.h1`
  font-size: 24px;
  margin: 20px 0;
`;

const MapContainer = styled.div`
  width: 25rem;
  height: 300px; /* 원하는 높이 설정 */
  background-color: #eaeaea; /* 맵의 배경색 */
  border-radius: 10px;
  margin-bottom: 20px;
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

const PreviewImage = styled.img`
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

const UploadImageLabel = styled.label``;

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

const Input = styled.input`
  width: 23.75rem;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Description = styled.textarea`
  width: 23.75rem;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
`;

const RegisterButton = styled.button`
  width: 25rem;
  padding: 10px 20px;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #45a049;
  }
`;

export default AddSpot;
