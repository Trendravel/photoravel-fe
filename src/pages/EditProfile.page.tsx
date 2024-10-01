import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { formDataConnection } from '../api/connectBackend';
import { getCookie } from '../api/useCookie';
import back from '../assets/images/back.png';
import rightarrow from '../assets/images/rightarrow.png';
import user from '../assets/images/user.png';

const EditProfile = () => {
    const [accountId, setAccountId] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [region, setRegion] = useState('');
    const [description, setDescription] = useState('');
    const [careerYear, setCareerYear] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement | null>(null); 

    const regions = [
        '계룡', '공주', '금산', '논산', '당진',
        '보령', '부여', '서산', '서천', '아산',
        '예산', '청양', '천안', '태안', '홍성'
    ];

    useEffect(() => {
        const initialAccountId = getCookie('accountId') || '';
        const initialName = getCookie('name') || '';
        const initialRegion = getCookie('region') || '';
        const initialDescription = getCookie('description') || '';
        const initialCareerYear = getCookie('careerYear') || '0';

        setAccountId(initialAccountId);
        setName(initialName);
        setRegion(initialRegion);
        setDescription(initialDescription);
        setCareerYear(initialCareerYear);
    }, []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0]); 
        } else {
            setImage(null);
        }
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

        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await formDataConnection.patch(
                '/private/photographers/update',
                formData);
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

            <ProfileImageContainer>
                <ProfileImage
                    src={image ? URL.createObjectURL(image) : user}
                    alt="Profile"
                />
                 <AddButton onClick={() => fileInputRef.current?.click()}>
                    +
                </AddButton>
                <Input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                />
            </ProfileImageContainer>

            <Section>
                <Label>기본정보</Label>
                <Input
                    type="text"
                    value={accountId}
                    onChange={(e) => setAccountId(e.target.value)}
                    placeholder="변경할 계정 ID를 적어주세요"
                />
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="변경할 비밀번호를 적어주세요"
                />
            </Section>

            <Section>
                <Label>이름</Label>
                <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="변경할 이름을 적어주세요"
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
                <Label>경력</Label>
                <Input
                    type="number"
                    value={careerYear}
                    onChange={(e) => setCareerYear(e.target.value)}
                    placeholder="경력을 적어주세요 (숫자만)"
                />
            </Section>

            <Section>
                <Label>자기소개</Label>
                <Input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="자기소개를 적어주세요 (수상 이력, 강점 등)"
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

const ProfileImageContainer = styled.div`
    position: relative;
    display: inline-block;
    margin: 20px auto; 
`;

const ProfileImage = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: block; 
`;

const AddButton = styled.button`
    position: absolute;
    bottom: 3px;
    right: 3px; 
    background-color: #999;
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
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