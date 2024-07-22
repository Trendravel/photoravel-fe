import styled from 'styled-components';
import { MouseEventHandler } from 'react';
import pencil from '../assets/images/pencil.png';

interface WriteButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const WriteButton = ({ onClick }: WriteButtonProps) => {
  return (
    <WriteButtonContainer onClick={onClick}>
      <WriteButtonImage src={pencil} alt="pencil" />
    </WriteButtonContainer>
  );
};

export default WriteButton;

const WriteButtonContainer = styled.button`
  position: fixed;
  bottom: 100px;
  right: 15px;
  z-index: 9999;
  background-color: #fff;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const WriteButtonImage = styled.img`
  width: 50px;
  height: 50px;
`;