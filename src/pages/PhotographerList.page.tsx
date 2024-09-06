import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import filter from '../assets/images/filter.png';
import region from '../assets/images/region.png';
import star from '../assets/images/star.png';
import BottomSheetUI from '../components/BottomSheet';
import UpperMenu from '../components/UpperMenu';
import { Photographer } from '../types/Photographer';

type FilterOptions = {
  regions: string[];
  sorts: string[];
};

const photographers: Photographer[] = [
  {
    accountId: 'kej88',
    name: '현담',
    description: '15년차 개인 사진작가로 활동 중이며, 네이버 오늘의 사진에 두 번 당선되었습니다.',
    ratingAvg: '5.0',
    reviewCount: 29,
    matches: 46,
    experience: 14,
    profileImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT48eOU7RJ5msG_0lMbQhcKLPqYPbkiWr8SSA&s',
    region: '아산시',
  },
  {
    accountId: 'kej88',
    name: '도성윤',
    description: '3대 가족사진, 대가족사진, 전문인프로필, 커플, 우정사진촬영/사원증,오케스트라,합창단 등 출장 촬영 전문!',
    ratingAvg: '3.9',
    reviewCount: 4,
    matches: 7,
    experience: 4,
    profileImg: 'https://cphoto.asiae.co.kr/listimglink/1/2024061321553916177_1718283339.jpg',
    region: '예산군',
  },
  {
    accountId: 'kej88',
    name: '박형근',
    description: '누구나 찍을 수 있는 사진이 아닌 오랜시간 두고 보아도 미소 지을 수 있는 그런 사진을 남겨 드립니다.',
    ratingAvg: '4.2',
    reviewCount: 15,
    matches: 22,
    experience: 15,
    profileImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqpVxMT64FvT6xw4qBTguRkQq9zTnQ3TN3Ow&s',
    region: '천안시',
  },
  {
    accountId: 'kej88',
    name: '영진',
    description: '사진촬영의 결과물은 현장의 분위기와 좋은 사진을 만드려는 작가의 끈기에서 창작됩니다.',
    ratingAvg: '4.3',
    reviewCount: 30,
    matches: 8,
    experience: 11,
    profileImg: 'https://www.hynews.ac.kr/news/photo/202009/10519_8579_1515.jpg',
    region: '홍성군',
  },
  {
    accountId: 'kej88',
    name: '김건',
    description: '틀에 갇힌 사진을 찍지 않는 사진작가. 세상에 오직 하나 뿐인 사진을 찍습니다.',
    ratingAvg: '5.0',
    reviewCount: 94,
    matches: 116,
    experience: 13,
    profileImg: 'https://img.khan.co.kr/news/2023/03/16/l_2023031701000706200060681.jpg',
    region: '태안군',
  },
  {
    accountId: 'kej88',
    name: '장종기',
    description: '개인촬영 모델촬영 가족여행 우정여행 데이트스냅등 컨셉 촬영 전문 포토그래퍼입니다',
    ratingAvg: '4.8',
    reviewCount: 80,
    matches: 159,
    experience: 12,
    profileImg: 'https://cdnimage.ebn.co.kr/news/201705/news_1496024454_893906_main1.jpg',
    region: '청양군',
  },
];

const truncateDescription = (description: string, maxLength: number = 22) => {
  return description.length > maxLength ? description.substring(0, maxLength) + '...' : description;
}

const PhotographerList = () => {
  const navigate = useNavigate();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [filteredPhotographers, setFilteredPhotographers] = useState<Photographer[]>([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<FilterOptions>({ regions: [], sorts: [] });

  useEffect(() => {
    setFilteredPhotographers(photographers);
  }, []);

  const handleCardClick = (photographer: Photographer) => {
    navigate(`/photographerdetail`, { state: { photographer } });
  };

  const toggleBottomSheet = () => {
    setIsBottomSheetOpen(!isBottomSheetOpen);
  };

  const applyFilters = ({ regions, sorts }: FilterOptions) => {
    let filtered = photographers;

    if (regions.length > 0) {
      filtered = filtered.filter(photographer => regions.includes(photographer.region));
    }

    if (sorts.includes('평점 높은 순')) {
      filtered.sort((a, b) => Number(b.ratingAvg) - Number(a.ratingAvg)); 
    } else if (sorts.includes('경력 높은 순')) {
      filtered.sort((a, b) => b.experience - a.experience);
    } else if (sorts.includes('매칭 많은 순')) {
      filtered.sort((a, b) => b.matches - a.matches);
    }  else if (sorts.includes('리뷰 많은 순')) {
      filtered.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    setFilteredPhotographers(filtered);
    setIsFiltered(filtered.length > 0);
    setNoResults(filtered.length === 0);
    setSelectedFilters({ regions, sorts });
    toggleBottomSheet();
  }
  
  return (
    <Container>
      <UpperMenu />
      <Title>사진작가 매칭</Title>
      <Subtitle>당신의 특별한 순간을 담아줄 사진작가를 찾아보세요!</Subtitle>

      <FilterButtonContainer>
        <FilterButton onClick={toggleBottomSheet}>
          <FilterIcon src={filter} />
          필터
        </FilterButton>
      </FilterButtonContainer>

      {noResults ? (
        <NoResultsMessage>조건에 맞는 사진작가가 없습니다.</NoResultsMessage>
      ) : (
        (isFiltered ? filteredPhotographers : photographers).map((photographer) => (
          <CardContainer key={photographer.accountId} onClick={() => handleCardClick(photographer)}>
            <PhotographerImage src={photographer.profileImg} alt={photographer.name} />
            <InfoContainer>
              <PhotographerName>
                {photographer.name}
                <Tag>매칭가능</Tag>
              </PhotographerName>
              <PhotographerDescription>{truncateDescription(photographer.description)}</PhotographerDescription>
              <RatingContainer>
                <RatingIcon src={star} />
                <Rating>{photographer.ratingAvg}({photographer.reviewCount}) </Rating>
                <Stats>{photographer.matches}회 매칭   |   경력 {photographer.experience}년</Stats>
              </RatingContainer>
              <RegionContainer>
                <RegionIcon src={region} />
                {photographer.region}
              </RegionContainer>
            </InfoContainer>
          </CardContainer>
        ))
      )}

      {isBottomSheetOpen && (
        <BottomSheetUI 
          applyFilters={({ regions, sorts }) => applyFilters({ regions, sorts })}
          sortOptions={['평점 높은 순', '경력 높은 순', '매칭 많은 순', '리뷰 많은 순']}
          selectedFilters={selectedFilters}
        />
      )}
    </Container>
  );
};

export default PhotographerList;

const Container = styled.div`
  margin: 0px;
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

const FilterButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end; 
  margin-bottom: 32px;
  margin-right: 17px;
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  font-size: 13px;
  padding: 14px 12.5px;
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

const CardContainer = styled.div`
  background: white;
  border-radius: 15px;
  padding: 20px;
  margin: 0 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const InfoContainer = styled.div`
  flex: 1;
  text-align: left;
`;

const PhotographerImage = styled.img`
  width: 75px;
  height: 75px;
  border-radius: 50%;
  margin-bottom: 30px;
  margin-right: 18px;
`;

const PhotographerName = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;
`;

const Tag = styled.span`
  background: #ff6f61;
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  margin-left: 10px;
`;

const PhotographerDescription = styled.p`
  font-size: 12px;
  color: #555;
  margin: 5px 0;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
`;

const RatingIcon = styled.img`
  width: 12px;
  margin-right: 5px;
`;

const Rating = styled.span`
  color: #777;
  margin-right: 5px;
`;

const Stats = styled.p`
  color: #777;
  margin: 5px 0;
`;

const RegionContainer = styled.div`
  display: flex;
  align-items: center;
  background: #f0f0f0;
  border-radius: 5px;
  width: 60px;  
  padding: 3px 8px;
  margin-top: 5px;
  font-size: 12px;
  color: #777;
`;

const RegionIcon = styled.img`
  width: 12px;
  margin-right: 5px;
`;