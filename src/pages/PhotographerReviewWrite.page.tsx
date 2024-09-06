import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import album from '../assets/images/album.png';
import back from '../assets/images/back.png';

const PhotographerReviewWrite = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);
  const navigate = useNavigate();

  const handleStarClick = (index: number) => {
    setRating(index + 1);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const filesArray = Array.from(files);
      if (photos.length + filesArray.length <= 10) {
        setPhotos(prev => [...prev, ...filesArray]);
      } else {
        alert('최대 10장까지 사진을 첨부할 수 있습니다.');
      }
    }
  };

  const handlePhotoClick = () => {
    document.getElementById('photo-input')?.click();
  };

  return (
    <Container>
      <HeaderContainer>
        <BackButton onClick={() => navigate(-1)}>
          <BackIcon src={back} />
        </BackButton>
        <HeaderText>리뷰 작성</HeaderText>
      </HeaderContainer>

      <TitleContainer>
        <Title>현담</Title>
        <DateText>2024.07.20 (토)</DateText>
        <RatingContainer>
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              selected={rating !== null && rating > index}
              onClick={() => handleStarClick(index)}
            >
              ★
            </Star>
          ))}
        </RatingContainer>
      </TitleContainer>

      <WriteContainer>
        <PhotoButtonContainer onClick={handlePhotoClick}>
          {photos.length > 0 ? (
            <>
              <PhotoCountText>사진 {photos.length}/10</PhotoCountText>
              <PhotoGallery>
                {photos.map((photo, index) => (
                  <PhotoPreview key={index}>
                    <img src={URL.createObjectURL(photo)} alt={`photo-${index}`} />
                    <RemovePhotoButton onClick={() => setPhotos(prev => prev.filter((_, i) => i !== index))}>
                      &times;
                    </RemovePhotoButton>
                  </PhotoPreview>
                ))}
              </PhotoGallery>
            </>
          ) : (
            <>
              <PhotoButtonIcon src={album} />
              <PhotoCountText>사진 0/10</PhotoCountText>
            </>
          )}
        </PhotoButtonContainer>
        <input
          type="file"
          id="photo-input"
          style={{ display: 'none' }}
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />
        <CommentInput
          placeholder="리뷰를 작성해주세요"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={500}
        />
        <CharacterCount>{comment.length} / 500</CharacterCount>
      </WriteContainer>

      <SubmitButton>작성하기</SubmitButton>
    </Container>
  );
};

export default PhotographerReviewWrite;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #F9FAFB;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const BackButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 0.5rem 0rem;
  font-size: 1.3rem;
  color: #000;
  cursor: pointer;
`;

const BackIcon = styled.img`
  width: 25px;
`;

const HeaderText = styled.p`
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  flex: 1;
`;

const TitleContainer = styled.div`
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  justify-content: center; 
  padding: 12px;
  border-radius: 20px;
  background-color: #fff;
  margin: 5px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 23px;
  margin: 10px;
`;

const DateText = styled.p`
  font-weight: 700;
  font-size: 15px;
  color: #999;
  margin-bottom: 15px; 
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`;

const Star = styled.span<{ selected: boolean }>`
  cursor: pointer;
  color: ${props => (props.selected ? '#ff6b6b' : '#cbd0d5')};
  font-size: 35px;
`;

const WriteContainer = styled.div`
  padding: 12px;
  border-radius: 20px;
  background-color: #fff;
  margin: 10px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column; 
`;

const PhotoButtonContainer = styled.div`
  width: 93%;
  height: auto; 
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-top: 10px;
  margin-bottom: 10px;
  background: #fff;
  display: flex; 
  align-items: center; 
  justify-content: space-between; 
  cursor: pointer; 
`;

const PhotoGallery = styled.div`
  display: flex;
  overflow-x: auto;
  margin-left: 10px;
`;

const PhotoPreview = styled.div`
  position: relative;
  margin-right: 10px;

  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 5px;
  }
`;

const RemovePhotoButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 18px;
  height: 18px; 
  background: #aaa;
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  font-size: 15px;
  font-weight: 300;
  display: flex;
  align-items: center; 
  justify-content: center; 
  padding: 0; 
`;

const PhotoCountText = styled.p`
  font-weight: 700;
  font-size: 15px;
  color: #000; 
`;

const PhotoButtonIcon = styled.img`
  margin-right: 10px;
  width: 25px;
`;

const CommentInput = styled.textarea`
  width: 100%;
  height: 180px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 10px;
  resize: none;
  background: #fff;

  &::placeholder {
    padding: 3px 6px;
    font-size: 15px;
    color: #CBD0D5;
  }
`;

const CharacterCount = styled.div`
  margin-right: 10px;
  text-align: right;
  color: #999;
`;

const SubmitButton = styled.button`
  margin-top: 8px;
  background: #ff6b6b; 
  color: #fff;
  border: none;
  padding: 18px 100px; 
  border-radius: 8px; 
  cursor: pointer;
  font-size: 20px;
`;