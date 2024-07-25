import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';

const BottomSheet = styled.div<{top: number, height:string, isAnimated:boolean}>`
  z-index: 20;
  position: absolute;
  left: 0;
  right: 0;
  top: ${(props) => props.top}px;
  background-color: white;
  padding-top: 16px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0 -2px 3.84px rgba(0, 0, 0, 0.25);
  transition: ${(props) => props.isAnimated? "top 0.2s ease-in-out" : ""};
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
    padding: 1.5em 2em 2em 1.5em;
`;

const Title = styled.p`
    font-size: 24px;
    font-weight: 600;
`;

const SearchTab = styled.div`
    display: flex;
    align-items: center;
`;

const SearchInput = styled.input`
    border-bottom: 1px solid #E2E8F0;
    padding: 0.25em;
    font-size: 16px;
`;

const SearchIcon = styled.img`
    width: 1.25em;
    height: 1.25em;
    padding: 0;
    margin: 0;
`;

const BottomSheetUI = () => {
    const [position, setPostion] = useState(window.innerHeight-75);
    const isDragging = useRef(false);
    const startYPos = useRef(0);
    const isAnimated = useRef(false);

    const handleHover = (e: React.TouchEvent<HTMLDivElement>) => {
        isDragging.current = true;
        startYPos.current = e.touches[0].clientY - position;

    }

    const handleMove = (e: TouchEvent) => {
        if (isDragging.current) {
            const newPosition = e.touches[0].clientY - startYPos.current;

            // 상한과 하한을 설정합니다.
            const minPosition = 75; // 최소 위치값 (상한)
            const maxPosition = window.innerHeight - 75; // 최대 위치값 (하한), 100은 컴포넌트의 높이

            // 위치값을 제한합니다.
            const limitedPosition = Math.max(minPosition, Math.min(newPosition, maxPosition));
            setPostion(limitedPosition);
        }

    }

    const handleTouchEnd = () => {
        isDragging.current = false;
        if (position < window.innerHeight/2) {
            isAnimated.current = true;
            setPostion(75);
            setTimeout(()=>{
                isAnimated.current = false;
            }, 200);
        } else {
            isAnimated.current = false;
        }
        console.log("touch end")
    };

    useEffect(() => {
        window.addEventListener('touchmove', handleMove);
        window.addEventListener('touchend', handleTouchEnd);

        return () => {
            window.removeEventListener('touchmove', handleMove);
        window.removeEventListener('touchend', handleTouchEnd);
        }
    }, [position])
  return (
    <BottomSheet
        onTouchStart={handleHover}
        height="90%" // BottomSheet의 높이를 90%로 설정
        top={position}
        isAnimated={isAnimated.current}
    >
        <Handle />
        <Header>
            <Title>장소 찾기</Title>
            <SearchTab>
                <SearchInput
                placeholder="여행지를 입력하세요"
                />
                <SearchIcon
                    src="https://cdn-icons-png.freepik.com/256/141/141944.png?semt=ais_hybrid"
                />
            </SearchTab>
            
        </Header>
    </BottomSheet>
  );
};

export default BottomSheetUI;