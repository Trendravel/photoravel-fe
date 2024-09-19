import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';

import AddReview from './AddReview';
import LocationDetail from './LocationDetail';
import LocationInfo, { Description, LocationImage, Rate, RatingArea } from './LocationInfo';
import ReviewDetail from './ReviewDetail';
import SingleSpotDetail from './SingleSpotDetail';
import SpotDetail from './SpotDetail';
import SpecificLocationInfo from '../api/testdata/locationSingleRead.json'
import { MultipleLocation } from '../types/Location';

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
    height: 70vh;
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

export const CategoryButton = styled.button<{color:string}>`
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

const BottomSheetUI = (props: { data: MultipleLocation[] }) => {
    // 기본 정의
    const locationData = props.data;
    const specificData = SpecificLocationInfo;
    const [position, setPostion] = useState(window.innerHeight-75);

    // 라우팅 처리를 위한 정의
    const navigate = useNavigate();
    const location = useLocation();
    const queryParam = new URLSearchParams(location.search);
    const id = queryParam.get("id");
    const keyword = queryParam.get("keyword");
    const reviewId = queryParam.get("reviewfor");
    const spotId = queryParam.get("spotfor");
    const reviewTargetId = queryParam.get("addreviewto");
    const [isFullyOpened, setIsFullyOpened] = useState(false);

    // 검색 처리를 위한 정의
    const [searchKeyword, setSearchKeyword] = useState("");
    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(event.target.value)
    }

    const doSearch = () => {
        if (searchKeyword != "")
            navigate(`/search?keyword=${searchKeyword}`);
        else 
            navigate('/');
    }


    // 설명 간략화 메소드
    const descriptionLimit = 50;
    let simplifiedDescription = "";

    const specificLocation = specificData.find((item:MultipleLocation) => item.locationId === Number(id));
    if (specificLocation && specificLocation.description.length >= descriptionLimit) {
        simplifiedDescription = specificLocation.description.slice(0, descriptionLimit+1);
        simplifiedDescription += " ...";
    } else if (specificLocation) {
        simplifiedDescription = specificLocation.description;
    }

    // 바텀시트 터치 이벤트 메소드
    useEffect(() => {
        setPostion(window.innerHeight - 75); // 초기 위치 설정
    }, []);

    useEffect(() => { // 경우에 따른 위치 초기설정
        console.log("id: ", id, ", spot: ", spotId);
        if (id && !spotId) { // 스팟이 아닌 장소 간략소개
            setPostion(window.innerHeight - 175);
        } else if (reviewId || spotId || reviewTargetId) { // 리뷰나 스팟은 최대
            setPostion(100);
        } else { // 아니면 최소 높이
            setPostion(window.innerHeight - 75);
        } 
    }, [id, spotId, reviewId, reviewTargetId])
    
    const isDragging = useRef(false);
    const startYPos = useRef(0);
    const touchYPos = useRef(0);
    const isAnimated = useRef(false);

    const handleHover = (e: React.TouchEvent<HTMLDivElement>) => {
        isDragging.current = true;
        startYPos.current = e.touches[0].clientY - position;
        touchYPos.current = e.touches[0].clientY;
    }

    const handleMove = (e: TouchEvent) => {
        if (isDragging.current) {
            const newPosition = e.touches[0].clientY - startYPos.current;

            // 상한과 하한을 설정합니다.
            const minPosition = 100; // 최소 위치값 (상한)
            const maxPosition = window.innerHeight - 75; // 최대 위치값 (하한), 100은 컴포넌트의 높이

            const maxPosition2 = window.innerHeight - 175

            // 위치값을 제한합니다.
            const limitedPosition = Math.max(minPosition, Math.min(newPosition, (id && !spotId)? maxPosition2: maxPosition));
            setPostion(limitedPosition);
        }

    }

    const handleTouchEnd = () => {
        isDragging.current = false;
        const currentYPos = position;
        const isSamePosition = Math.abs(currentYPos - touchYPos.current) < 10; // 터치 시 이동 좌표 차이를 비교

        if (isSamePosition) {
            return; // 위치가 동일할 경우 처리하지 않음
        }

        if (position < window.innerHeight/2 && !id) { // 장소찾기 바텀시트 이벤트
            if (isFullyOpened) {
                setIsFullyOpened(false);
                isAnimated.current = true;
                setPostion(window.innerHeight - 75);
                setTimeout(()=>{
                    isAnimated.current = false;
                }, 200);
            } else if (startYPos.current != position && position != 100) {
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
                (!id && !reviewId && !spotId && !reviewTargetId) && <>
                    <Header>
                    <Title>장소 찾기</Title>
                    <SearchTab>
                        <SearchInput
                            placeholder="여행지를 입력하세요"
                            value={searchKeyword}
                            onChange={handleInputChange}
                            onKeyDown={(e) => {
                                if (e.key === "Enter")
                                    doSearch()
                            }}
                            onTouchStart={(e) => e.stopPropagation()}
                        />
                        <SearchIcon
                            src="https://cdn-icons-png.freepik.com/256/141/141944.png?semt=ais_hybrid"
                            onClick={() => doSearch()}
                        />
                    </SearchTab>
                    </Header>
                    <CategoryContainer
                        onTouchStart={handleContainerTouch}
                        onTouchEnd={handleContainerTouch}
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
                    <LocationListContainer
                    onTouchStart={handleContainerTouch}
                    onTouchEnd={handleContainerTouch}
                    >
                        {
                            location.pathname === "/" &&
                            locationData.map((data) => 
                                <LocationInfo
                                    key={data.locationId}
                                    data={data}
                                />
                            )
                        }
                        {
                            location.pathname === "/search" &&
                            locationData.map((data) =>
                                (data.name.includes(keyword!))?
                                    <LocationInfo
                                        key={data.locationId}
                                        data={data}
                                    />:
                                    <></>
                            )
                        }
                    </LocationListContainer>
                </>
            }
            { // 특정 장소 조회 (간략 보기)
                (!spotId && id) && specificLocation && (position === window.innerHeight - 175) &&
                <LocationContainer
                    onTouchStart={handleContainerTouch}
                    onTouchEnd={handleContainerTouch}
                >
                    <LocationImage src={specificLocation.images[0]}/>
                    <InfoContainer>
                        <PlaceName>{specificLocation.name}</PlaceName>
                        <RatingArea>
                            <Rating
                                initialValue={specificLocation.ratingAvg}
                                readonly={true}
                                size={20}
                                allowFraction
                            />
                            <Rate>
                                {specificLocation.ratingAvg}
                                ({specificLocation.reviewCounts === 99? "99+":specificLocation.reviewCounts})
                            </Rate>
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
            { // 특정 장소 조회 (상세 보기)
                (!spotId && id) && specificLocation && (position < window.innerHeight - 175) &&
                <LocationDetail
                    data={specificLocation}
                />
            }
            {
                (reviewId && !reviewTargetId) &&
                <ReviewDetail/>
            }
            {
                (spotId && !id && !reviewId && !reviewTargetId) &&
                <SpotDetail/>
            }
            {
                (spotId && id) &&
                <SingleSpotDetail/>
            }
            {
                (reviewTargetId) &&
                <AddReview/>
            }   
        </BottomSheet>
    );
};

export default BottomSheetUI;