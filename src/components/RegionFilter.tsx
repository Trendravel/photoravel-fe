import { useState } from 'react';
import styled from 'styled-components';
import downArrow from '../assets/images/down-arrow.png';

const RegionFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <DropDownBoxWrap>
      <DropDownBox onClick={toggleDropdown}>
        <DownArrowImage src={downArrow} alt="down-arrow" />
        {selectedOption || '지역 선택'}
      </DropDownBox>

      {isOpen && (
        <DropDownList>
          <ListItem onClick={() => handleOptionSelect("계룡시")}>계룡시</ListItem>
          <ListItem onClick={() => handleOptionSelect("공주시")}>공주시</ListItem>
          <ListItem onClick={() => handleOptionSelect("금산군")}>금산군</ListItem>
          <ListItem onClick={() => handleOptionSelect("논산시")}>논산시</ListItem>
          <ListItem onClick={() => handleOptionSelect("당진시")}>당진시</ListItem>
          <ListItem onClick={() => handleOptionSelect("부여군")}>부여군</ListItem>
          <ListItem onClick={() => handleOptionSelect("보령시")}>보령시</ListItem>
          <ListItem onClick={() => handleOptionSelect("서산시")}>서산시</ListItem>
          <ListItem onClick={() => handleOptionSelect("서천군")}>서천군</ListItem>
          <ListItem onClick={() => handleOptionSelect("아산시")}>아산시</ListItem>
          <ListItem onClick={() => handleOptionSelect("예산군")}>예산군</ListItem>
          <ListItem onClick={() => handleOptionSelect("태안군")}>태안군</ListItem>
          <ListItem onClick={() => handleOptionSelect("천안시")}>천안시</ListItem>
          <ListItem onClick={() => handleOptionSelect("청양군")}>청양군</ListItem>
          <ListItem onClick={() => handleOptionSelect("홍성군")}>홍성군</ListItem>
        </DropDownList>
      )}
    </DropDownBoxWrap>
  );
};

export default RegionFilter;

const DropDownBoxWrap = styled.div`
  position: relative;
  width: 200px;
  cursor: pointer;
`;

const DownArrowImage = styled.img`
  width: 50px;
  height: 50px;
`;

const DropDownBox = styled.div`
  display: flex;
  align-items: center;  
  padding: 5px 12px;
  margin-top: 40px;
  margin-bottom: -15px;
  background-color: #fff;
  font-size: 25px;
  cursor: pointer;
`;

const DropDownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 10%;
  width: 80%;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  list-style-type: none;
  padding: 0;
  margin: 0;
  z-index: 1;
  max-height: 200px;
  overflow-y: auto;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  font-size: 1rem;
  list-style: none;
  border-bottom: 1px solid #ccc;
  padding: 1rem;
  margin: 0;
  padding: 10px 16px;
  &:hover {
    background-color: #f0f0f0;
  }
`;