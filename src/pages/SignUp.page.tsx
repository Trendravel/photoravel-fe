import styled from "@emotion/styled";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { CenterContainer, FormContainer, TextInput } from "./AddInfo.page";
import { FileLabel, ImageInput, PreviewImage } from "./AddPlace.page";
import { LoginButton } from "./PhotographerLogin.page";
import { jsonConnection } from "../api/connectBackend";
import { DescriptionArea } from "../components/AddReview";
import { ApiResponse } from "../types/Common";
import { DuplicatedCheckDto, MemberRegisterRequestDto } from "../types/Login";

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

const InputContainer = styled.div`
    position: relative;
`;

const CheckButton = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    color: white;
    border-radius: 1em;
    padding: 0.5em;
    font-weight: 600;
    background-color: #87DEBE;
`;


const SignUp = () => {
    const BACKEND_ADDRESS = import.meta.env.VITE_BACKEND_API_ADDRESS;

    const navigate = useNavigate();
    const location = useLocation();
    const queryParam = new URLSearchParams(location.search);
    const userType = queryParam.get('for');

    // 회원 공통 변수 - 유저 & 사진작가
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [check, setCheck] = useState([false, false, false]);

    // 일반 회원 변수
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");

    // 사진작가 변수
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

    const activateCheck = (i: number) => {
        if (userType === "user") {
            // 중복확인 배열 매칭을 위한 변수 선언
            const checkTarget = ["email-check", "memberId-check", "nickname-check"];
            const checkVariableTarget = [email, id, nickname];
    
            jsonConnection.get<ApiResponse<DuplicatedCheckDto>>(BACKEND_ADDRESS + `/public/member/${checkVariableTarget[i]}/${checkTarget[i]}`)
                .then((res) => {
                    if (!res.data.data?.duplicated) {
                        setCheck(prevCheck => {
                            const newCheck = [...prevCheck]; // 새로운 배열 생성
                            newCheck[i] = true; // i번째 값을 true로 설정
                            return newCheck;
                        });
                        alert("사용 가능합니다.");
                    } else {
                        alert("중복되었습니다!");
                    }
                })
                .catch((e) => {
                    console.error(e);
                });
        } else if (userType === "photographer") {
            console.log("백엔드 업데이트 시, 사진작가 중복 확인 로직 구현 필요");
        }
    };
    

    // 입력 값의 유효성 검사
    const validateForm = () => {        
        let isValid = true;
        let errors = [];

        if (id.length < 8) {
            isValid = false;
            errors.push("ID는 8자 이상이어야 합니다.");
        }

        if (password.length < 8) {
            isValid = false;
            errors.push("비밀번호는 8자 이상이어야 합니다.");
        }

        if (name.length < 2) {
            isValid = false;
            errors.push("이름은 2글자 이상이어야 합니다.");
        }

        if (userType === "user") {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                isValid = false;
                errors.push("유효한 이메일 형식을 입력하세요.");
            }

            if (nickname.length < 2) {
                isValid = false;
                errors.push("닉네임은 2글자 이상이어야 합니다.");
            }

            if (!(check[0] && check[1] && check[2])) {
                isValid = false;
                errors.push("중복 확인을 해주세요.")
            }
        }

        if (userType === "photographer") {
            if (chosenRegion === "-- 지역을 선택하세요 --") {
                isValid = false;
                errors.push("지역을 선택하세요.");
            }
            if (description.length < 10) {
                isValid = false;
                errors.push("자기소개를 10자 이상 입력하세요.");
            }
            if (!check[0]) {
                isValid = false;
                errors.push("중복 확인을 해주세요.")
            }
        }

        if (!isValid) {
            console.log(errors.join(", "));
        } else {
            console.log("모든 입력이 유효합니다.");
        }

        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (userType === "photographer") {
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
            } catch (e) {
                console.error("Error sending data:", e);
                // 에러 처리 로직 추가
            }
        } else if (userType === "user") {
            if (validateForm()) {
                try {
                    await jsonConnection.post<ApiResponse<MemberRegisterRequestDto>>(BACKEND_ADDRESS+`/public/member/register`, {
                        "memberId": id,
                        "email": email,
                        "password": password,
                        "name": name,
                        "nickname": nickname,
                        "profileImg": "none"
                    })
                    .then(() => {
                        alert("회원가입이 완료되었습니다!");
                        navigate('/login');
                    })
                    .catch((e) => {
                        console.log("err: ", e);
                        // 가입 에러 메시지 출력
                        alert(e.response.data.result.resultMessage);
                    })
                } catch (e) {
                    console.error("Error sending data: ", e);
                }
            }
        }
        
    };

    return (
        
        <PageContainer>
            { // 사진작가 가입 페이지
                (userType === "photographer")?
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
                        <InputContainer>
                            <TextInput
                                type="text"
                                placeholder="아이디"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                                disabled={check[0]}
                            />
                            <CheckButton
                                onClick={(e) => {
                                    e.preventDefault();
                                    activateCheck(0)
                                }}
                            >
                                중복 확인
                            </CheckButton>
                        </InputContainer>
                        <TextInput
                            type="password"
                            placeholder="비밀번호"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextInput
                            type="text"
                            placeholder="이름"
                            value={name}
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
                        <LoginButton type="submit">
                        작가 등록하기
                        </LoginButton>
                    </FormContainer>
                </CenterContainer>
                :<></>
                }
                { // 일반 회원 가입 페이지
                (userType === "user")?
                <CenterContainer width="90vw" height="18em">
                    <TitleContainer>
                        <Title>포토래블의 회원으로,</Title>
                        <Title>사진을 지도에 담아보세요🤳✨</Title>
                    </TitleContainer>
                    <FormContainer
                    width="" margin="1em auto"
                    onSubmit={handleSubmit}
                    >   
                        <InputContainer>
                            <TextInput
                                type="email"
                                placeholder="이메일"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={check[0]}
                            />
                            <CheckButton
                                onClick={(e) => {
                                    e.preventDefault();
                                    activateCheck(0)
                                }}
                            >
                                중복 확인
                            </CheckButton>
                        </InputContainer>
                        <InputContainer>
                            <TextInput
                                type="text"
                                placeholder="아이디"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                                disabled={check[1]}
                            />
                            <CheckButton
                                onClick={(e) => {
                                    e.preventDefault();
                                    activateCheck(1)
                                }}
                            >
                                중복 확인
                            </CheckButton>
                        </InputContainer>
                        <TextInput
                            type="password"
                            placeholder="비밀번호"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextInput
                            type="text"
                            placeholder="이름"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <InputContainer>
                        <TextInput
                            type="text"
                            placeholder="닉네임"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            disabled={check[2]}
                        />
                        <CheckButton
                        onClick={(e) => {
                            e.preventDefault();
                            activateCheck(2)
                        }}
                        >
                            중복 확인
                        </CheckButton>
                        </InputContainer>
                        <LoginButton type="submit">
                            포토래블 가입하기
                        </LoginButton>
                    </FormContainer>
                </CenterContainer>:<></>
            }
            
        </PageContainer>
    );
};

export default SignUp;
