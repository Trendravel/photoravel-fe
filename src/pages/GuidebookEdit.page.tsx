// import { useState, useEffect } from 'react';
// import { useNavigate, useLocation, useParams } from 'react-router-dom';
// import styled from 'styled-components';
// import axios from 'axios';

// const GuideBookEdit = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { id } = useParams<{ id: string }>();
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [image, setImage] = useState<File | null>(null);

//   useEffect(() => {
//     const getGuidebook = async () => {
//       try {
//         const response = await axios.get(`/guidebooks/${id}/detail`);
//         setTitle(response.data.title);
//         setContent(response.data.content);
//         // 이미지 데이터가 있는 경우 처리
//         // if (response.data.image) {
//         //   setImage(response.data.image);
//         // }
//       } catch (error) {
//         console.error('Error fetching guidebook:', error);
//       }
//     };
//     getGuidebook();
//   }, [id]);

//   const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setTitle(e.target.value);
//   };

//   const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setContent(e.target.value);
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setImage(e.target.files[0]);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('content', content);
//     if (image) {
//       formData.append('image', image);
//     }
//     try {
//       await axios.patch(`/guidebooks/${id}/update`, formData);
//       alert('글 수정이 완료되었습니다!');
//       navigate('/guidebook');
//     } catch (error) {
//       console.error('Error updating guidebook:', error);
//     }
//   };

//   const handleCancel = () => {
//     navigate(location.state?.from || '/guidebook');
//   };

//   return (
//     <GuidebookCreateContainer>
//       <GuidebookCreateForm onSubmit={handleSubmit}>
//         <GuidebookCreateHeader>
//           <GuidebookCreateCancelButton onClick={handleCancel}>✕</GuidebookCreateCancelButton>
//           <GuidebookHeaderText>글 수정</GuidebookHeaderText>
//           <GuidebookCreateSubmitButton type="submit">완료</GuidebookCreateSubmitButton>
//         </GuidebookCreateHeader>
//         <GuidebookCreateTitle
//           type="text"
//           placeholder="제목"
//           value={title}
//           onChange={handleTitleChange}
//         />
//         <GuidebookCreateContent
//           placeholder="내용을 입력하세요"
//           value={content}
//           onChange={handleContentChange}
//         />
//         <input type="file" onChange={handleImageChange} />
//         {image && (
//           <GuidebookCreateImagePreview>
//             <img src={URL.createObjectURL(image)} alt="Preview" />
//           </GuidebookCreateImagePreview>
//         )}
//       </GuidebookCreateForm>
//     </GuidebookCreateContainer>
//   );
// };

// export default GuideBookEdit;

// const GuidebookCreateContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const GuidebookCreateForm = styled.form`
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
//   width: 90%;
//   height: 80%;
//   max-width: 600px;
//   background-color: #fff;
//   border-radius: 8px;
// `;

// const GuidebookCreateHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 1rem;
// `;

// const GuidebookCreateCancelButton = styled.button`
//   background-color: transparent;
//   border: none;
//   padding: 0.5rem 1rem;
//   font-size: 2.3rem;
//   color: #000;
//   font-weight:
//   cursor: pointer;
// `;

// const GuidebookHeaderText = styled.p`
//   align-items: center;
//   font-size: 18px;
//   font-weight: bold;
// `

// const GuidebookCreateSubmitButton = styled.button`
//   padding: 0.5rem 1rem;
//   font-size: 0.8rem;
//   background-color: #ff6672;
//   color: #fff;
//   border: none;
//   border-radius: 50px;
//   cursor: pointer;
// `;

// const GuidebookCreateTitle = styled.input`
//   padding: 1rem;
//   font-size: 1rem;
//   border: none;
//   border-bottom: 1px solid #ccc;
//   border-radius: 0px;
// `;

// const GuidebookCreateContent = styled.textarea`
//   padding: 0.7rem;
//   font-size: 1rem;
//   border: none;
//   resize: vertical;
//   min-height: 250px;
// `;

// const GuidebookCreateImagePreview = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   width: 100%;
//   height: 300px;
//   background-color: #f5f5f5;
//   border: 1px solid #e0e0e0;
//   border-radius: 4px;
//   overflow: hidden;

//   img {
//     max-width: 100%;
//     max-height: 100%;
//     object-fit: contain;
//   }

//   p {
//     margin-top: 16px;
//     font-size: 14px;
//     color: #757575;
//   }
// `;



// import { useState, useEffect } from 'react';
// import { useNavigate, useLocation, useParams } from 'react-router-dom';
// import axios from 'axios';
// import styled from 'styled-components';

// interface GuideBookData {
//   profileImg: string;
//   userId: string;
//   title: string;
//   content: string;
//   images: string;
//   views: number;
//   createdAt: string;
//   updatedAt: string;
// }

// const GuideBookEdit = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { id } = useParams<{ id: string }>();
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [image, setImage] = useState<File | null>(null);
//   const [guidebook, setGuidebook] = useState<GuideBookData | null>(null);

//   useEffect(() => {
//     const fetchGuidebookData = async () => {
//       try {
//         const response = await axios.get(`/api/guidebooks/${id}`);
//         setGuidebook(response.data);
//         setTitle(response.data.title);
//         setContent(response.data.content);
//       } catch (error) {
//         console.error('Error fetching guidebook data:', error);
//       }
//     };

//     fetchGuidebookData();
//   }, [id]);

//   const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setTitle(e.target.value);
//   };

//   const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setContent(e.target.value);
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setImage(e.target.files[0]);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('content', content);
//     if (image) {
//       formData.append('image', image);
//     }
//     try {
//       await axios.put(`/api/guidebooks/${id}`, formData);
//       alert('글 수정이 완료되었습니다!');
//       navigate('/guidebook');
//     } catch (error) {
//       console.error('Error updating guidebook:', error);
//     }
//   };

//   const handleCancel = () => {
//     navigate(location.state?.from || '/guidebook');
//   };

//   return (
//     <GuidebookCreateContainer>
//       <GuidebookCreateForm onSubmit={handleSubmit}>
//         <GuidebookCreateHeader>
//           <GuidebookCreateCancelButton onClick={handleCancel}>✕</GuidebookCreateCancelButton>
//           <GuidebookHeaderText>글 수정</GuidebookHeaderText>
//           <GuidebookCreateSubmitButton type="submit">완료</GuidebookCreateSubmitButton>
//         </GuidebookCreateHeader>
//         <GuidebookCreateTitle
//           type="text"
//           placeholder="제목"
//           value={title}
//           onChange={handleTitleChange}
//         />
//         <GuidebookCreateContent
//           placeholder="내용을 입력하세요"
//           value={content}
//           onChange={handleContentChange}
//         />
//         <input type="file" onChange={handleImageChange} />
//         {guidebook?.images && (
//           <GuidebookCreateImagePreview>
//             <img src={guidebook.images} alt="Preview" />
//           </GuidebookCreateImagePreview>
//         )}
//       </GuidebookCreateForm>
//     </GuidebookCreateContainer>
//   );
// };

// export default GuideBookEdit;




import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';

interface GuideBookData {
  profileImg: string;
  userId: string;
  title: string;
  content: string;
  images: string;
  views: number;
  createdAt: string;
  updatedAt: string;
}

const GuideBookEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [guidebook, setGuidebook] = useState<GuideBookData | null>(null);

  useEffect(() => {
    // 가상 데이터를 사용하여 guidebook 상태 초기화
    setGuidebook({
      profileImg: 'https://img.freepik.com/free-photo/cute-ai-generated-cartoon-bunny_23-2150288870.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1721606400&semt=ais_users',
      userId: '프로여행러',
      title: '아산의 매력적인 관광 명소들',
      content: '아산은 충청남도 중부에 위치한 도농복합형 도시로, 천안과 함께 충남 서북부권의 중심지 역할을 하고 있습니다. 주요 관광지로는 온양온천, 아산 온양민속박물관, 아산 온천랜드 등이 있습니다. 온양온천은 아산의 대표적인 관광명소로, 천연 온천수와 다양한 온천 체험 시설을 갖추고 있으며, 온천 외에도 온천 박물관, 온천 시장 등 볼거리와 즐길거리가 풍부합니다. 아산 온양민속박물관은 아산의 전통문화와 민속을 소개하는 박물관으로, 전통가옥, 민속 전시물 등을 볼 수 있으며, 전통 공예 체험 프로그램도 운영하고 있습니다.',
      images: 'https://mblogthumb-phinf.pstatic.net/20160730_233/aaaa123krkr_1469804785178Kn5Dj_JPEG/image_4149187211469804847203.jpg?type=w800',
      views: 63,
      createdAt: '2024-07-21',
      updatedAt: '2024-07-23',
    });
  
    // 가상 데이터를 사용하여 title과 content 상태 초기화
    setTitle(guidebook?.title || '');
    setContent(guidebook?.content || '');
  }, [id, guidebook]); // guidebook을 의존성 배열에 추가

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
      confirm('글 수정을 완료하시겠습니까?');
      navigate('/guidebookdetail');
    } catch (error) {
      console.error('Error updating guidebook:', error);
    }
  }    

  const handleCancel = () => {
    navigate(location.state?.from || '/guidebook');
  };

  return (
    <GuidebookCreateContainer>
      <GuidebookCreateForm onSubmit={handleSubmit}>
        <GuidebookCreateHeader>
          <GuidebookCreateCancelButton onClick={handleCancel}>✕</GuidebookCreateCancelButton>
          <GuidebookHeaderText>글 수정</GuidebookHeaderText>
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
        {guidebook?.images && (
          <GuidebookCreateImagePreview>
            <img src={guidebook.images} alt="Preview" />
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