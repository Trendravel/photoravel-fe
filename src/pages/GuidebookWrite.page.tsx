import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const locations = [
  '계룡시', '공주시', '금산시', '논산시', '당진시', '보령시', '부여군', '서산시', '서천군',
  '아산시', '예산군', '청양군', '천안시', '태안군', '홍성군'
];

const GuideBookWrite = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [imageTexts, setImageTexts] = useState<string[]>([]);
  const maxImageCount = 30;

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      if (newImages.length + images.length > maxImageCount) {
        alert(`최대 ${maxImageCount}장의 이미지만 첨부할 수 있습니다.`);
      } else {
        setImages([...images, ...newImages]);
        setImageTexts([...imageTexts, ...Array(newImages.length).fill('')]); // 각 이미지에 대한 텍스트 초기화
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('location', selectedLocation);
    images.forEach((image) => {
      formData.append('images', image);
    });
    formData.append('imageTexts', JSON.stringify(imageTexts)); // 텍스트 배열 추가
    try {
      await axios.post('/guidebooks/create', formData);
      alert('글 작성이 완료되었습니다!');
      navigate('/guidebooklist');
    } catch (error) {
      console.error('Error uploading guidebook:', error);
      alert('글 작성 중 오류가 발생하였습니다. 다시 시도해 주세요.');
    }
  };

  const handleCancel = () => {
    navigate(location.state?.from || '/guidebooklist');
  };

  return (
    <GuidebookCreateContainer>
      <GuidebookCreateForm onSubmit={handleSubmit}>
        <GuidebookCreateHeader>
          <GuidebookCreateCancelButton onClick={handleCancel}>✕</GuidebookCreateCancelButton>
          <GuidebookHeaderText>가이드북 작성</GuidebookHeaderText>
          <GuidebookCreateSubmitButton type="submit">등록</GuidebookCreateSubmitButton>
        </GuidebookCreateHeader>

        <GuidebookCreateTitle
          type="text"
          placeholder="제목"
          value={title}
          onChange={handleTitleChange}
        />
        
        <LocationContainer>
          {locations.map((location) => (
            <LocationButton
              key={location}
              onClick={() => handleLocationSelect(location)}
              selected={selectedLocation === location}
            >
              {location}
            </LocationButton>
          ))}
        </LocationContainer>

        <GuidebookCreateContent
          placeholder="내용을 입력하세요"
          value={content}
          onChange={handleContentChange}
        />
        
        <ImageUploadContainer>
          <ImageUploadButton>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              accept="image/*"
            />
            <CameraIcon>📷</CameraIcon>
          </ImageUploadButton>
          <ImageCount>{images.length}/{maxImageCount}</ImageCount>
        </ImageUploadContainer>

      </GuidebookCreateForm>
    </GuidebookCreateContainer>
  );
};

export default GuideBookWrite;

const GuidebookCreateContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: #f9f9f9;
`;

const GuidebookCreateForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  border-radius: 8px;
  padding: 1rem;
`;

const GuidebookCreateHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const GuidebookCreateCancelButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 1.4rem;
  color: #000;
  cursor: pointer;
`;

const GuidebookHeaderText = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

const GuidebookCreateSubmitButton = styled.button`
  padding: 0.4rem 0.8rem;
  font-size: 0.8rem;
  background-color: #ff6672;
  color: #fff;
  border: none;
  border-radius: 50px;
  cursor: pointer;
`;

const GuidebookCreateTitle = styled.input`
  padding: 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const LocationContainer = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 10px 0;
  gap: 0.2em;
  justify-items: center;
`;

const LocationButton = styled.button<{ selected: boolean }>`
  margin: 0.5em;
  padding: 0.8em 1em;
  border-radius: 2em;
  background-color: ${(props) => (props.selected ? '#FF6B6B' : '#F2F4F6')};
  color: ${(props) => (props.selected ? 'white' : '#565C64')};
  border: none;
  cursor: pointer;

  display: flex;
  align-items: center; 
  justify-content: center; 
  text-align: center;
  flex: 1; 
  white-space: nowrap; 
`;

const GuidebookCreateContent = styled.textarea`
  padding: 0.7rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  min-height: 250px;
`;

const ImageUploadContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;
`;

const ImageUploadButton = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem 1rem;
  background-color: #f2f4f6;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const CameraIcon = styled.span`
  font-size: 1.5rem;
  margin-right: 0.5rem;
`;

const ImageCount = styled.span`
  margin-left: 1rem;
  font-size: 1rem;
  color: #565c64;
`;