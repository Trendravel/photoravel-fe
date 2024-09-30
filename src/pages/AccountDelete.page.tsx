import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../api/useCookie';
import styled from 'styled-components';
import axios from 'axios';
import back from '../assets/images/back.png';

const AccountDelete = () => {
    const [reason, setReason] = useState('');
    const [isAgreed, setIsAgreed] = useState(false);
    const navigate = useNavigate();

    const token = getCookie('token');
    const accountId = token ? JSON.parse(atob(token.split('.')[1])).accountId : '';
    const photographerId = getCookie('photographerId');

    const handleAccountDelete = async () => {
        if (!isAgreed) { 
            alert("회원 탈퇴 유의사항을 확인하였음에 동의해야 합니다.");
            return;
        }

        try {
            const response = await axios.delete(
                `http:///private/photographers/${photographerId}/delete`,
                {
                    headers: {
                        'Authorization': `Bearer `,
                        'Accept': '*/*',
                    },
                }
            );

            if (response.status === 200) {
                alert("회원탈퇴가 완료되었습니다.");
                navigate('/login');
            } else {
                alert("회원탈퇴에 실패했습니다.");
            }
        } catch (error) {
            console.error("회원탈퇴 요청 중 오류 발생:", error);
            alert("회원탈퇴 요청 중 오류가 발생했습니다.");
        }
    };

    return (
        <Container>
            <Header>
                <BackButton onClick={() => navigate(-1)}>
                    <BackIcon src={back} />
                </BackButton>
                <Title>회원탈퇴</Title>
                <div></div>
            </Header>
            <Message>
                <StrongText>{accountId}님</StrongText><br />
                <NormalText>정말 탈퇴하시겠어요?</NormalText><br />
                <ul>
                    <ListItem>✔️ 지금 탈퇴하시면 매칭 예정이거나 현재 매칭 중인 사진작가를 더 이상 이용하실 수 없게 돼요!</ListItem>
                    <ListItem>✔️ 지금 탈퇴하시면 등록된 장소와 가이드북 정보가 삭제되며, 작성하신 리뷰를 수정하거나 삭제하실 수 없어요. 탈퇴 신청 전에 꼭 확인해 주세요!</ListItem>
                </ul>
            </Message>
            <CheckBox>
                <input
                    type="checkbox"
                    required
                    checked={isAgreed} 
                    onChange={(e) => setIsAgreed(e.target.checked)}
                />
                <span>회원 탈퇴 유의사항을 확인하였음에 동의합니다.</span>
            </CheckBox>
            <ReasonLabel>떠나시는 이유를 알려주세요.</ReasonLabel>
            <ReasonInput
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="서비스 탈퇴 사유에 대해 알려주세요."
            />
            <WithdrawButton onClick={handleAccountDelete}>회원 탈퇴</WithdrawButton>
        </Container>
    );
};

export default AccountDelete;

const Container = styled.div`
    padding: 20px;
    background-color: white;
    height: 100vh;
    display: flex;
    flex-direction: column;
`;

const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
`;

const Title = styled.h1`
    font-size: 18px;
    font-weight: bold;
`;

const BackButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 0.5rem 0rem;
  color: #000;
  cursor: pointer;
`;

const BackIcon = styled.img`
  width: 20px;
`;

const Message = styled.div`
    font-size: 16px;
    margin-bottom: 30px;  

    ul {
        padding-left: 20px;
        margin-top: 10px;
        margin-bottom: 10px;  
    }
`;

const StrongText = styled.div`
    font-size: 20px;  
    font-weight: bold; 
`;

const NormalText = styled.div`
    font-size: 20px;  
`;

const ListItem = styled.li`
    margin-bottom: 10px;  
    font-size: 16px;
    line-height: 1.2;     
`;

const CheckBox = styled.label`
    display: flex;
    align-items: center;
    margin-bottom: 30px;  

    input {
        margin-right: 10px;
    }
`;

const ReasonLabel = styled.label`
    font-size: 16px;
    margin-bottom: 8px;
    display: block;
`;

const ReasonInput = styled.textarea`
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 30px;  
    height: 100px;
`;

const WithdrawButton = styled.button`
    background-color: #ff6b6b;
    color: white;
    border: none;
    padding: 16px 40px; 
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    width: 100%;
`;