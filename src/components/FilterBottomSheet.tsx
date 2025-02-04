import styled from '@emotion/styled';
import { useRef, useState } from 'react';
import { FilterOptions } from '../types/FilterOptions';
import cancel from '../assets/images/cancel.png';
import RegionFilter from './RegionFilter';
import SortFilter from './SortFilter';

const FilterBottomSheet = ({ applyFilters, sortOptions, selectedFilters }: { applyFilters: (filters: FilterOptions) => void, sortOptions: string[], selectedFilters: FilterOptions }) => {
  const [bottom, setBottom] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState<string[]>(selectedFilters.regions);
  const [selectedSort, setSelectedSort] = useState<string[]>(selectedFilters.sorts);
  const isAnimated = useRef(false);

  const handleClose = () => {
    setBottom(-700);
  };

  const handleApply = () => {
    applyFilters({ regions: selectedRegion, sorts: selectedSort });
  };

  const handleReset = () => {
    if (confirm('필터를 초기화 시키시겠습니까?')) {
      setSelectedRegion([]);
      setSelectedSort([]);
      applyFilters({ regions: [], sorts: [] });
    }
  };

  return (
    <>
      <BottomSheet bottom={bottom} height="70vh" isAnimated={isAnimated.current}>
        <Handle />
        <Header>
          <Title>필터</Title>
          <CancelButton onClick={handleClose}>
            <CancelIcon src={cancel} />
          </CancelButton>
        </Header>
        <Divider />
        <RegionFilter selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} />
        <Divider />
        <SortFilter sortOptions={sortOptions} selectedSort={selectedSort} setSelectedSort={setSelectedSort} />
        <ButtonContainer>
          <ResetButton onClick={handleReset}>초기화</ResetButton>
          <ApplyButton onClick={handleApply}>적용</ApplyButton>
        </ButtonContainer>
      </BottomSheet>
    </>
  );
};

export default FilterBottomSheet;

const BottomSheet = styled.div<{ bottom: number, height: string, isAnimated: boolean }>`
  z-index: 10;
  position: fixed;
  left: 0;
  right: 0;
  bottom: ${(props) => props.bottom}px;
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0 -2px 3.84px rgba(0, 0, 0, 0.25);
  transition: ${(props) => props.isAnimated ? "bottom 0.2s ease-in-out" : ""};
  height: ${(props) => props.height};

  @media (max-width: 430px) {
    height: 58vh;
    padding: 10px 0px;
  }

  @media (max-width: 415px) {
    height: 64vh;
    padding: 10px 0px; 
  }

  @media (max-width: 375px) { 
    height: 82vh;
    padding: 7px 0px; 
  }
`;

const Handle = styled.div`
  width: 32px;
  height: 4px;
  border-radius: 2px;
  background-color: #d0d0d0;
  margin: auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
`;

const Title = styled.p`
  font-size: 16px;
  font-weight: 600;
`;

const CancelButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const CancelIcon = styled.img`
  width: 27px;
  margin-top: -7px;
`;

const Divider = styled.div`
  height: 1px;
  background-color: #ccc;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1em; 
  margin-top: auto;
`;

const ResetButton = styled.button`
  flex: 1; 
  margin-right: 8px;
  padding: 16px 0;
  border-radius: 10px;
  border: 1px solid #ccc;
  background-color: #fff;
  color: #565C64;
  cursor: pointer;
  font-size: 17px;
  font-weight: 500;
`;

const ApplyButton = styled.button`
  flex: 1;
  margin-left: 8px; 
  padding: 16px 0; 
  border-radius: 10px;
  background-color: #ff6b6b;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 17px;
  font-weight: 500;
`;