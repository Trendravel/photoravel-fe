import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { jsonConnection } from '../api/connectBackend';
import { getCookie } from '../api/useCookie';
import back from '../assets/images/back.png';
import { MatchingInfo } from '../types/MatchingInfo';

const MatchingStatus: React.FC<{ userRole: 'photographer' | 'user'; accountId: string }> = ({ userRole, accountId }) => {
  const navigate = useNavigate();
  const [statuses, setStatuses] = useState<MatchingInfo[]>([]);

  useEffect(() => {
    const fetchMatchingStatuses = async () => {
      try {
        let response;

        if (userRole === 'photographer') {
          response = await jsonConnection.get(`/private/matching/photographer/${accountId}`);
        } else {
          const memberId = getCookie('userId'); 
          response = await jsonConnection.get(`//private/matching/user/${memberId}`);
        }

        if (response.data.result.resultCode === 200) {
          setStatuses(response.data.data || []);
        } else {
          alert(`오류: ${response.data.result.resultMessage}`);
        }
      } catch (error) {
        console.error('매칭 상태를 가져오는 중 오류 발생:', error);
        alert('매칭 상태를 가져오는 데 실패했습니다.');
      }
    };

    fetchMatchingStatuses();
  }, [userRole, accountId]);

  const handleAccept = async (index: number) => {
    if (window.confirm('이 매칭 요청을 수락하시겠습니까?')) {
      const updatedStatuses = [...statuses];
      const statusToUpdate = updatedStatuses[index];

      const requestBody = {
        memberId: statusToUpdate.memberId,
        photographerId: statusToUpdate.photographerId,
      };

      try {
        const response = await jsonConnection.patch(
          '/private/matching/accept', requestBody
        );

        if (response.data.resultCode === 200) {
          updatedStatuses[index].matchingStatus = 'Accepted';
          setStatuses(updatedStatuses);
          alert('매칭 요청이 수락되었습니다.');
        } else {
          alert(`오류: ${response.data.resultMessage}`);
        }
      } catch (error) {
        console.error('매칭 요청 수락 중 오류 발생:', error);
        alert('매칭 요청 수락에 실패했습니다.');
      }
    }
  };

  const handleReject = async (index: number) => {
    if (window.confirm('이 매칭 요청을 거절하시겠습니까?')) {
      const updatedStatuses = [...statuses];
      const statusToUpdate = updatedStatuses[index];

      const requestBody = {
        memberId: statusToUpdate.memberId,
        photographerId: statusToUpdate.photographerId,
      };

      try {
        const response = await jsonConnection.patch(
          '/private/matching/reject', requestBody
        );

        if (response.data.resultCode === 200) {
          updatedStatuses[index].matchingStatus = 'Rejected';
          setStatuses(updatedStatuses);
          alert('매칭 요청이 거절되었습니다.');
        } else {
          alert(`오류: ${response.data.resultMessage}`);
        }
      } catch (error) {
        console.error('매칭 요청 거절 중 오류 발생:', error);
        alert('매칭 요청 거절에 실패했습니다.');
      }
    }
  };

  const handleComplete = async (index: number) => {
    if (window.confirm('이 매칭 요청을 완료하시겠습니까?')) {
      const updatedStatuses = [...statuses];
      const statusToUpdate = updatedStatuses[index];

      const requestBody = {
        memberId: statusToUpdate.memberId,
        photographerId: statusToUpdate.photographerId,
      };

      try {
        const response = await jsonConnection.patch(
          '/private/matching/complete', requestBody
        );

        if (response.data.resultCode === 200) {
          updatedStatuses[index].matchingStatus = 'Complete';
          setStatuses(updatedStatuses);
          alert('매칭 요청이 완료되었습니다.');
        } else {
          alert(`오류: ${response.data.resultMessage}`);
        }
      } catch (error) {
        console.error('매칭 요청 완료 중 오류 발생:', error);
        alert('매칭 요청 완료에 실패했습니다.');
      }
    }
  };

  const handleCancel = async (index: number) => {
    if (window.confirm('이 매칭 요청을 취소하시겠습니까?')) {
      const updatedStatuses = [...statuses];
      const statusToUpdate = updatedStatuses[index];

      const requestBody = {
        memberId: statusToUpdate.memberId,
        photographerId: statusToUpdate.photographerId,
      };

      try {
        const response = await jsonConnection.patch(
          '/private/matching/cancel', requestBody
        );

        if (response.data.resultCode === 200) {
          updatedStatuses[index].matchingStatus = 'Cancel';
          setStatuses(updatedStatuses);
          alert('매칭 요청이 취소되었습니다.');
        } else {
          alert(`오류: ${response.data.resultMessage}`);
        }
      } catch (error) {
        console.error('매칭 요청 취소 중 오류 발생:', error);
        alert('매칭 요청 취소에 실패했습니다.');
      }
    }
  };

  const handleReviewWrite = () => {
    navigate('/photographerreviewwrite');
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'Pending':
        return '보류 중';
      case 'Accepted':
        return '수락';
      case 'Rejected':
        return '거절';
      case 'Complete':
        return '완료';
      case 'Cancel':
        return '취소';
      default:
        return status;
    }
  };

  return (
    <Container>
      <HeaderContainer>
        <BackButton onClick={() => navigate(-1)}>
          <BackIcon src={back} />
        </BackButton>
        <HeaderText>매칭 현황</HeaderText>
      </HeaderContainer>
      {statuses.length === 0 ? (
        <NoMatchesText>매칭 요청이 없습니다.</NoMatchesText>
      ) : (
        statuses.map((status, index) => (
          <Card key={index} status={status.matchingStatus}>
            <StatusText>회원 ID: {status.memberId}</StatusText>
            <StatusText>사진작가 ID: {status.photographerId}</StatusText>
            <StatusText>상태: {getStatusText(status.matchingStatus)}</StatusText>
            {userRole === 'photographer' ? (
              status.matchingStatus === 'Pending' && (
                <ButtonContainer>
                  <ActionButton onClick={() => handleAccept(index)}>수락</ActionButton>
                  <ActionButton onClick={() => handleReject(index)}>거절</ActionButton>
                </ButtonContainer>
              )
            ) : (
              <>
                {status.matchingStatus === 'Pending' || status.matchingStatus === 'Accepted' || status.matchingStatus === 'Rejected' ? (
                  <ButtonContainer>
                    <ActionButton onClick={() => handleComplete(index)}>완료</ActionButton>
                    <ActionButton onClick={() => handleCancel(index)}>취소</ActionButton>
                  </ButtonContainer>
                ) : (
                  status.matchingStatus === 'Complete' && (
                    <ButtonContainer>
                      <ActionButton onClick={handleReviewWrite}>리뷰 작성</ActionButton>
                    </ButtonContainer>
                  )
                )}
              </>
            )}
          </Card>
        ))
      )}
    </Container>
  );
};

export default MatchingStatus;

const Container = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const BackButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 0.5rem 0rem;
  font-size: 1.3rem;
  color: #000;
  cursor: pointer;
`;

const BackIcon = styled.img`
  width: 25px;
`;

const HeaderText = styled.p`
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  flex: 1;
`;

const Card = styled.div<{ status: string }>`
  background-color: ${({ status }) => (status === 'Accepted' ? '#d4edda' : status === 'Rejected' ? '#f8d7da' : '#fff3cd')};
  border: 1px solid ${({ status }) => (status === 'Accepted' ? '#c3e6cb' : status === 'Rejected' ? '#f5c6cb' : '#ffeeba')};
  border-radius: 8px;
  padding: 15px;
  margin: 10px 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const StatusText = styled.p`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const ActionButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  margin: 0 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

const NoMatchesText = styled.p`
  display: flex; 
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #888;
  margin-top: -100px;
  height: 100vh;
`;