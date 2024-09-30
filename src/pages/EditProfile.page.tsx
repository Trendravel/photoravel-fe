import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../api/useCookie';
import styled from 'styled-components';
import axios from 'axios';
import back from '../assets/images/back.png';
import rightarrow from '../assets/images/rightarrow.png';
import user from '../assets/images/user.png';

const EditProfile = () => {
    const [accountId, setAccountId] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [region, setRegion] = useState('');
    const [description, setDescription] = useState('');
    const [careerYear, setCareerYear] = useState(0);
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const regions = [
        '계룡', '공주', '금산', '논산', '당진',
        '보령', '부여', '서산', '서천', '아산',
        '예산', '청양', '천안', '태안', '홍성'
    ];

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http:///private/photographers/profile', {
                    headers: {
                        'Authorization': `Bearer `,
                    },
                });

                const { accountId, name, region, description, careerYear, image } = response.data;
                setAccountId(accountId);
                setName(name);
                setRegion(region);
                setDescription(description);
                setCareerYear(careerYear);
                setImage(image);
            } catch (error) {
                console.error('프로필 정보를 가져오는 중 오류 발생:', error);
            }
        };

        fetchProfile();
    }, []);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]); // 단일 파일 업로드
    };

    const handleSave = async () => {
        const formData = new FormData();
        formData.append('data', JSON.stringify({
            accountId,
            password,
            name,
            region,
            description,
            careerYear,
        }));
        formData.append('image', image);

        try {
            const response = await axios.patch(
                'http:///private/photographers/update',
                formData,
                {
                    headers: {
                        'Authorization': `Bearer `,
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            console.log('수정 성공:', response.data);
            alert('프로필이 성공적으로 수정되었습니다.');
        } catch (error) {
            console.error('수정 실패:', error);
        }
    };

    return (
        <Container>
            <Header>
                <BackButton onClick={() => navigate(-1)}>
                    <BackIcon src={back} />
                </BackButton>
                <Title>프로필 수정</Title>
                <div></div>
            </Header>

            <ProfileImage src={user} alt="Profile" />

            <Section>
                <Label>기본정보</Label>
                <Input
                    type="text"
                    value={accountId}
                    onChange={(e) => setAccountId(e.target.value)}
                    placeholder="계정 ID"
                />
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호"
                />
            </Section>

            <Section>
                <Label>휴대전화 번호</Label>
                <Input
                    type="text"
                    value={accountId} // 여기에 맞는 상태로 설정
                    onChange={(e) => setAccountId(e.target.value)} // 여기에 맞는 상태로 설정
                    placeholder="010-1234-5678"
                />
            </Section>

            <Section>
                <Label>지역 변경</Label>
                <Select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                >
                    <option value="">지역을 선택하세요 </option>
                    {regions.map((region) => (
                        <option key={region} value={region}>{region}</option>
                    ))}
                </Select>
            </Section>

            <Section>
                <Label>자기소개</Label>
                <Input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="자기소개"
                />
            </Section>

            <Section>
                <DeleteAccount onClick={() => navigate('/accountdelete')}>
                    <span>회원탈퇴</span>
                    <RightArrowIcon src={rightarrow} />
                </DeleteAccount>
            </Section>

            <BottomSection>
                <SaveButton onClick={handleSave}>저장</SaveButton>
            </BottomSection>
        </Container>
    );
};

export default EditProfile;

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

const Section = styled.section`
    margin-bottom: 20px;
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 20px;
`;

const Label = styled.label`
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 8px;
    display: block;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 10px;
`;

const Select = styled.select`
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 10px;
`;

const BottomSection = styled.section`
    margin-top: 20px;  
    display: flex;
    justify-content: center;  
`;

const SaveButton = styled.button`
    background-color: #ff6b6b;
    color: white;
    border: none;
    padding: 16px 40px; 
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    width: 100%;
`;

const ProfileImage = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin: 20px auto; 
    display: block; 
`;

const DeleteAccount = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    padding: 0;

    span {
        font-size: 14px; 
        font-weight: 500;  
    }
`;

const RightArrowIcon = styled.img`
    width: 12px;
    height: 12px;
`;