import styled from 'styled-components';

const regions = ['계룡', '공주', '금산', '논산', '당진', '보령', '부여', '서산', '서천', '아산', '예산', '청양', '천안', '태안', '홍성'];

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
  padding: 0em 0.6em;
`;

const Label = styled.p`
  font-size: 16px;
  font-weight: 600;
  margin-top: 15px;
`;

const RegionButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.2em;
  padding: 13px 5px;
  justify-items: center;
`;

const RegionButton = styled.button<{ selected: boolean }>`
  margin: 0.5em;
  padding: 1em 1.5em;
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