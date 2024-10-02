import styled from 'styled-components';

const SortFilter = ({ sortOptions, selectedSort, setSelectedSort }: { sortOptions: string[], selectedSort: string[], setSelectedSort: React.Dispatch<React.SetStateAction<string[]>> }) => {
  const handleSortClick = (sort: string) => {
    setSelectedSort((prev) =>
      prev.includes(sort) ? prev.filter(c => c !== sort) : [...prev, sort]
    );
  };

  return (
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
  );
};

const SortContainer = styled.div`
  display: flex;
  flex-direction: column; 
  align-items: flex-start;
  padding: 0em 1.0em;
`;

const Label = styled.p`
  font-size: 16px;
  font-weight: 600;
  margin-top: 15px;
`;

const SortButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.2em;
  padding: 13px 5px;
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

  &:hover {
    background-color: #FF6B6B;
    color: white;
  }
`;

export default SortFilter;