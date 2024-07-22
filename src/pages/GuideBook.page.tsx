import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import WriteButton from '../components/WriteButton';
import GuideBookSortFilter from '../components/GuideBookSortFilter';
import BottomNav from '../components/BottomNav/BottomNav';
import "../components/BottomNav/FontAwesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios, { AxiosError } from 'axios';

interface GuideBookData {
    guidebook_id: number;
    title: string;
    user_id: string;
    image: string;
    views: number;
    createdAt: string;
    updatedAt: string;
}

const GuideBook = () => {
    const navigate = useNavigate();

    const handleWriteButtonClick = () => {
        navigate('/guidebookwrite');
    };
    const [guidebooks, setGuidebooks] = useState<GuideBookData[]>([]);

    useEffect(() => {
        const getGuidebooks = async () => {
            try {
                const response = await axios.get('/guidebooks');
                setGuidebooks(response.data.data);
            } catch (error: unknown) {
                if (error instanceof AxiosError) {
                    if (error.response && error.response.status === 400) {
                        handleBadRequest(error.response.data.result.code, error.response.data.result.message);
                    } else if (error.response && error.response.status === 404) {
                        handleNotFound(error.response.data.result.code, error.response.data.result.message);
                    } else {
                        console.error(error);
                    }
                } else {
                    console.error(error);
                }
            }
        };
        getGuidebooks();
    }, []);

    const handleBadRequest = (code: number, message: string) => {
        alert(`Bad Request (Code: ${code}): ${message}`);
    };

    const handleNotFound = (code: number, message: string) => {
        alert(`Not Found (Code: ${code}): ${message}`);
    };

    const handleSortChange = (sortType: string) => {
        let sortedGuides = [...guidebooks];

        switch (sortType) {
            case '최근 작성된 순':
                sortedGuides.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                break;
            case '조회수 높은순':
                sortedGuides.sort((a, b) => b.views - a.views);
                break;
            default:
                break;
        }

        setGuidebooks(sortedGuides);
    };

    return (
        <Container>
            <Title>
                딱! 맞는 포토스팟을
                <br />추천해 드릴게요!
            </Title>

            <SearchBarContainer>
                <SearchInput placeholder="가고싶은 여행지를 입력해 보세요." />
                <FontAwesomeIcon icon="search" />
            </SearchBarContainer>
            <GuideBookSortFilter items={['최근 작성된 순', '조회수 높은순']} onSelect={handleSortChange} />

            {guidebooks.map((guidebook) => (
                <PostContainer key={guidebook.guidebook_id}>
                    <PostImage src={`data:image/jpeg;base64,${guidebook.image}`} alt={guidebook.title} />
                    <PostTextContainer>
                        <PostTitle>{guidebook.title}</PostTitle>
                        <PostUser>{guidebook.user_id}</PostUser>
                    </PostTextContainer>
                </PostContainer>
            ))}

            <WriteButton onClick={handleWriteButtonClick} />
            <BottomNav />
        </Container>
    );
};

export default GuideBook;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px 0px;
`;

const Title = styled.h1`
  font-family: GmarketSansBold;
  font-size: 30px;
  line-height: 1.5;
  text-align: center;
`;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f2f2f2;
  border-radius: 50px;
  padding: 10px 20px;
  width: 70%;
  color: #aaa;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  background-color: transparent;
  font-size: 14px;
  font-family: 'GmarketSansBold';
  color: #000;
`;

const PostContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 20px 20px;
`;

const PostImage = styled.img`
    width: 70px;
    height: 70px;
    border-radius: 20px;
`;

const PostTextContainer = styled.div`
    display: column;
    margin-bottom: 17px;
    margin-left: 20px;
`;

const PostTitle = styled.p`
    font-size: 18px;
    cursor: pointer;
    color: #000;
    margin-bottom: 6px;
`;

const PostUser = styled.span`  
    font-size: 14px;
    color: #000;
    margin-left: 2px;
`;