import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import filter from '../assets/images/filter.png';
import magnifier from '../assets/images/magnifier.png';
import BottomSheetUI from '../components/BottomSheet';
import UpperMenu from "../components/UpperMenu";
import WriteButton from '../components/WriteButton';
import { Guidebook } from '../types/Guidebook';

type FilterOptions = {
  regions: string[];
  sorts: string[];
};

const guidebooks: Guidebook[] = [
  {
    id: 1,
    userId: '여행감자',
    title: '아산의 매력적인 관광 명소들',
    content: '아산은 충청남도 중부에 위치한 도농복합형 도시로, 천안과 함께 충남 서북부권의 중심지 역할을 하고 있습니다. 주요 관광지로는 온양온천, 아산 온양민속박물관, 아산 온천랜드 등이 있습니다. 온양온천은 아산의 대표적인 관광명소로, 천연 온천수와 다양한 온천 체험 시설을 갖추고 있으며, 온천 외에도 온천 박물관, 온천 시장 등 볼거리와 즐길거리가 풍부합니다. 아산 온양민속박물관은 아산의 전통문화와 민속을 소개하는 박물관으로, 전통가옥, 민속 전시물 등을 볼 수 있으며, 전통 공예 체험 프로그램도 운영하고 있습니다.',
    region: '아산시',
    images: 'https://mblogthumb-phinf.pstatic.net/20160730_233/aaaa123krkr_1469804785178Kn5Dj_JPEG/image_4149187211469804847203.jpg?type=w800',
    views: 63,
    createdAt: '2024-07-21',
  },
  {
    id: 2,
    userId: '감자돌이',
    title: '한국관광 충남 관광지 8곳 선정',
    region: '예산군',
    images: 'https://lh3.googleusercontent.com/proxy/BTkYmrxTMn3npcu3DjyjPFVBSzgzr83Xlpu2nejGUMhLYyZc1arC4ixzYT7BeHYR60MFqUUPwF3mnunTbbBRZVq56RmxBIvOQ14-sWXt',
    views: 23,
    createdAt: '2024-08-08',
  },
  {
    id: 3,
    userId: '트리퍼',
    title: '충남 태안으로 가을여행 가볼까?',
    region: '태안군',
    images: 'https://www.sbnnews.co.kr/data/photos/20210936/art_16311747905271_728b06.jpg',
    views: 38,
    createdAt: '2024-08-09',
    updatedAt: '2024-08-11',
  },
  {
    id: 4,
    userId: '트래블러버',
    title: '핫한 아산 관광지',
    region: '아산시',
    images: 'https://mblogthumb-phinf.pstatic.net/20160523_123/whddn1469_14639980365491i52w_JPEG/CYMERA_20160523_181207.jpg?type=w800',
    views: 54,
    createdAt: '2021-03-01',
  },
  {
    id: 5,
    userId: '세계방랑자',
    title: '국내 여행 고수들이 소개한 충남 명소 BEST 6',
    region: '천안시',
    images: 'https://cdn.ardentnews.co.kr/news/photo/202405/3254_15030_1258.jpg',
    views: 85,
    createdAt: '2023-12-18',
  },
  {
    id: 6,
    userId: '세계정복',
    title: '충남 서산 주변의 관광 명소',
    region: '서산시',
    images: 'https://cdn.imweb.me/thumbnail/20190505/5cce19e7b096e.jpg',
    views: 121,
    createdAt: '2022-01-10',
  },
];

const GuideBookList = () => {
  const navigate = useNavigate();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGuidebooks, setFilteredGuidebooks] = useState<Guidebook[]>([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<FilterOptions>({ regions: [], sorts: [] });

  useEffect(() => {
    setFilteredGuidebooks(guidebooks);
  }, []);

  const handleCardClick = (guidebook: Guidebook) => {
    navigate(`/guidebookdetail`, { state: { guidebook } });
  };

  const toggleBottomSheet = () => {
    setIsBottomSheetOpen(!isBottomSheetOpen);
  };

  const handleWriteButtonClick = () => {
    navigate('/guidebookwrite');
  };

  useEffect(() => {
    if (searchTerm) {
      const results = guidebooks.filter(guidebook =>
        guidebook.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredGuidebooks(results);
    } else {
      setFilteredGuidebooks(guidebooks);
    }
  }, [searchTerm, guidebooks]);

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const applyFilters = ({ regions, sorts }: FilterOptions ) => {
    let filtered = guidebooks;

    if (regions.length > 0) {
      filtered = filtered.filter(guidebook => regions.includes(guidebook.region));
    }

    if (sorts.includes('조회수 높은 순')) {
      filtered.sort((a, b) => b.views - a.views);
    } else if (sorts.includes('최신순')) {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    setFilteredGuidebooks(filtered);
    setIsFiltered(filtered.length > 0);
    setNoResults(filtered.length === 0);
    setSelectedFilters({ regions, sorts });

    if (regions.length > 0 || sorts.length > 0) {
      toggleBottomSheet();
    }
  };

  return (
    <Container>
      <UpperMenu />
      <Title>가이드북</Title>
      <Subtitle>당신의 특별한 순간을 담을 포토존을 찾아보세요!</Subtitle>

      <SearchContainer style={{ position: 'relative' }}>
        <SearchInput
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchTerm}
          onChange={handleSearchInputChange}
          style={{ paddingRight: '30px' }}
        />
        <img
          src={magnifier}
          alt="검색"
          style={{
            position: 'absolute',
            right: '120px',
            top: '50%',
            width: '5%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none'
          }}
        />

        <FilterButtonContainer>
          <FilterButton onClick={toggleBottomSheet}>
            <FilterIcon src={filter} />
            필터
          </FilterButton>
        </FilterButtonContainer>
      </SearchContainer>

      {noResults ? (
        <NoResultsMessage>조건에 맞는 사진작가가 없습니다.</NoResultsMessage>
      ) : (
        (isFiltered ? filteredGuidebooks : guidebooks).map((guidebook) => (
          <PostContainer key={guidebook.id} onClick={() => handleCardClick(guidebook)}>
            <PostImage src={guidebook.images} alt={guidebook.title} />
            <PostUser>{guidebook.userId}</PostUser>
            <PostView>조회 {guidebook.views}</PostView>
            <PostTextContainer>
              <PostTitle>{guidebook.title}</PostTitle>
              <PostDate>{guidebook.createdAt}</PostDate>
            </PostTextContainer>
          </PostContainer>
        ))
      )}

      {isBottomSheetOpen && (
        <BottomSheetUI
          applyFilters={applyFilters}
          sortOptions={['조회 높은 순', '최신순']}
          selectedFilters={selectedFilters}
        />
      )}

      {
          !isBottomSheetOpen && (
            <WriteButton onClick={handleWriteButtonClick} />
          )
        }

    </Container>
  );
};

export default GuideBookList;

const Container = styled.div`
  margin: 0;
  max-width: 600px;
  margin: auto;
`;

const Title = styled.h1`
  margin-top: 130px;
  margin-left: 18px;
  text-align: left;  
  font-size: 25px;
  font-weight: 700;
`;

const Subtitle = styled.p`
  font-size: 15px;
  color: #777;
  text-align: left;
  margin-top: 13px;
  margin-left: 20px;
  margin-bottom: 40px;
`;

const SearchContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
  margin-left: 18px;
`;

const SearchInput = styled.input`
  flex: 1;
  font-size: 15px;
  padding: 15px 20px;
  border: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); 
  border-radius: 10px;
  margin-right: 10px;
`;

const FilterButtonContainer = styled.div`
  display: flex;
  margin-right: 17px;
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  font-size: 13px;
  padding: 8px 12px;
  border: none;
  border-radius: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  cursor: pointer;
  color: #000;
`;

const FilterIcon = styled.img`
  margin-right: 5px;
  width: 18px;
`;

const NoResultsMessage = styled.p`
  text-align: center;
  font-size: 16px;
  color: #999;
  margin-top: 170px;
`;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column; 
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 10px; 
  margin: 20px 17px; 
  background-color: #fff; 
  position: relative;
`;

const PostImage = styled.img`
  width: 100%; 
  height: auto;
  border-radius: 10px;
  margin-top: 35px;
`;

const PostTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px 0;
`;

const PostUser = styled.span`
  position: absolute;
  top: 28px;
  left: 30px;
  font-size: 12px;
  color: #555;
`;

const PostView = styled.div`
  position: absolute;
  top: 25px;
  right: 30px;
  font-size: 12px;
  color: #aaa;
`;

const PostTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  text-align: left;
  margin-left: 7px;
  margin-top: 13px;
`;

const PostDate = styled.div`
  font-size: 12px;
  color: #aaa;
  text-align: right;
  margin-top: 30px;
  margin-bottom: -10px;
`;



// // axios
// import axios from 'axios';
// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import styled from 'styled-components';


// import filter from '../assets/images/filter.png';
// import magnifier from '../assets/images/magnifier.png';
// import BottomSheetUI from '../components/BottomSheet';
// import UpperMenu from "../components/UpperMenu";
// import WriteButton from '../components/WriteButton';
// import { Guidebook } from '../types/Guidebook';

// type FilterOptions = {
//   regions: string[];
//   sorts: string[];
// };

// const GuideBookList = () => {
//   const navigate = useNavigate();
//   const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredGuidebooks, setFilteredGuidebooks] = useState<Guidebook[]>([]);
//   const [isFiltered, setIsFiltered] = useState(false);
//   const [noResults, setNoResults] = useState(false);
//   const [selectedFilters, setSelectedFilters] = useState<FilterOptions>({ regions: [], sorts: [] });

//   useEffect(() => {
//     const fetchGuidebooks = async () => {
//       try {
//         const response = await axios.get('/guidebooks', {
//           params: {
//             region: '아산'
//           }
//         });
//         setFilteredGuidebooks(response.data.data);
//       } catch (error) {
//         console.error('가이드북을 가져오는 데 실패했습니다:', error);
//       }
//     };

//     fetchGuidebooks();
//   }, []);

//   const handleCardClick = (guidebook: Guidebook) => {
//     navigate(`/guidebookdetail`, { state: { guidebook } });
//   };

//   const toggleBottomSheet = () => {
//     setIsBottomSheetOpen(!isBottomSheetOpen);
//   };

//   const handleWriteButtonClick = () => {
//     navigate('/guidebookwrite');
//   };

//   useEffect(() => {
//     if (searchTerm) {
//       const results = filteredGuidebooks.filter(guidebook =>
//         guidebook.title.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredGuidebooks(results);
//     } else {
//       setFilteredGuidebooks(filteredGuidebooks);
//     }
//   }, [searchTerm]);

//   const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value);
//   };

//   const applyFilters = ({ regions, sorts }: FilterOptions) => {
//     let filtered = filteredGuidebooks;

//     if (regions.length > 0) {
//       filtered = filtered.filter(guidebook => regions.includes(guidebook.region));
//     }

//     if (sorts.includes('조회수 높은 순')) {
//       filtered.sort((a, b) => b.views - a.views);
//     } else if (sorts.includes('최신순')) {
//       filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
//     }

//     setFilteredGuidebooks(filtered);
//     setIsFiltered(filtered.length > 0);
//     setNoResults(filtered.length === 0);
//     setSelectedFilters({ regions, sorts });

//     if (regions.length > 0 || sorts.length > 0) {
//       toggleBottomSheet();
//     }
//   };

//   return (
//     <Container>
//       <UpperMenu />
//       <Title>가이드북</Title>
//       <Subtitle>당신의 특별한 순간을 담을 포토존을 찾아보세요!</Subtitle>

//       <SearchContainer style={{ position: 'relative' }}>
//         <SearchInput
//           type="text"
//           placeholder="검색어를 입력하세요"
//           value={searchTerm}
//           onChange={handleSearchInputChange}
//           style={{ paddingRight: '30px' }}
//         />
//         <img
//           src={magnifier}
//           alt="검색"
//           style={{
//             position: 'absolute',
//             right: '120px',
//             top: '50%',
//             width: '5%',
//             transform: 'translateY(-50%)',
//             pointerEvents: 'none'
//           }}
//         />
//         <FilterButtonContainer>
//           <FilterButton onClick={toggleBottomSheet}>
//             <FilterIcon src={filter} />
//             필터
//           </FilterButton>
//         </FilterButtonContainer>
//       </SearchContainer>

//       {noResults ? (
//         <NoResultsMessage>조건에 맞는 가이드북이 없습니다.</NoResultsMessage>
//       ) : (
//         (isFiltered ? filteredGuidebooks : filteredGuidebooks).map((guidebook) => (
//           <PostContainer key={guidebook.id} onClick={() => handleCardClick(guidebook)}>
//             <PostImage src={guidebook.images[0]} alt={guidebook.title} />
//             <PostUser>{guidebook.userId}</PostUser>
//             <PostView>조회 {guidebook.views}</PostView>
//             <PostTextContainer>
//               <PostTitle>{guidebook.title}</PostTitle>
//               <PostDate>{guidebook.createdAt}</PostDate>
//             </PostTextContainer>
//           </PostContainer>
//         ))
//       )}

//       {isBottomSheetOpen && (
//         <BottomSheetUI
//           applyFilters={applyFilters}
//           sortOptions={['조회수 높은 순', '최신순']}
//           selectedFilters={selectedFilters}
//         />
//       )}

//       {
//         !isBottomSheetOpen && (
//           <WriteButton onClick={handleWriteButtonClick} />
//         )
//       }
//     </Container>
//   );
// };

// export default GuideBookList;

// const Container = styled.div`
//   margin: 0;
//   max-width: 600px;
//   margin: auto;
// `;

// const Title = styled.h1`
//   margin-top: 130px;
//   margin-left: 18px;
//   text-align: left;  
//   font-size: 25px;
//   font-weight: 700;
// `;

// const Subtitle = styled.p`
//   font-size: 15px;
//   color: #777;
//   text-align: left;
//   margin-top: 13px;
//   margin-left: 20px;
//   margin-bottom: 40px;
// `;

// const SearchContainer = styled.div`
//   display: flex;
//   margin-bottom: 30px;
//   margin-left: 18px;
// `;

// const SearchInput = styled.input`
//   flex: 1;
//   font-size: 15px;
//   padding: 15px 20px;
//   border: none;
//   box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); 
//   border-radius: 10px;
//   margin-right: 10px;
// `;

// const FilterButtonContainer = styled.div`
//   display: flex;
//   margin-right: 17px;
// `;

// const FilterButton = styled.button`
//   display: flex;
//   align-items: center;
//   font-size: 13px;
//   padding: 8px 12px;
//   border: none;
//   border-radius: 10px;
//   background-color: #fff;
//   border: 1px solid #ccc;
//   cursor: pointer;
//   color: #000;
// `;

// const FilterIcon = styled.img`
//   margin-right: 5px;
//   width: 18px;
// `;

// const NoResultsMessage = styled.p`
//   text-align: center;
//   font-size: 16px;
//   color: #999;
//   margin-top: 170px;
// `;

// const PostContainer = styled.div`
//   display: flex;
//   flex-direction: column; 
//   padding: 20px;
//   border: 1px solid #eee;
//   border-radius: 10px; 
//   margin: 20px 17px; 
//   background-color: #fff; 
//   position: relative;
// `;

// const PostImage = styled.img`
//   width: 100%; 
//   height: auto;
//   border-radius: 10px;
//   margin-top: 35px;
// `;

// const PostTextContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin: 15px 0;
// `;

// const PostUser = styled.span`
//   position: absolute;
//   top: 28px;
//   left: 30px;
//   font-size: 12px;
//   color: #555;
// `;

// const PostView = styled.div`
//   position: absolute;
//   top: 25px;
//   right: 30px;
//   font-size: 12px;
//   color: #aaa;
// `;

// const PostTitle = styled.div`
//   font-size: 18px;
//   font-weight: bold;
//   text-align: left;
//   margin-left: 7px;
//   margin-top: 13px;
// `;

// const PostDate = styled.div`
//   font-size: 12px;
//   color: #aaa;
//   text-align: right;
//   margin-top: 30px;
//   margin-bottom: -10px;
// `;
