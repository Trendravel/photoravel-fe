import styled from 'styled-components';

const regions = ['계룡시', '공주시', '금산군', '논산시', '당진시', '보령시', '부여군', '서산시', '서천군', '아산시', '예산군', '청양군', '천안시', '태안군', '홍성군'];

const RegionFilter = ({ selectedRegion, setSelectedRegion }: { selectedRegion: string[], setSelectedRegion: React.Dispatch<React.SetStateAction<string[]>> }) => {
  const handleRegionClick = (region: string) => {
    setSelectedRegion((prev) =>
      prev.includes(region) ? prev.filter(c => c !== region) : [...prev, region]
    );
  };

  return (
    <RegionContainer>
      <Label>지역</Label>
      <RegionButtonContainer>
        {regions.map(region => (
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
  );
};

const RegionContainer = styled.div`
  display: flex;
  flex-direction: column; 
  align-items: flex-start;
  padding: 0.2em 1.5em;
`;

const Label = styled.p`
  font-size: 18px;
  font-weight: 600;
  margin-top: 20px;
  margin-left: -4px;
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

  &:hover {
    background-color: #FF6B6B;
    color: white;
  }
`;

export default RegionFilter;