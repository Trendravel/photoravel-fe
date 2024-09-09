import styled from "@emotion/styled";

import NoImage from "../assets/—Pngtree—no image vector illustration isolated_4979075.png";

const SpotContainer = styled.div`
    padding: 0.5em 0.25em 0.5em 0.25em;
    box-shadow: 0 1px 1px 1px #f0f0f0;
    border-radius: 0.5em;
    border: 1pt solid #cccccc;
    height: 11em;
`;

const ImageContainer = styled.div`
    position: relative;
    width: 10em;
    height: 10em;
`;

const SpotImage = styled.img`
    position: absolute;
    top: 0;
    right: 0;
    transforn: translate(50, 50);
    width: 100%;
    height: 100%;
    object-fit: cover;
    margin: auto;
`;

const ContentContainer = styled.div``;

const SpotTitle = styled.p`
    text-align: center;
    font-weight: 500;
`;

const SpotCard = () => {
    return (
        <SpotContainer>
            <ImageContainer>
                <SpotImage src={NoImage}/>
            </ImageContainer>
            <ContentContainer>
                <SpotTitle>
                    스팟 이름
                </SpotTitle>
            </ContentContainer>
        </SpotContainer>
    )
}

export default SpotCard;