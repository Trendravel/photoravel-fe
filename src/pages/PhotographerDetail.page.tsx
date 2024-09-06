import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import back from '../assets/images/back.png';
import pen from '../assets/images/pen.png';
import pinkstar from '../assets/images/pinkstar.png';
import region from '../assets/images/region.png';
import star from '../assets/images/star.png';

const PhotographerDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { photographer } = location.state;

  const reviews = [
    {
      profileImg: 'https://mblogthumb-phinf.pstatic.net/MjAyMTAxMDVfOTUg/MDAxNjA5ODIyMTAzMjUw.iWi4InBy8sN-JF0yf_3_bvdS0CiB7NVw6tNtX_ZR554g.kJFm4lnX9ulSLmYVk0pPGfog9dn7l4dln8iB9s05Iiwg.JPEG.sj330035/%EC%9D%B8%EC%8A%A4%ED%83%80%ED%94%84%EC%82%AC_(45).jpeg?type=w800',
      userId: '언제든떠나고싶은',
      content: '공항철도도 이용하시고 얼리체크인 활용하시면 정말 편합니다.\n단, 쇼핑일정은 체크인전날에~',
      rating: 3.8,
      date: '2024.03.14',
      edited: true,
    },
    {
      profileImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkdRIE0vre8weS0NsYrGNYn7kbLc1fhp3p_A&s',
      userId: 'hee야웅',
      content: '영어를 많이 아는 편이 아니라 정말 한자로된 지명이나, 그곳의 사진을 보여주는 것이 택시 탈 때 편해요. 은근 식당에서도 영어가 잘 안통하는 곳이 많습니다.',
      rating: 4.3,
      date: '2023.12.19',
      edited: false, 
    },
    {
      profileImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnUFJ7YUdlbmJ5tS82_sn73pJhBvo9UWJhjw&s',
      userId: '혜니',
      content: '생각보다 영어가 안 통해서 택시 탈 때 한자로 된 지명도 알아가는게 좋을 것 같아요!',
      rating: 3.4,
      date: '2023.08.26',
      edited: false, 
    },
  ];

  const handleReviewWrite = () => {
    navigate('/photographerreviewwrite');
  };

  return (
    <Container>
      <ButtonContainer>
        <BackButton onClick={() => navigate(-1)}>
          <BackIcon src={back} />
        </BackButton>
      </ButtonContainer>
      <ContentContainer>
        {photographer && (
          <ProfileInfoContainer>
            <ProfileImageContainer>
              <ProfileImage src={photographer.profileImg} />
            </ProfileImageContainer>
            <ProfileInfo>
              <Name>{photographer.name}</Name>
              <RegionContainer>
                <RegionIcon src={region} />
                {photographer.region}
              </RegionContainer>
              <Description>{photographer.description}</Description>
              <StatsContainer>
                <Stat>
                  <StatLabel>매칭</StatLabel>
                  <StatCount>{photographer.matches}회</StatCount>
                </Stat>
                <Stat>
                  <StatLabel>리뷰</StatLabel>
                  <StatCountContainer>
                    <StatImage src={star} />
                    <StatCount>{photographer.ratingAvg}</StatCount>
                    <ReviewCount>({photographer.reviewCount})</ReviewCount>
                  </StatCountContainer>

                </Stat>
                <Stat>
                  <StatLabel>총 경력</StatLabel>
                  <StatCount>{photographer.experience}년</StatCount>
                </Stat>
              </StatsContainer>
              <RequestQuoteButton>매칭 요청</RequestQuoteButton>
            </ProfileInfo>
          </ProfileInfoContainer>
        )}

        <GuideReviewHeader>
          <Title>
            리뷰 <StyledCount>{reviews.length}</StyledCount>
          </Title>
          <ReviewButtonContainer>
            <ReviewWriteButton onClick={handleReviewWrite}>
              <ReviewWriteIcon src={pen} />
            </ReviewWriteButton>
          </ReviewButtonContainer>
        </GuideReviewHeader>

        {reviews.map((review, index) => (
          <ReviewCard key={index}>
            <UserInfo>
              <UserProfileImg src={review.profileImg} />
              <UserDetails>
                <UserName>{review.userId}</UserName>
                <RatingContainer>
                  {Array.from({ length: 5 }, (_, i) => (
                    <RatingStar key={i} src={pinkstar} filled={i < Math.round(review.rating)} />
                  ))}
                  <ReviewDate>
                    {review.date}
                    {review.edited && <span style={{ marginLeft: '3px', color: '#999' }}>, 수정됨</span>}
                  </ReviewDate>
                </RatingContainer>

              </UserDetails>
            </UserInfo>
            <ReviewContent>{review.content}</ReviewContent>
          </ReviewCard>
        ))}
      </ContentContainer>
    </Container>
  );
};

export default PhotographerDetail;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const ContentContainer = styled.div`
  display: flex;
  padding: 20px; 
  flex-direction: column;
  background-color: #f5f5f5;
  min-height: 100vh;
  position: relative;
`;

const ProfileInfoContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
  background-color: white;
  padding: 30px 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const ProfileImageContainer = styled.div`
  margin-top: -10px;
  margin-right: 10px;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileImage = styled.img`
  width: 70px; 
  height: 70px;
  border-radius: 50%; 
  border: 4px solid white; 
`;

const Name = styled.h2`
  font-size: 19px;
  font-weight: bold;
  color: #333;
`;

const RegionContainer = styled.div`
  display: flex;
  align-items: center;
  background: #f0f0f0;
  border-radius: 5px;
  width: 50px;  
  padding: 4px 5px;
  margin-top: 8px;
  margin-bottom: 10px;
  font-size: 10px;
  color: #777;
`;

const RegionIcon = styled.img`
  width: 10px;
  margin-right: 5px;
`;

const Description = styled.p`
  font-size: 14px;
  margin-bottom: 12px;
  color: #333;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
`;

const Stat = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center; 
`;

const StatCountContainer = styled.div`
  display: flex;
  align-items: center; 
`;

const ReviewCount = styled.div`
  font-size: 12px;
  color: #bbb;
  margin-left: 5px;
`;

const StatCount = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const StatLabel = styled.div`
  margin-bottom: 5px;
  font-size: 12px;
  color: #888;
`;

const StatImage = styled.img`
  width: 16px;
  margin-right: 5px;
`;

const RequestQuoteButton = styled.button`
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 12px 15px;
  font-size: 14px;
  cursor: pointer;
  margin-top: 13px;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  margin-left: 10px;
  width: 30px;
  height: 30px;
  font-size: 30px;
  cursor: pointer;
  color: #000;
`;

const BackButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 0.5rem 0.8rem;
  font-size: 1.3rem;
  color: #000;
  cursor: pointer;
`;

const BackIcon = styled.img`
  width: 25px;
`;

const GuideReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  margin-bottom: -5px;
`;

const StyledCount = styled.span`
  color: #ff6b6b;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin-left: -10px;
`;

const ReviewButtonContainer = styled.div`
  width: 20px;
  height: 20px;
  margin-bottom: 15px;
  font-size: 30px;
  cursor: pointer;
  color: #000;
  opacity: 1;
`;

const ReviewWriteButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #000;
`;

const ReviewWriteIcon = styled.img`
  margin-top: 7px;
  width: 20px;
`;

const ReviewCard = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
  background-color: #fff;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const UserProfileImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 12px;
  margin-bottom: 5px;
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column; 
`;

const UserName = styled.span`
  font-weight: bold;
  font-size: 14px;
	text-align: left; 
`;

const RatingStar = styled.img<{ filled: boolean }>`
  width: 10px;
  height: 10px;
  opacity: ${({ filled }) => (filled ? 1 : 0.5)};
  filter: ${({ filled }) => (filled ? 'none' : 'grayscale(100%)')};  
  margin-right: 2px;
`;

const RatingContainer = styled.div`
  display: flex;
  margin-top: 5px;
`;

const ReviewDate = styled.span`
  margin-top: 0.5px;
  margin-left: 10px;
    margin-right: -20px;
  font-size: 10px;
  color: #999;
`;

const ReviewContent = styled.p`
  margin: 8px 0;
  line-height: 1.5;
  font-size: 13px;
  text-align: left; 
`;