import styled from '@emotion/styled';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { formDataConnection, jsonConnection } from '../api/connectBackend';
import { getCookie } from '../api/useCookie';
import SubMap from '../components/SubMap';
import UpperMenu from '../components/UpperMenu';
import { Position } from '../types/Position';

const AddSpot = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const locationId = queryParams.get('spotfor');
  const navigate = useNavigate();

  const [selectedPhotos, setSelectedPhotos] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [selectedPos, setSelectedPos] = useState<Position>({
    latitude: 0,
    longitude: 0
  });
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");


  const validateForm = () => { // 폼 무결성 검사

    if (selectedPos.latitude === 0) {
      alert("지도를 클릭하여 위치를 선택하세요!")
      return false;
    }
        
    if (title === "") {
      alert("장소 이름을 입력하세요!");
      return false;
    }

    if (description.length < 10) {
      alert("설명은 최소 10자 이상 입력하세요!")
      return false;
    }

    return true;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const formData = new FormData();
      
      const data = {
        "spotId": 0,
        "locationId": locationId,
        "latitude": selectedPos.latitude,
        "longitude": selectedPos.longitude,
        "description": description,
        "title": title,
        "userId": getCookie("memberId")
      }

      formData.append("data", JSON.stringify(data));
      
      if (selectedPhotos) {
        selectedPhotos.forEach((file) =>
          formData.append('images', file)
        )
          
        formDataConnection.post('/private/spot/create', formData)
        .then((res) => {
          console.log(res);
          navigate(`/`); 
        })
        .catch((e) => console.log(e) )
      } else {
        jsonConnection.post('/private/spot/create', JSON.stringify(data))
        .then((res) => { 
          console.log(res)
          navigate(`/`); 
        })
        .catch((e) => console.log(e) )
      }    
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      const newFiles = Array.from(files);
      setSelectedPhotos((prev) => [...prev, ...newFiles]);

      newFiles.map((file) => {
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
      <UpperMenu/>
      <Header>📍 장소 등록하기</Header>
      <SubMap
      pos={selectedPos}
      setPos={setSelectedPos}
      height="25vh"
      />
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
      <Input
      type="text"
      placeholder="장소 이름을 입력하세요"
      onChange={(e) => setTitle(e.target.value)}
      />
      <Label>장소 설명</Label>
      <Description
      rows={4}
      placeholder="장소에 대한 설명을 입력하세요"
      onChange={(e) => setDescription(e.target.value)}
      />
      <RegisterButton onClick={handleSubmit}>
        장소 등록
      </RegisterButton>
    </Container>
  );
};


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 6em;
`;

const Header = styled.h1`
  font-size: 24px;
  margin: 0 0 10px;
`;

const ImageUploadSection = styled.div`
  text-align: center;
  margin: 20px;
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
  width: 85%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Description = styled.textarea`
  width: 85%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
`;

const RegisterButton = styled.button`
  width: 85%;
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
