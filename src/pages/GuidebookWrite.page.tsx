import { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// eslint-disable-next-line import/no-named-as-default
import styled from 'styled-components';

import { formDataConnection } from '../api/connectBackend';
import { getCookie } from '../api/useCookie';
import { Guidebook, Region } from '../types/Guidebook';

const GuidebookWrite = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [guidebook, setGuidebook] = useState<Guidebook | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const maxImageCount = 30;
  const contentRef = useRef<HTMLDivElement>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (guidebook) {
      setGuidebook({ ...guidebook, title: e.target.value });
    }
  };

  const handleRegionSelect = (region: Region) => {
    setSelectedRegion(region);
    if (guidebook) {
      setGuidebook({ ...guidebook, region });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      const totalImages = newImages.length + images.length;

      if (totalImages > maxImageCount) {
        alert(`최대 ${maxImageCount}장의 이미지만 첨부할 수 있습니다.`);
        return;
      }

      setImages((prevImages) => [...prevImages, ...newImages]);
      newImages.forEach((image) => insertImage(image));
    }
  };

  const insertImage = (image: File) => {
    const img = document.createElement('img');
    img.src = URL.createObjectURL(image);
    img.style.maxWidth = '100%';
    img.style.margin = '10px 0';
    img.style.cursor = 'pointer';
    img.style.border = selectedImageIndex === images.length ? '3px solid #ff6b6b' : 'none';

    img.onclick = () => {
      setSelectedImageIndex(images.length);
      contentRef.current?.scrollTo({
        top: img.offsetTop,
        behavior: 'smooth'
      });
    };

    if (contentRef.current) {
      contentRef.current.appendChild(img);
      setContent(contentRef.current.innerHTML);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedRegion) {
      alert('지역을 선택해주세요.');
      return;
    }

    const userId = getCookie('userId');

    const formData = new FormData();

    const guidebookData: Guidebook = {
      userId: userId || '',
      title: title,
      content: content,
      region: selectedRegion,
      views: 0,
      images: JSON.stringify(images),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    formData.append('data', new Blob([JSON.stringify(guidebookData)], { type: 'application/json' }));

    images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      const response = await formDataConnection.post("/private/guidebooks/create", formData);

      if (response.status === 200) {
        alert('글 작성이 완료되었습니다!');
        navigate('/guidebooklist');
      }
    } catch (error) {
      console.error('Error uploading guidebook:', error);
    }
  };

  const handleCancel = () => {
    if (confirm('정말 취소하시겠습니까?')) {
      navigate(location.state?.from || '/guidebooklist');
    }
  };

  const isSubmitDisabled = title.trim() === '' || content.trim() === '';

  return (
    <GuidebookCreateContainer>
      <GuidebookCreateForm onSubmit={handleSubmit}>
        <GuidebookCreateHeader>
          <GuidebookCreateCancelButton onClick={handleCancel}>취소</GuidebookCreateCancelButton>
          <GuidebookHeaderText>가이드북 작성</GuidebookHeaderText>
          <GuidebookCreateSubmitButton type="submit" disabled={isSubmitDisabled} isDisabled={isSubmitDisabled}>등록</GuidebookCreateSubmitButton>
        </GuidebookCreateHeader>

        <GuidebookCreateTitle
          type="text"
          placeholder="제목"
          value={title}
          onChange={handleTitleChange}
        />

        <RegionContainer>
          {Object.values(Region).map((region) => ( 
            <RegionButton
              key={region}
              onClick={() => handleRegionSelect(region)}
              selected={selectedRegion === region}
            >
              {region}
            </RegionButton>
          ))}
        </RegionContainer>

        <ImageUploadContainer>
          <ImageUploadButton>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              accept="image/*"
              style={{ display: 'none' }}
              onClick={(e) => { e.currentTarget.value = ''; }}
            />
            <CameraIcon>+<ImageCount>{images.length}/{maxImageCount}</ImageCount></CameraIcon>
          </ImageUploadButton>
        </ImageUploadContainer>

        <GuidebookCreateContent>
          <ContentEditable
            ref={contentRef}
            contentEditable
            suppressContentEditableWarning={true}
            onInput={() => setContent(contentRef.current?.innerHTML || '')}
            style={{ minHeight: 'auto', border: 'none', padding: '0', outline: 'none' }}
          />
          {content === '' && <Placeholder>내용을 입력하세요</Placeholder>}
        </GuidebookCreateContent>
      </GuidebookCreateForm>
    </GuidebookCreateContainer>
  );
};

export default GuidebookWrite;

const Placeholder = styled.div`
  position: absolute;
  left: 10px;
  top: 10px;
  color: #c1c1c1;
  pointer-events: none;
`;

const GuidebookCreateContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 1rem;
  background-color: #fff;
  height: 100vh;
`;

const GuidebookCreateForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  border-radius: 8px;
`;

const GuidebookCreateHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #d3d3d3;
  padding: 0 0 0.6rem 0;
  margin: 0 -1rem;
`;

const GuidebookCreateCancelButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 16px;
  color: #212121;
  cursor: pointer;
`;

const GuidebookHeaderText = styled.p`
  font-size: 19px;
  font-weight: bold;
`;

const GuidebookCreateSubmitButton = styled.button<{ isDisabled: boolean }>`
  background-color: transparent;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 16px;
  color: ${(props) => (props.isDisabled ? '#bdbdbd' : '#ff6b6b')};
  cursor: ${(props) => (props.isDisabled ? 'not-allowed' : 'pointer')}; 
`;

const GuidebookCreateTitle = styled.input`
  padding: 1rem;
  font-size: 20px;
  border-bottom: 1px solid #eee;

  &::placeholder {
    color: #c1c1c1;
  }
`;

const RegionContainer = styled.div`
  display: flex;
  overflow-x: auto;
`;

const RegionButton = styled.button<{ selected: boolean }>`
  margin: 0.5em;
  padding: 0.8em 1em;
  border-radius: 2em;
  background-color: ${(props) => (props.selected ? '#FF6B6B' : '#F2F4F6')};
  color: ${(props) => (props.selected ? 'white' : '#565C64')};
  border: none;
  cursor: pointer;
  flex: 1;
  white-space: nowrap; 
`;

const GuidebookCreateContent = styled.div`
  position: relative; 
  padding: 0.7rem;
  font-size: 1rem;
  border: none; 
  min-height: auto; 
  outline: none;
`;

const ContentEditable = styled.div`
  padding: 0.7rem;
  font-size: 1rem;
  min-height: 100px; 
`;

const ImageUploadContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0.4rem 0.6rem;
`;

const ImageUploadButton = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.7rem 0.5rem;
  background-color: #f0f0f0;
  border-radius: 4px;
  border: 1px solid #ccc;
  transition: background-color 0.3s, transform 0.2s;
  
  &:hover {
    background-color: #e0e0e0;
    transform: scale(1.05);
  }
`;

const CameraIcon = styled.span`
  font-size: 1rem;
  margin-right: 0.5rem;
`;

const ImageCount = styled.span`
  margin-left: 0.5rem;
  font-size: 1rem;
  color: #565c64;
`;