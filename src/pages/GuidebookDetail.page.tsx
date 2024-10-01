import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-named-as-default
import styled from 'styled-components';

import { jsonConnection } from '../api/connectBackend';
import { getCookie } from '../api/useCookie'; 
import back from '../assets/images/back.png';
import kebab from '../assets/images/kebab.png';
import { Guidebook } from '../types/Guidebook';

const GuidebookDetail = () => {
  const navigate = useNavigate();
  const [guidebook, setGuidebook] = useState<Guidebook | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedContent, setUpdatedContent] = useState('');

  const guidebookId = getCookie('guidebookId');

  useEffect(() => {
    const fetchUserId = () => {
      const loggedInUserId = getCookie('userId');
      setUserId(loggedInUserId);
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchGuidebookDetail = async () => {
      try {
        const response = await jsonConnection.get(`/public/guidebooks/${guidebookId}/detail`);
        setGuidebook(response.data.data);
        setUpdatedTitle(response.data.data.title);
        setUpdatedContent(response.data.data.content);
      } catch (error) {
        console.error('가이드북 정보를 가져오는 데 실패했습니다:', error);
      }
    };

    fetchGuidebookDetail();
  }, [guidebookId]);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    if (!guidebook) return;

    const updatedData = {
      title: updatedTitle,
      content: updatedContent,
    };

    try {
      const response = await jsonConnection.patch(`/private/guidebooks/update`, updatedData);

      if (response.status === 200) {
        alert('글이 수정되었습니다.');
        setGuidebook((prev) => ({
          ...prev!,
          title: updatedTitle,
          content: updatedContent,
        }));
        setIsEditing(false);
      }
    } catch (error) {
      console.error('수정 중 오류가 발생했습니다:', error);
      alert('수정에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('삭제하시겠습니까?')) {
      try {
        const response = await jsonConnection.delete(`/private/guidebooks/${guidebookId}/delete`);
        if (response.status === 200) {
          alert('글이 삭제되었습니다.');
          navigate('/guidebooklist');
        }
      } catch (error) {
        console.error('삭제 중 오류가 발생했습니다:', error);
        alert('삭제에 실패했습니다. 다시 시도해주세요.');
      }
    } else {
      console.log('삭제가 취소되었습니다.');
    }
  };

  return (
    <Container>
      {guidebook && (
        <GuidebookDetailContainer>
          <GuidebookDetailHeader>
            <BackButton onClick={() => navigate(-1)} aria-label="뒤로가기">
              <BackIcon src={back} />
            </BackButton>
            <MenuButton onClick={handleMenuToggle} aria-label="메뉴">
              <MenuIcon src={kebab} />
            </MenuButton>
            {isMenuOpen && (
              <MenuContainer>
                <MenuItem>신고</MenuItem>
                {userId === guidebook.userId && (
                  <>
                    <MenuItem onClick={handleEdit}>수정</MenuItem>
                    <MenuItem onClick={handleDelete}>삭제</MenuItem>
                  </>
                )}
              </MenuContainer>
            )}
          </GuidebookDetailHeader>
          <GuidebookDetailContent>
            <ProfileInfo>
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={updatedTitle}
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                  />
                  <textarea
                    value={updatedContent}
                    onChange={(e) => setUpdatedContent(e.target.value)}
                  />
                  <button onClick={handleUpdate}>저장</button>
                  <button onClick={() => setIsEditing(false)}>취소</button>
                </>
              ) : (
                <>
                  <Title>{guidebook.title}</Title>
                  <ProfileContainer>
                    <ProfileInfoContainer>
                      <Name>{guidebook.userId}</Name>
                      <Time>{guidebook.createdAt}</Time>
                    </ProfileInfoContainer>
                  </ProfileContainer>
                  <PostContent>
                    <PostImage src={guidebook.images} alt="Content" />
                    <ContentText>{guidebook.content}</ContentText>
                    <ReviewCount>조회 {guidebook.views}</ReviewCount>
                  </PostContent>
                </>
              )}
            </ProfileInfo>
          </GuidebookDetailContent>
        </GuidebookDetailContainer>
      )}
    </Container>
  );
};

export default GuidebookDetail;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const GuidebookDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  min-height: 100vh;
`;

const GuidebookDetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const GuidebookDetailContent = styled.div`
  display: flex;
`;

const BackButton = styled.button`
  margin-left: 20px;
  margin-top: 30px;
  background-color: transparent;
  border: none;
  font-size: 30px;
  cursor: pointer;
  color: #000;
`;

const BackIcon = styled.img`
  width: 20px;
`;

const MenuButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #000;
  margin-right: 20px;
  margin-top: 30px;
`;

const MenuIcon = styled.img`
  width: 22px;
`;

const MenuContainer = styled.div`
  position: absolute;
  top: 60px;
  right: 20px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 8px 0;
  z-index: 1;
`;

const MenuItem = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 14px;

  &:hover {
    background-color: #f2f2f2;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 15px;
  width: 100%;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;

const Title = styled.h1`
  font-size: 23px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  border-bottom: 1px solid #ccc;
`;

const ProfileInfoContainer = styled.div`
  margin-left: 10px;
`;

const Name = styled.div`
  font-weight: bold;
`;

const Time = styled.div`
  color: #666;
  margin-bottom: 30px;
`;

const PostContent = styled.div`
  .post-image {
    width: 100%;
    height: auto;
    margin-bottom: 15px;
  }
`;

const PostImage = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 10px;
`;

const ContentText = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
  color: #333;
  line-height: 1.3;
`;

const ReviewCount = styled.div`
  font-size: 14px;
  color: #666;
  text-align: right;
`;