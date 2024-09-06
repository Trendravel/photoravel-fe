import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import back from '../assets/images/back.png';
import kebab from '../assets/images/kebab.png';

const GuideBookDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { guidebook } = location.state;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleEdit = async () => {
    const updatedGuidebook = {
      id: guidebook.id, // 가이드북 ID
      title: '수정된 제목', // 수정할 제목
      content: guidebook.content, // 기존 내용 유지
      region: guidebook.region, // 기존 지역 유지
    };

    try {
      const response = await axios.patch('/guidebooks/update', {
        body: updatedGuidebook,
        // 필요한 이미지 데이터가 있으면 여기에 추가
        data: {
          // 이미지 관련 데이터
        },
        images: [], // 수정할 이미지 데이터 (byte array)
      });

      if (response.status === 200) {
        console.log('수정 성공:', response.data);
        navigate('/guidebookedit');
      }
    } catch (error) {
      console.error('수정 실패:', error);
    }
  };
  const handleDelete = async () => {
    if (window.confirm('삭제하시겠습니까?')) {
      try {
        const response = await axios.delete(`/guidebooks/${guidebook.id}/delete`);
        if (response.status === 200) {
          alert('글이 삭제되었습니다.');
          navigate('/guidebooklist');
        }
      } catch (error) {
        console.error('삭제 중 오류가 발생햌ㅆ습니다:', error);
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
                <MenuItem onClick={handleEdit}>수정</MenuItem>
                <MenuItem onClick={handleDelete}>삭제</MenuItem>
              </MenuContainer>
            )}
          </GuidebookDetailHeader>
          <GuidebookDetailContent>
            <ProfileInfo>
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
            </ProfileInfo>
          </GuidebookDetailContent>
        </GuidebookDetailContainer>
      )}
    </Container>
  );
};

export default GuideBookDetail;

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
  width: 25px;
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
`;

const ReviewCount = styled.div`
  font-size: 14px;
  color: #666;
  text-align: right;
`;





// //axios
// import axios from 'axios';
// import { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import styled from 'styled-components';

// import back from '../assets/images/back.png';
// import kebab from '../assets/images/kebab.png';

// const GuideBookDetail = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { guidebookId } = location.state;
//   const [guidebook, setGuidebook] = useState(null);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   useEffect(() => {
//     const fetchGuidebookDetail = async () => {
//       try {
//         const response = await axios.get(`/guidebooks/${guidebookId}/detail`);
//         setGuidebook(response.data.data); // 응답 데이터에서 가이드북 정보를 가져옴
//       } catch (error) {
//         console.error('가이드북 정보를 가져오는 데 실패했습니다:', error);
//       }
//     };

//     fetchGuidebookDetail();
//   }, [guidebookId]);

//   const handleMenuToggle = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const handleEdit = async () => {
//     const updatedGuidebook = {
//       id: guidebook.id, // 가이드북 ID
//       title: '수정된 제목', // 수정할 제목
//       content: guidebook.content, // 기존 내용 유지
//       region: guidebook.region, // 기존 지역 유지
//     };

//     try {
//       const response = await axios.patch('/guidebooks/update', {
//         body: updatedGuidebook,
//         // 필요한 이미지 데이터가 있으면 여기에 추가
//         data: {
//           // 이미지 관련 데이터
//         },
//         images: [], // 수정할 이미지 데이터 (byte array)
//       });

//       if (response.status === 200) {
//         console.log('수정 성공:', response.data);
//         navigate('/guidebookedit');
//       }
//     } catch (error) {
//       console.error('수정 실패:', error);
//     }
//   };
//   const handleDelete = async () => {
//     if (window.confirm('삭제하시겠습니까?')) {
//       try {
//         const response = await axios.delete(`/guidebooks/${guidebook.id}/delete`);
//         if (response.status === 200) {
//           alert('글이 삭제되었습니다.');
//           navigate('/guidebooklist');
//         }
//       } catch (error) {
//         console.error('삭제 중 오류가 발생햌ㅆ습니다:', error);
//         alert('삭제에 실패했습니다. 다시 시도해주세요.');
//       }
//     } else {
//       console.log('삭제가 취소되었습니다.');
//     }
//   };

//   return (
//     <Container>
//       {guidebook && (
//         <GuidebookDetailContainer>
//           <GuidebookDetailHeader>
//             <BackButton onClick={() => navigate(-1)} aria-label="뒤로가기">
//               <BackIcon src={back} />
//             </BackButton>
//             <MenuButton onClick={handleMenuToggle} aria-label="메뉴">
//               <MenuIcon src={kebab} />
//             </MenuButton>
//             {isMenuOpen && (
//               <MenuContainer>
//                 <MenuItem onClick={handleEdit}>수정</MenuItem>
//                 <MenuItem onClick={handleDelete}>삭제</MenuItem>
//               </MenuContainer>
//             )}
//           </GuidebookDetailHeader>
//           <GuidebookDetailContent>
//             <ProfileInfo>
//               <Title>{guidebook.title}</Title>
//               <ProfileContainer>
//                 <ProfileInfoContainer>
//                   <Name>{guidebook.userId}</Name>
//                   <Time>{guidebook.createdAt}</Time>
//                 </ProfileInfoContainer>
//               </ProfileContainer>
//               <PostContent>
//                 <PostImage src={guidebook.images} alt="Content" />
//                 <ContentText>{guidebook.content}</ContentText>
//                 <ReviewCount>조회 {guidebook.views}</ReviewCount>
//               </PostContent>
//             </ProfileInfo>
//           </GuidebookDetailContent>
//         </GuidebookDetailContainer>
//       )}
//     </Container>
//   );
// };

// export default GuideBookDetail;

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// const GuidebookDetailContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   background-color: #fff;
//   min-height: 100vh;
// `;

// const GuidebookDetailHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

// const GuidebookDetailContent = styled.div`
//   display: flex;
// `;

// const BackButton = styled.button`
//   margin-left: 20px;
//   margin-top: 30px;
//   background-color: transparent;
//   border: none;
//   font-size: 30px;
//   cursor: pointer;
//   color: #000;
// `;

// const BackIcon = styled.img`
//   width: 25px;
// `;

// const MenuButton = styled.button`
//   background-color: transparent;
//   border: none;
//   font-size: 24px;
//   cursor: pointer;
//   color: #000;
//   margin-right: 20px;
//   margin-top: 30px;
// `;

// const MenuIcon = styled.img`
//   width: 22px;
// `;

// const MenuContainer = styled.div`
//   position: absolute;
//   top: 60px;
//   right: 20px;
//   background-color: #fff;
//   border: 1px solid #ccc;
//   border-radius: 4px;
//   box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
//   padding: 8px 0;
//   z-index: 1;
// `;

// const MenuItem = styled.div`
//   padding: 8px 16px;
//   cursor: pointer;
//   transition: background-color 0.3s ease;
//   font-size: 14px;

//   &:hover {
//     background-color: #f2f2f2;
//   }
// `;

// const ProfileInfo = styled.div`
//   display: flex;
//   flex-direction: column;
//   text-align: left;
//   margin: 15px;
//   width: 100%;
//   padding: 20px;
//   background-color: #fff;
//   box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
//   border-radius: 5px;
// `;

// const Title = styled.h1`
//   font-size: 23px;
//   font-weight: bold;
//   margin-bottom: 20px;
// `;

// const ProfileContainer = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 30px;
//   border-bottom: 1px solid #ccc;
// `;

// const ProfileInfoContainer = styled.div`
//   margin-left: 10px;
// `;

// const Name = styled.div`
//   font-weight: bold;
// `;

// const Time = styled.div`
//   color: #666;
//   margin-bottom: 30px;
// `;

// const PostContent = styled.div`
//   .post-image {
//     width: 100%;
//     height: auto;
//     margin-bottom: 15px;
//   }
// `;

// const PostImage = styled.img`
//   width: 100%;
//   height: auto;
//   margin-bottom: 10px;
// `;

// const ContentText = styled.p`
//   font-size: 16px;
//   margin-bottom: 20px;
//   color: #333;
// `;

// const ReviewCount = styled.div`
//   font-size: 14px;
//   color: #666;
//   text-align: right;
// `;