import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';

import LocationInfo, { Description, LocationImage, Rate, RatingArea } from './LocationInfo';
import { Location } from '../types/Location';



const BottomSheet = styled.div<{top: number, height:string, isAnimated:boolean}>`
  z-index: 10;
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
    padding: 1.5em 2em 0.75em 1.5em;
    align-items: center;
`;

const Title = styled.p`
    font-size: 22px;
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

const LocationListContainer = styled.div`
    margin-top: 0.5em;
    padding: 0.5em 1.5em 0.5em 1.5em;
    overflow-y: scroll;
    height: 72vh;
`;

const LocationContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 0.5em;
    padding: 0.25em 1.5em 0.5em 1.5em;
`;

const CategoryContainer = styled.div`
    display: flex;
    overflow-x: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    width: 90vw;
    padding: 0.25em 0;
    margin: auto;
    height: 2em;
    white-space: nowrap;


    &::-webkit-scrollbar {
        display: none;
    }
`;

const PlaceName = styled.p`
    text-align: left;
    font-weight: 500;
    font-size: 13pt;
    margin-bottom: 0.1em;
    color: #0000EE;
`;

const InfoContainer = styled.div`
    display: block;
    text-align: left;
    padding: 0.1em 0.5em 0.1em 0.75em;
`;

const CategoryButton = styled.button<{color:string}>`
    margin: 0 0.5em 0 0;
    font-weight: 600;
    padding: 0.25em 1em 0.25em 1em;
    border-radius: 2em;
    background-color: ${(props) => props.color};
    color: white;
    box-shadow: 0.1em 0.1em 0.2em #BBBBBB;
`;

const NavigateButton = styled.button`
    margin-top: 0.5em;
    font-weight: 600;
    padding: 0.25em 1em 0.25em 1em;
    border-radius: 2em;
    background-color: #A3AEDC;
    color: white;
    box-shadow: 0.1em 0.1em 0.2em #BBBBBB;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row-reverse;
`;

const BottomSheetUI = (props: { data: Location[] }) => {
    // 기본 정의
    const locationData = props.data;
    const [position, setPostion] = useState(window.innerHeight-75);

    // 라우팅 처리를 위한 정의
    const navigate = useNavigate();
    const location = useLocation();
    const queryParam = new URLSearchParams(location.search);
    const id = queryParam.get("id");
    const [isFullyOpened, setIsFullyOpened] = useState(false);

    const descriptionLimit = 50;
    let simplifiedDescription = "";

    const specificLocation = locationData.find((item:Location) => item.locationId === Number(id));
    if (specificLocation && specificLocation.description.length >= descriptionLimit) {
        simplifiedDescription = specificLocation.description.slice(0, descriptionLimit+1);
        simplifiedDescription += " ...";
    } else if (specificLocation) {
        simplifiedDescription = specificLocation.description;
    }

    useEffect(() => {
        setPostion(window.innerHeight - 75); // 초기 위치 설정
    }, []);

    useEffect(() => {
        if (id) {
            setPostion(window.innerHeight - 175);
        } else {
            setPostion(window.innerHeight - 75);
        }
    }, [id])
    
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
            const minPosition = 100; // 최소 위치값 (상한)
            const maxPosition = window.innerHeight - 75; // 최대 위치값 (하한), 100은 컴포넌트의 높이

            const maxPosition2 = window.innerHeight - 175

            // 위치값을 제한합니다.
            const limitedPosition = Math.max(minPosition, Math.min(newPosition, id? maxPosition2: maxPosition));
            setPostion(limitedPosition);
        }

    }

    const handleTouchEnd = () => {
        isDragging.current = false;

        if (position < window.innerHeight/2 && !id) { // 장소찾기 바텀시트 이벤트
            if (isFullyOpened) {
                setIsFullyOpened(false);
                isAnimated.current = true;
                setPostion(window.innerHeight - 75);
                setTimeout(()=>{
                    isAnimated.current = false;
                }, 200);
            } else if (startYPos.current != position) {
                setIsFullyOpened(true);
                isAnimated.current = true;
                setPostion(100);
                setTimeout(()=>{
                    isAnimated.current = false;
                }, 200);
            }
        } else {
            isAnimated.current = false;
        }

        if (position < window.innerHeight - 175 && id) { // 상세정보 바텀시트 이벤트
            if (isFullyOpened) {
                isAnimated.current = true;
                setPostion(window.innerHeight - 175);
                setTimeout(()=>{
                    isAnimated.current = false;
                }, 200);
                setIsFullyOpened(false);
            } else {
                setIsFullyOpened(true);
                isAnimated.current = true;
                setPostion(100);
                setTimeout(()=>{
                    isAnimated.current = false;
                }, 200);
            }
        } 
    };

    const handleContainerTouch = (e: React.TouchEvent) => {
        e.stopPropagation(); // 상위 이벤트 전파 방지
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
            height="88vh" // BottomSheet의 높이를 90%로 설정
            top={position}
            isAnimated={isAnimated.current}
        >
            <Handle />
            { // 장소 찾기
                !id && <>
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
                    <CategoryContainer
                        onTouchStart={handleContainerTouch}
                    >
                        <CategoryButton color={"#ff808a"}>
                            🔥 8월의 인기장소
                        </CategoryButton>
                        <CategoryButton color={"#87debe"}>
                            ⛱️ 여유로운 여행지
                        </CategoryButton>
                        <CategoryButton color={"#a3aedc"}>
                            🌊 액티비티 여행지
                        </CategoryButton>
                        <CategoryButton color={"#fcae69"}>
                            📱 인스타 속 그 장소!
                        </CategoryButton>
                    </CategoryContainer>
                    <LocationListContainer>
                        {
                            locationData.map((data) => 
                                <LocationInfo
                                    key={data.locationId}
                                    data={data}
                                />
                            )
                        }
                    </LocationListContainer>
                </>
            }
            { // 특정 장소 조회
                id && specificLocation && (position === window.innerHeight - 175) && // 간략 보기
                <LocationContainer>
                    <LocationImage src={specificLocation.images[0]}/>
                    <InfoContainer>
                        <PlaceName>{specificLocation.name}</PlaceName>
                        <RatingArea>
                            <Rating
                                initialValue={specificLocation.ratingAvg}
                                readonly={true}
                                size={20}
                            />
                            <Rate>{specificLocation.ratingAvg}(99+)</Rate>
                        </RatingArea>
                        <Description>
                            { simplifiedDescription }
                        </Description>
                        <ButtonContainer>
                            <NavigateButton
                                onClick={() => {
                                    window.location.href = `https://map.kakao.com/link/to/${specificLocation.name},${specificLocation.latitude},${specificLocation.longitude}`;
                                }}
                            >
                                길안내
                            </NavigateButton>
                        </ButtonContainer>
                    </InfoContainer>
                </LocationContainer>
            }
            {
                id && specificLocation && (position < window.innerHeight - 175) &&
                <LocationContainer>
                    장소 상세보기
                </LocationContainer>
            }
                
        </BottomSheet>
    );
};

export default BottomSheetUI;