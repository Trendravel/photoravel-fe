import { useState, useEffect } from 'react';
import styled from 'styled-components';
import RegionFilter from '../components/RegionFilter';
import GuideSortFilter from '../components/GuideSortFilter';
import BottomNav from '../components/BottomNav/BottomNav';
import axios from 'axios';

interface GuideData {
  userId: string;
  region: string;
  profileImg: string;
  rating: number;
  review: number;
}

const GuideMatching = () => {
  const [guides, setGuides] = useState<GuideData[]>([]);

  useEffect(() => {
    const getGuidesData = async () => {
      try {
        const response = await axios.get<GuideData[]>('/guides');
        setGuides(response.data);
      } catch (error) {
        console.error('Error fetching guides data:', error);
      }
    };
    getGuidesData();
  }, []);

  const handleSortChange = (sortType: string) => {
    let sortedGuides = [...guides];

    switch (sortType) {
      case '평점 높은순':
        sortedGuides.sort((a, b) => b.rating - a.rating);
        break;
      case '리뷰 많은순':
        sortedGuides.sort((a, b) => b.review - a.review);
        break;
      default:
        break;
    }

    setGuides(sortedGuides);
  };

  return (
    <Container>
      <Title>
        딱! 맞는 여행 가이드를
        <br />소개해 드릴게요!
      </Title>
      <RegionFilter />
      <GuideSortFilter items={['평점 높은순', '리뷰 많은순']} onSelect={handleSortChange} />

      {guides.map((guide) => (
        <GuideContainer>
          <GuideImage src={guide.profileImg} alt={guide.userId} />
          <GuideTextContainer>
            <GuideRegion>{guide.region}</GuideRegion>
            <GuideName>{guide.userId}</GuideName>
            <GuideRating>{guide.rating}</GuideRating>
            <GuideReview>{guide.review}</GuideReview>
          </GuideTextContainer>
        </GuideContainer>
      ))}
      <BottomNav />
    </Container>
  );
};

export default GuideMatching;

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

const GuideContainer = styled.div`
  display: flex;
  padding: 14px 20px;
`;

const GuideImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 10px;
`;

const GuideTextContainer = styled.div`
  display: column;
  margin-left: 10px;
  margin-bottom: 15px;
`;

const GuideRegion = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #000;
  margin-bottom: -5px;
`;

const GuideName = styled.p`
  margin-bottom: 10px;
  font-size: 12px;
  color: #000;
`;

const GuideRating = styled.img`
  margin-bottom: -2px;
  width: 12px;
  height: 12px;
`;

const GuideReview = styled.span`
  margin-left: 5px;
  font-size: 11px;
  color: #ababab;
`;