import { css } from '@emotion/react';

export const globalStyles = css`

@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap');

  * {
    font-family: "Noto Sans KR", sans-serif;
  }

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #00000066;
    border-radius: 16px;
  }

  ::-webkit-scrollbar-track {
    margin-top: 14px;
    opacity: 0;
  }

`;
