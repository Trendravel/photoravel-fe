import { css } from '@emotion/react';

export const globalStyles = css`

@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap');

@font-face {
    font-family: 'Freesentation-9Black';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2404@1.0/Freesentation-9Black.woff2') format('woff2');
    font-weight: 900;
    font-style: normal;
}

  p, a {
    font-family: 'Noto Sans KR', sans-serif;
  }

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #00000066;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-track {
    margin-top: 4px;
    opacity: 0;
  }

`;
