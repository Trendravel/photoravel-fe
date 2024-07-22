import { useState } from "react";
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

interface GuideBookSortFilterProps {
  items: string[];
  onSelect: (item: string) => void;
}

const GuideBookSortFilter = ({ items }: GuideBookSortFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(items[0]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  return (
    <DropDownBoxWrap>
      <CategoryTextContainer onClick={toggleDropdown}>
        <FontAwesomeIcon icon={faFilter} />
        <CategoryText>{selectedItem}</CategoryText>
      </CategoryTextContainer>
      <DropDownContainer isOpen={isOpen}>
        {items.map((item) => (
          <ListItem key={item} onClick={() => handleItemClick(item)}>
            {item}
          </ListItem>
        ))}
      </DropDownContainer>
    </DropDownBoxWrap>
  );
};

export default GuideBookSortFilter;

const CategoryMenuBox = styled.div`
  font-weight: 700;
  font-size: 1.7rem;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const CategoryTextContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: -20px;
`;

const CategoryText = styled.p`
  margin-left: 10px;
`;

const DropDownBoxWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
`;

const DropDownContainer = styled.ul<{ isOpen: boolean }>`
  width: 6.5rem;
  max-height: 152px;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  flex-direction: column;
  list-style: none;
  overflow-y: scroll;
  padding: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  position: absolute;
  top: 70%;
  left: 75%;
  z-index: 1000;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
  list-style: none;
  border-bottom: 1px solid #ccc;
  padding: 0.8rem;
  margin: 0;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;