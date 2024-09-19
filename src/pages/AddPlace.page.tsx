import styled from "@emotion/styled";
import { useEffect, useState } from "react";

import { TextInput } from "./AddInfo.page";
import SubMap from "../components/SubMap";
import UpperMenu from "../components/UpperMenu";
import { Position } from "../types/Position";

const FixedBox = styled.div`
    position: fixed;
`;

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 6em;
    height: calc(100vh - 6em);
    overflow-y: auto;
`;

const Title = styled.p`
    text-align: center;
    font-weight: 600;
    font-size: 18pt;
    margin-bottom: 0.5em;
`;

const FormContainer = styled.form`
    display: grid;
    justify-contents: center;
    width: 80vw;
    height: 100%;
    margin: auto;
    padding-top: 1em;
    overflow-y: auto;
`;

export const FileLabel = styled.label<{width: string, height: string}>`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    background-color: white;
    border: 0.1em solid #d0d0d0;
    border-radius: 0.5em;
    box-shadow: 0em 0.1em 0.3em #BBBBBB;
    text-align: center;
    font-size: 14pt;
    font-weight: 600;
    cursor: pointer;
    position: relative;

    &:hover {
        border-color: #87DEBE;
    }
`;

export const ImageInput = styled.input`
    display: none;
`;

export const PreviewImage = styled.img`
    max-width: 100%;
    max-height: 100%;
    border-radius: 0.5em;
    margin-top: 0.5em;
`;

const InputBox = styled.input`
    width: 80%;
    display: block;
    border-bottom: 0.05em solid #d0d0d0;
    padding: 0.25em;
    margin: auto;
    margin-top: 0.5em;
    font-size: 12pt;
`;

const DescriptionBox = styled.textarea`
    width: 100%;
    height: 4em;
    display: block;
    border-bottom: 0.05em solid #d0d0d0;
    padding: 0.25em;
    margin: auto;
    margin-top: 0.5em;
    font-size: 12pt;
`;

const Button = styled.button`
    width: 10em;
    height: 2.5em;
    padding: 0.75em;
    margin: 1em auto;
    border-radius: 0.25em;
    background-color: #87DEBE;
    box-shadow: 0em 0.1em 0.3em #BBBBBB;
    color: white;
    font-size: 14pt;
    font-weight: 600;
`;

const AddPlace = () => {
    const [selectedPos, setSelectedPos] = useState<Position>({
        latitude: 0,
        longitude: 0
    });
    const [selectedAddress, setSelectedAddress] = useState("")
    const [imageSrc, setImageSrc] = useState<string | null>(null);

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
            } else {
                alert('이미지 파일만 선택할 수 있습니다.');
            }
        }
    };


    useEffect(() => {
        if (window.kakao) {
            const geocoder = new kakao.maps.services.Geocoder();
            geocoder.coord2Address(selectedPos.longitude, selectedPos.latitude, (res) => {
                setSelectedAddress(res[0].address.address_name.toString())
            })
        }
    }, [selectedPos])

    return (
        <FixedBox>
            <UpperMenu/>
            <PageContainer>
                <Title>📍 장소 등록하기</Title>
                <SubMap pos={selectedPos} setPos={setSelectedPos}/>
                <FormContainer>
                    <FileLabel
                        width="60%"
                        height="6em"
                        htmlFor="imageUpload"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleFileSelect}
                    >
                        {imageSrc ? (
                            <PreviewImage src={imageSrc} alt="미리보기" />
                        ) : (
                            "이미지 등록하기"
                        )}
                    </FileLabel>
                    <ImageInput type="file" id="imageUpload" accept="image/*" onChange={handleFileSelect} />
                    <TextInput type="text"
                    fontSize="12pt"
                    placeholder="장소 이름"
                    />
                    <TextInput type="text"
                    placeholder="주소 (지도 클릭시 자동채움)"
                    fontSize="12pt"
                    value={selectedAddress}
                    disabled
                    />
                    <DescriptionBox placeholder="장소를 설명해주세요!" />
                    <Button type="submit">장소 등록하기</Button>
                </FormContainer>
            </PageContainer>
        </FixedBox>
    );
};

export default AddPlace;
