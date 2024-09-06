import styled from '@emotion/styled';
import { useRef, useState } from 'react';

import cancel from '../assets/images/cancel.png';

type FilterOptions = {
  regions: string[];
  sorts: string[];
}

const BottomSheetUI = ({ applyFilters, sortOptions, selectedFilters }: { applyFilters: (filters: FilterOptions) => void, sortOptions: string[], selectedFilters: FilterOptions }) => {
  const [bottom, setBottom] = useState(-50);
  const [selectedRegion, setSelectedRegion] = useState<string[]>(selectedFilters.regions); // 수정된 부분
  const [selectedSort, setSelectedSort] = useState<string[]>(selectedFilters.sorts); // 수정된 부분
  const isAnimated = useRef(false);

  const handleRegionClick = (region: string) => {
    setSelectedRegion((prev) =>
      prev.includes(region) ? prev.filter(c => c !== region) : [...prev, region]
    );
  };

  const handleSortClick = (sort: string) => {
    setSelectedSort((prev) =>
      prev.includes(sort) ? prev.filter(c => c !== sort) : [...prev, sort]
    );
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

  const handleClose = () => {
    setBottom(-600);
  };

  return (
    <>
      <BottomSheet
        bottom={bottom}
        height="65vh"
        isAnimated={isAnimated.current}
      >
        <Handle />
        <Header>
          <Title>필터</Title>
          <CancelButton onClick={handleClose}>
            <CancelIcon src={cancel} />
          </CancelButton>
        </Header>
        <Divider />
        <RegionContainer>
          <Label>지역</Label>
          <RegionButtonContainer>
            {['계룡시', '공주시', '금산군', '논산시', '당진시', '보령시', '부여군', '서산시', '서천군', '아산시', '예산군', '청양군', '천안시', '태안군', '홍성군'].map(region => (
              <RegionButton
                key={region}
                selected={selectedRegion.includes(region)}
                onClick={() => handleRegionClick(region)}
              >
                {region}
              </RegionButton>
            ))}
          </RegionButtonContainer>
        </RegionContainer>
        <Divider />
        <SortContainer>
          <Label>정렬</Label>
          <SortButtonContainer>
            {sortOptions.map(sort => (
              <SortButton
                key={sort}
                selected={selectedSort.includes(sort)}
                onClick={() => handleSortClick(sort)}
              >
                {sort}
              </SortButton>
            ))}
          </SortButtonContainer>
        </SortContainer>
        <ButtonContainer>
          <ResetButton onClick={handleReset}>초기화</ResetButton>
          <ApplyButton onClick={handleApply}>적용</ApplyButton>
        </ButtonContainer>
      </BottomSheet>
    </>
  );
};

export default BottomSheetUI;

const BottomSheet = styled.div<{ bottom: number, height: string, isAnimated: boolean }>`
  z-index: 10;
  position: fixed;
  left: 0;
  right: 0;
  bottom: ${(props) => props.bottom}px;
  background-color: white;
  padding-top: 16px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0 -2px 3.84px rgba(0, 0, 0, 0.25);
  transition: ${(props) => props.isAnimated ? "bottom 0.2s ease-in-out" : ""};
  height: ${(props) => props.height};
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
  padding: 20px;
`;

const Title = styled.p`
  font-size: 18px;
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
`

const Label = styled.p`
  font-size: 18px;
  font-weight: 600;
  margin-top: 20px;
  margin-left: -4px;
`;

const RegionContainer = styled.div`
  display: flex;
  flex-direction: column; 
  align-items: flex-start;
  padding: 0.2em 1.5em;
`;

const RegionButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5em;
  padding: 10px 0;
  justify-items: center;
`;

const RegionButton = styled.button<{ selected: boolean }>`
  margin: 0.5em;
  padding: 0.8em 1em;
  border-radius: 2em;
  background-color: ${(props) => props.selected ? '#FF6B6B' : '#F2F4F6'};
  color: ${(props) => props.selected ? 'white' : '#565C64'};
  border: none;
  cursor: pointer;
`;

const Divider = styled.div`
  height: 1px;
  background-color: #ccc;
`;

const SortContainer = styled.div`
  display: flex;
  flex-direction: column; 
  align-items: flex-start;
  padding: 0.2em 1.5em;
`;

const SortButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.2em;
  padding: 10px 0;
  justify-items: center;
`;

const SortButton = styled.button<{ selected: boolean }>`
  margin: 0.5em;
  padding: 1em 0.7em;
  min-width: 70px;
  border-radius: 2em;
  background-color: ${(props) => props.selected ? '#FF6B6B' : '#F2F4F6'};
  color: ${(props) => props.selected ? 'white' : '#565C64'};
  border: none;
  cursor: pointer;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.3em 1em;
`;

const ResetButton = styled.button`
  padding: 15px 68px;
  border-radius: 10px;
  border: 1px solid #ccc;
  background-color: #fff;
  color: #565C64;
  cursor: pointer;
  font-size: 17px;
  font-weight: 500;
`;

const ApplyButton = styled.button`
  padding: 15px 68px;
  border-radius: 10px;
  background-color: #ff6b6b;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 17px;
  font-weight: 500;
`;