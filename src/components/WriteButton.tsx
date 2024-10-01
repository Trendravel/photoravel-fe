import { MouseEventHandler } from 'react';
import styled from 'styled-components';

import post from '../assets/images/post.png';

interface WriteButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const WriteButton = ({ onClick }: WriteButtonProps) => {
  return (
    <WriteButtonContainer onClick={onClick}>
      <WriteButtonImage src={post} alt="가이드북 작성" />
    </WriteButtonContainer>
  );
};

export default WriteButton;

const WriteButtonContainer = styled.button`
  position: fixed;
  bottom: 30px;
  right: 20px;
  z-index: 9999;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const WriteButtonImage = styled.img`
  width: 55px;
  height: 55px;
`;