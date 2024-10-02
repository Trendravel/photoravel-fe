import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { jsonConnection } from '../api/connectBackend';
import { getCookie } from '../api/useCookie';
import back from '../assets/images/back.png';
import pinkstar from '../assets/images/pinkstar.png';
import regionIcon from '../assets/images/regionIcon.png';
import setting from '../assets/images/setting.png';
import star from '../assets/images/star.png';
import { Photographer } from '../types/Photographer';
import { Review } from '../types/Review';

const PhotographerDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [photographer, setPhotographer] = useState<Photographer | null>(location.state.photographer);
  const [photographerId, setPhotographerId] = useState<string|undefined>(photographer?.accountId);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isMatched, setIsMatched] = useState<boolean>(false);

  const currentUserId = getCookie('memberId');
  const currentPhotographerId = getCookie('accountId');
  console.log(currentUserId, currentPhotographerId, photographerId)

  useEffect(() => {
    const fetchPhotographerDetail = async () => {
      try {
        const response = await jsonConnection.get(`/public/photographers/${photographerId}/detail`);

        if (response.data.result.resultCode === 200) {
          setPhotographer(response.data.data);
          setReviews(response.data.data.recentReviewDtos || []);
          console.log('Photographer data:', response.data.data);
        }
      } catch (error) {
        console.error('사진작가 정보를 가져오는 데 실패했습니다:', error);
      }
    };

    const fetchPhotographerReviews = async () => {
      try {
        const response = await jsonConnection.get(`/photographer/${photographerId}/detail/reviews`);

        if (response.data.result.resultCode === 200) {
          setReviews(response.data.data || []);
        }
      } catch (error) {
        console.error('리뷰를 가져오는 데 실패했습니다:', error);
      }
    };

    fetchPhotographerDetail();
    fetchPhotographerReviews();
  }, [photographerId]);

  const handleEditReview = async (review: Review) => {
    const newContent = prompt('수정할 리뷰 내용을 입력하세요:', review.content);

    if (newContent) {
      const reviewUpdateDto = {
        reviewId: review.reviewId,
        reviewType: 'PHOTOGRAPHER',
        content: newContent,
        rating: review.rating,
        typeId: null,
        deleteImages: [],
      };

      try {
        const response = await jsonConnection.patch('/private/review/update', reviewUpdateDto);

        if (response.data.result.resultCode === 200) {
          alert('리뷰가 성공적으로 수정되었습니다.');
          setReviews(prevReviews =>
            prevReviews.map(r => (r.reviewId === review.reviewId ? { ...r, content: newContent } : r))
          );
        } else {
          alert(`오류: ${response.data.result.resultMessage}`);
        }
      } catch (error) {
        console.error('리뷰 수정 중 오류 발생:', error);
        alert('리뷰 수정에 실패했습니다.');
      }
    }
  };

  const handleDeleteReview = async (reviewId: number) => {
    const isConfirmed = window.confirm('정말 리뷰를 삭제하시겠습니까?');

    if (!isConfirmed) {
      return;
    }

    try {
      const response = await jsonConnection.delete(`/private/review/${reviewId}/delete`);

      if (response.data.result.resultCode === 200) {
        alert('리뷰가 삭제되었습니다.');
        setReviews(reviews.filter(review => review.reviewId !== reviewId));
      } else {
        alert(`오류: ${response.data.result.resultMessage}`);
      }
    } catch (error) {
      console.error('리뷰 삭제 중 오류 발생:', error);
      alert('리뷰 삭제에 실패했습니다.');
    }
  };

  const handleMatchingRequest = async () => {
    const memberId = getCookie('memberId');

    const confirmRequest = window.confirm('매칭 요청을 하시겠습니까?');

    if (!confirmRequest) {
      return;
    }

    const matchingRequestDto = {
      memberId,
      photographerId,
    };

    try {
      const response = await jsonConnection.post('/private/matching/pending', matchingRequestDto);

      if (response.data.result.resultCode === 200) {
        alert('매칭 요청이 성공적으로 전송되었습니다.');
        setIsMatched(true);
      } else {
        alert(`오류: ${response.data.result.resultMessage}`);
      }
    } catch (error) {
      console.error('매칭 요청 중 오류 발생:', error);
      alert('매칭 요청에 실패했습니다.');
    }
  };

  const handleRequestButtonClick = () => {
    if (isMatched) {
      navigate('/matchingstatus');
    } else {
      handleMatchingRequest();
    }
  };

  const handleEditProfile = () => {
    navigate('/EditProfile')
  }

  return (
    <Container>
      <BackButtonContainer>
        <BackButton onClick={() => navigate('/photographerlist')}>
          <BackIcon src={back} />
        </BackButton>
      </BackButtonContainer>

      <ContentContainer>
        {photographer && (
          <ProfileInfoContainer>
            <ProfileImageContainer>
              <ProfileImage src={photographer.profileImg} />
            </ProfileImageContainer>

            <ProfileInfo>
              <NameRegionContainer>
                <Name>{photographer.name}</Name>
                <RegionContainer>
                  <RegionIcon src={regionIcon} />
                  {photographer.region}
                </RegionContainer>
                <EditProfileButton onClick={handleEditProfile}>
                  {photographerId === currentUserId && <img src={setting} alt="설정" />}
                </EditProfileButton>
              </NameRegionContainer>
              <Description>{photographer.description}</Description>
              <StatsContainer>
                <Stat>
                  <StatLabel>매칭</StatLabel>
                  <StatCount>{photographer.matchingCount}회</StatCount>
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
                  <StatCount>{photographer.careerYear}년</StatCount>
                </Stat>
              </StatsContainer>
              <RequestQuoteButton onClick={handleRequestButtonClick}>
                {photographerId === currentPhotographerId ? '매칭 현황' : (isMatched ? '매칭 현황' : '매칭 요청')}
              </RequestQuoteButton>
            </ProfileInfo>
          </ProfileInfoContainer>
        )}

        <GuideReviewHeader>
          <Title>
            리뷰 <StyledCount>{reviews.length}</StyledCount>
          </Title>
        </GuideReviewHeader>

        {reviews.map((review, index) => (
          <ReviewCard key={index}>
            <UserInfo>
              <UserDetails>
                <UserNameContainer>
                  <UserName>{review.userName}</UserName>
                </UserNameContainer>
                <RatingContainer>
                  {Array.from({ length: 5 }, (_, i) => (
                    <RatingStar key={i} src={pinkstar} filled={i < Math.round(review.rating)} />
                  ))}
                  <ReviewDate>
                    {new Date(review.createdAt).toLocaleDateString()}
                    {review.updatedAt && <span style={{ marginLeft: '3px', color: '#999' }}>, 수정됨</span>}
                  </ReviewDate>
                </RatingContainer>
              </UserDetails>
              <ReportButtonContainer>
                <ReportButton>신고</ReportButton>
              </ReportButtonContainer>
            </UserInfo>
            <ReviewContent>{review.content}</ReviewContent>
            {review.userId === currentUserId && (
              <ButtonContainer>
                <EditButton onClick={() => handleEditReview(review)}>수정</EditButton>
                <DeleteButton onClick={() => handleDeleteReview(review.reviewId)}>삭제</DeleteButton>
              </ButtonContainer>
            )}
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

const NameRegionContainer = styled.div`
  display: flex;
  align-items: center;
    justify-content: space-between; 
`;

const ProfileImage = styled.img`
  width: 70px; 
  height: 70px;
  border-radius: 50%; 
  border: 4px solid white; 
  margin-left: -8px;
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
  padding: 5px 4px;
  margin-top: 8px;
  margin-left: 10px;
  margin-bottom: 10px;
  font-size: 10px;
  color: #777;
`;

const EditProfileButton = styled.button`
  background-color: transparent; 
  border: none; 
  cursor: pointer;
  display: flex;
  align-items: center; 
  padding: 5px; 
  min-width: 50px; 
  height: 40px; 
  
  img {
    width: 20px; 
    height: 20px;
    margin-left: 5px;
  }

  &:hover {
    opacity: 0.8;
  }
`;

const RegionIcon = styled.img`
  width: 10px;
  margin-right: 6px;
`;

const Description = styled.p`
  font-size: 15px;
  margin-bottom: 12px;
  color: #333;
  line-height: 1.3;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 5px;
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

const StatLabel = styled.div`
  margin-bottom: 5px;
  font-size: 10px;
  color: #888;
`;

const StatCount = styled.div`
  font-size: 17px;
  font-weight: bold;
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
  padding: 15px 15px;
  font-size: 15px;
  cursor: pointer;
  margin-top: 15px;
`;

const BackButtonContainer = styled.div`
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
  width: 20px;
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

const ReviewCard = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 10px;
  background-color: #fff;
  position: relative;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1; 
`;

const UserNameContainer = styled.div`
  display: flex;
  align-items: center; 
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

const ReportButtonContainer = styled.div`
  margin-left: auto;
`;

const ReportButton = styled.button`
  background-color: transparent;
  border: none;
  color: #ccc;
  cursor: pointer;
  font-size: 12px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px; 
`;

const EditButton = styled.button`
  background-color: transparent;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 12px;
  margin-right: 10px; 
`;

const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  color: #ff6b6b;
  cursor: pointer;
  font-size: 12px;
`;