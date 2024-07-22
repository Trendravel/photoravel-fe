import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const GuideBookEdit = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState<File | null>(null);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (image) {
            formData.append('image', image);
        }
        try {
            await axios.post('/api/guidebook', formData);
            navigate('/guidebook');
        } catch (error) {
            console.error('Error uploading guidebook:', error);
        }
    };

    const handleCancel = () => {
        navigate(location.state?.from || '/guidebook');
    };

    return (
        <GuidebookCreateContainer>
            <GuidebookCreateForm onSubmit={handleSubmit}>
                <GuidebookCreateHeader>
                    <GuidebookCreateCancelButton onClick={handleCancel}>✕</GuidebookCreateCancelButton>
                    <GuidebookHeaderText>글쓰기</GuidebookHeaderText>
                    <GuidebookCreateSubmitButton type="submit">완료</GuidebookCreateSubmitButton>
                </GuidebookCreateHeader>
                <GuidebookCreateTitle
                    type="text"
                    placeholder="제목"
                    value={title}
                    onChange={handleTitleChange}
                />
                <GuidebookCreateContent
                    placeholder="내용을 입력하세요"
                    value={content}
                    onChange={handleContentChange}
                />
                <input type="file" onChange={handleImageChange} />
                {image && (
                    <GuidebookCreateImagePreview>
                        <img src={URL.createObjectURL(image)} alt="Preview" />
                    </GuidebookCreateImagePreview>
                )}
            </GuidebookCreateForm>
        </GuidebookCreateContainer>
    );
};

export default GuideBookEdit;

const GuidebookCreateContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GuidebookCreateForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 90%;
  height: 80%;
  max-width: 600px;
  background-color: #fff;
  border-radius: 8px;
`;

const GuidebookCreateHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const GuidebookCreateCancelButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 2.3rem;
  color: #000;
  font-weight:
  cursor: pointer;
`;

const GuidebookHeaderText = styled.p`
  align-items: center;
  font-size: 18px;
  font-weight: bold;
`

const GuidebookCreateSubmitButton = styled.button`
  padding: 0.5rem 1rem;
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
  border: none;
  border-bottom: 1px solid #ccc;
  border-radius: 0px;
`;

const GuidebookCreateContent = styled.textarea`
  padding: 0.7rem;
  font-size: 1rem;
  border: none;
  resize: vertical;
  min-height: 250px;
`;

const GuidebookCreateImagePreview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 300px;
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  overflow: hidden;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  p {
    margin-top: 16px;
    font-size: 14px;
    color: #757575;
  }
`;