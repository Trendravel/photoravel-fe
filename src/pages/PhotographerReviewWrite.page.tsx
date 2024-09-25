import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-named-as-default
import styled from 'styled-components';

import album from '../assets/images/album.png';
import back from '../assets/images/back.png';

const PhotographerReviewWrite = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);
  const [photographerId, setPhotographerId] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>(''); 
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem('photographerId');
    if (id) {
      setPhotographerId(id);
    }

    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };

    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = weekdays[today.getDay()]; 

    setCurrentDate(`${today.toLocaleDateString('ko-KR', options)} (${dayOfWeek})`);
  }, []);

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

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append('content', comment);
    formData.append('rating', String(rating));
    formData.append('userId', 'user-id');
    formData.append('reviewType', 'PHOTOGRAPHER');

    photos.forEach(photo => {
      formData.append('images', photo);
    });

    try {
      const response = await axios.post("http:///private/review/create", formData, {
        headers: {
          Authorization: `Bearer `,
          Accept: '*/*, application/json',
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.success) {
        alert('리뷰가 성공적으로 작성되었습니다.');
        navigate('/photographerdetail');
      }
    } catch (error) {
      console.error('리뷰 작성 중 오류 발생:', error);
      alert('리뷰 작성에 실패했습니다.');
    }
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
        <Title>{photographerId}</Title>
        <DateText>{currentDate}</DateText>
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
        <PhotoSection>
          <PhotoButtonContainer onClick={handlePhotoClick}>
            <PhotoButtonIcon src={album} />
            <PhotoButtonText>{photos.length}/10</PhotoButtonText>
          </PhotoButtonContainer>
          <input
            type="file"
            id="photo-input"
            style={{ display: 'none' }}
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />

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
        </PhotoSection>

        <CommentInput
          placeholder="다른 고객들이 참고할 수 있도록 사진작가에 대한 경험을 적어주세요."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={500}
        />
        <CharacterCount>{comment.length} / 500</CharacterCount>
      </WriteContainer>

      <SubmitButton onClick={handleSubmit}>작성하기</SubmitButton>
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

const PhotoSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  
`;

const PhotoButtonContainer = styled.div`
  width: 60px;
  height: 60px; 
  padding: 5px; 
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-right: 10px;
  background: #fff;
  display: flex; 
  flex-direction: column;
  align-items: center; 
  justify-content: center; 
  cursor: pointer; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #f8f8f8;
  }
`;

const PhotoButtonIcon = styled.img`
  width: 24px; 
  margin-bottom: 5px;
`;

const PhotoButtonText = styled.span`
  font-weight: 700;
  font-size: 12px;
  color: #aaa; 
  text-align: center;
`;

const PhotoGallery = styled.div`
  display: flex;
  overflow-x: auto;
  flex-grow: 1;
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

const CommentInput = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 10px;
  resize: none;
  background: #fff;
  font-size: 15px;

  &::placeholder {
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