import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-named-as-default
import styled from 'styled-components';

import { jsonConnection } from '../api/connectBackend';
import { getCookie } from '../api/useCookie'; 
import filter from '../assets/images/filter.png';
import magnifier from '../assets/images/magnifier.png';
import FilterBottomSheet from '../components/FilterBottomSheet';
import UpperMenu from "../components/UpperMenu";
import WriteButton from '../components/WriteButton';
import { FilterOptions } from '../types/FilterOptions';
import { Guidebook } from '../types/Guidebook';

const GuidebookList = () => {
  const navigate = useNavigate();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGuidebooks, setFilteredGuidebooks] = useState<Guidebook[]>([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<FilterOptions>({ regions: [], sorts: [] });
  const [region, setRegion] = useState<string[]>([]);

  const fetchGuidebooks = async () => {
    try {
      const response = await jsonConnection.get(`/public/guidebooks?region=${region}`);
      setFilteredGuidebooks(response.data.data);
    } catch (error) {
      console.error('가이드북을 가져오는 데 실패했습니다:', error);
    }
  };

  const handleCardClick = (guidebook: Guidebook) => {
    navigate(`/guidebookdetail`, { state: { guidebook } });
  };

  const toggleBottomSheet = () => {
    setIsBottomSheetOpen(!isBottomSheetOpen);
  };

  const handleWriteButtonClick = () => {
    navigate('/guidebookwrite');
    const userId = getCookie('userId');

    if (userId) {
      navigate('/guidebookwrite');
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    if (searchTerm) {
      const results = filteredGuidebooks.filter(guidebook =>
        guidebook.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredGuidebooks(results);
    } else {
      fetchGuidebooks();
    }
  }, [searchTerm]);
  
  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const applyFilters = ({ regions, sorts }: FilterOptions) => {
    let filtered = filteredGuidebooks;

    if (regions.length > 0) {
      filtered = filtered.filter(guidebook => regions.includes(guidebook.region));
      setRegion(regions); 
    } else {
      setRegion([]);
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
        <NoResultsMessage>조건에 맞는 가이드북이 없습니다.</NoResultsMessage>
      ) : (
        (isFiltered ? filteredGuidebooks : filteredGuidebooks).map((guidebook) => (
          <PostContainer key={guidebook.id} onClick={() => handleCardClick(guidebook)}>
            <PostImage src={guidebook.images[0]} alt={guidebook.title} />
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
        <FilterBottomSheet
          applyFilters={applyFilters}
          sortOptions={['조회수 높은 순', '최신순']}
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

export default GuidebookList;

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