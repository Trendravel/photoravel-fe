import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { jsonConnection } from '../api/connectBackend';
import { getCookie } from '../api/useCookie'; 
import filter from '../assets/images/filter.png';
import magnifier from '../assets/images/magnifier.png';
import regionIcon from '../assets/images/regionIcon.png';
import star from '../assets/images/star.png';
import FilterBottomSheet from '../components/FilterBottomSheet';
import UpperMenu from '../components/UpperMenu';
import { FilterOptions } from '../types/FilterOptions';
import { Photographer } from '../types/Photographer';

const truncateDescription = (description: string, maxLength: number = 22) => {
  return description.length > maxLength ? description.substring(0, maxLength) + '...' : description;
}

const PhotographerList = () => {
  const navigate = useNavigate();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [photographers, setPhotographers] = useState<Photographer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPhotographers, setFilteredPhotographers] = useState<Photographer[]>([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<FilterOptions>({ regions: ["아산"], sorts: ["경력 높은 순"] });
  const [region, setRegion] = useState<string[]>(["아산"]);

  useEffect(() => {
    const fetchPhotographers = async () => {
      try {
        const response = await jsonConnection.get(`/public/photographers?region=${region}`);

        if (response.data.result.resultCode === 200) {
          setPhotographers(response.data.data);
          setFilteredPhotographers(response.data.data);
        } else {
          alert(`오류: ${response.data.result.resultMessage}`);
        }
      } catch (error) {
        console.error('사진작가 목록을 가져오는 데 실패했습니다:', error);
      }
    };

    fetchPhotographers();
  }, [region]);

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
      setRegion(regions); 
    } else {
      setRegion([]);
    }

    if (sorts.includes('평점 높은 순')) {
      filtered.sort((a, b) => Number(b.ratingAvg) - Number(a.ratingAvg)); 
    } else if (sorts.includes('경력 높은 순')) {
      filtered.sort((a, b) => b.careerYear - a.careerYear);
    } else if (sorts.includes('매칭 많은 순')) {
      filtered.sort((a, b) => b.matchingCount - a.matchingCount);
    }  else if (sorts.includes('리뷰 많은 순')) {
      filtered.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    setFilteredPhotographers(filtered);
    setIsFiltered(filtered.length > 0);
    setNoResults(filtered.length === 0);
    setSelectedFilters({ regions, sorts });
    toggleBottomSheet();
  }

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    const name = getCookie('name');
    let filtered = photographers.filter(photographer => {
      const matchesSearch = photographer.name.toLowerCase().includes(value.toLowerCase());
      const matchesUser = photographer.name === name;
      return matchesSearch && matchesUser;
    });

    setFilteredPhotographers(filtered);
    setIsFiltered(filtered.length > 0);
    setNoResults(filtered.length === 0);
  };
  
  return (
    <Container>
      <UpperMenu />
      <Title>사진작가 매칭</Title>
      <Subtitle>당신의 특별한 순간을 담아줄 사진작가를 찾아보세요!</Subtitle>

      <SearchContainer style={{ position: 'relative' }}>
        <SearchInput
          type="text"
          placeholder="사진작가 이름으로 검색하세요"
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
                <Stats>{photographer.matchingCount}회 매칭   |   경력 {photographer.careerYear}년</Stats>
              </RatingContainer>
              <RegionContainer>
                <RegionIcon src={regionIcon} />
                {photographer.region}
              </RegionContainer>
            </InfoContainer>
          </CardContainer>
        ))
      )}

      {isBottomSheetOpen && (
        <FilterBottomSheet 
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