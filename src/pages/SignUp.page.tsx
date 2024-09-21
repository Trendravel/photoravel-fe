import styled from "@emotion/styled";
import { useState } from "react";

import { CenterContainer, FormContainer, TextInput } from "./AddInfo.page";
import { FileLabel, ImageInput, PreviewImage } from "./AddPlace.page";
import { LoginButton } from "./LocalLogin.page";
import { jsonConnection } from "../api/connectBackend";
import { DescriptionArea } from "../components/AddReview";

const PageContainer = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
`;

const TitleContainer = styled.div`
    width: fit-content;
    margin: auto;
`;

const Title = styled.p`
    width: fit-content;
    text-align: left;
    font-size: 16pt;
    font-weight: 500;
    margin: 0 0 0.25em 0;
`;

export const SelectBox = styled.select`
    font-size: 14pt;
    text-align: center;
    padding: 0.25em;
    border: none;
    outline: none;
    border-bottom: 1px solid #cccccc;
    transition: 0.25s border-bottom ease-in;

    &:focus {
        border-bottom: 1px solid #87DEBE;
    }
`;

const SignUp = () => {
    const BACKEND_ADDRESS = import.meta.env.VITE_BACKEND_API_ADDRESS;
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [chosenRegion, setChosenRegion] = useState("");
    const [description, setDescription] = useState("");
    const regions = ["계룡시", "공주시", "금산군", "논산시", "당진시", "보령시", "부여군", "서산시", "서천군", "아산시", "예산군", "청양군", "천안시", "태안군", "홍성군"];
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLLabelElement>) => {
        const files = event.type === 'change' ? event.target.files : event.dataTransfer.files;
        if (files && files.length > 0) {
            const file = files[0];
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setImageSrc(e.target?.result as string);
                };
                reader.readAsDataURL(file);
                setImageFile(file);
            } else {
                alert('이미지 파일만 선택할 수 있습니다.');
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const userData = new FormData();

        userData.append("accountId", id);
        userData.append("password", password);
        userData.append("name", name);
        userData.append("region", chosenRegion);
        userData.append("description", description);
        if (imageFile)
            userData.append("image", imageFile as File);

        try {
            const response = await jsonConnection.post(BACKEND_ADDRESS+`/public/photographers/join`, userData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            console.log("Response:", response.data);
            // 성공적으로 전송된 후 처리할 로직 추가
        } catch (error) {
            console.error("Error sending data:", error);
            // 에러 처리 로직 추가
        }
    };

    return (
        <PageContainer>
            <CenterContainer width="90vw" height="36em">
                <TitleContainer>
                    <Title>포토래블의 파트너,</Title>
                    <Title>사진작가가 되어보세요🤳✨</Title>
                </TitleContainer>
                <FormContainer
                width="" margin="1em auto"
                onSubmit={handleSubmit}
                >
                    <FileLabel
                    width="65%"
                    height="6em"
                    htmlFor="imageUpload"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleFileSelect}
                    >
                        {imageSrc ?
                            (
                            <PreviewImage src={imageSrc} alt="미리보기" />
                            ):
                            (
                            "프로필 사진 설정하기"
                            )
                        }
                    </FileLabel>
                    <ImageInput
                    type="file"
                    accept="image/*"
                    id="imageUpload"
                    onChange={handleFileSelect}
                    />
                    <TextInput
                        type="text"
                        placeholder="아이디"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                    <TextInput
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextInput
                        type="text"
                        placeholder="이름"
                        value={password}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <SelectBox
                        onChange={(e) => setChosenRegion(e.target.value)}
                    >
                        <option value="none">-- 지역을 선택하세요 --</option>
                        {
                            regions.map((val) =>
                                <option key={val} value={val}>{val}</option>
                            )
                        }
                    </SelectBox>
                    <DescriptionArea
                        placeholder="자기소개를 적어주세요! (경력, 수상 이력, 강점 등)"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </FormContainer>
                <LoginButton type="submit">
                    작가 등록하기
                </LoginButton>
            </CenterContainer>
        </PageContainer>
    );
};

export default SignUp;
