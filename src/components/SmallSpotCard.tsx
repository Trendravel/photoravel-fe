import styled from "@emotion/styled";

import { spotMultiRead } from "../types/Spot";

const SpotContainer = styled.div`
    flex-shrink: 0;
    padding: 0.5em 0.25em 0.5em 0.25em;
    box-shadow: 0 1px 1px 1px #f0f0f0;
    width: 8em;
    height: 10.5em;
    border-radius: 0.5em;
    border: 1pt solid #cccccc;
`;

const ImageContainer = styled.div`
    position: relative;
    width: 8em;
    height: 8em;
`;

const SpotImage = styled.img`
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50, 50);
    width: 100%;
    height: 100%;
    object-fit: cover;
    margin: auto;
`;

const ContentContainer = styled.div``;

const SpotTitle = styled.p`
    margin-top: 0.2em;
    text-align: center;
    font-weight: 500;
`;

const SpotViews = styled.p`
    margin: 0.1em;
    text-align: right;
`;

const SmallSpotCard = (props: {data: spotMultiRead}) => {
    return (
        <SpotContainer>
            <ImageContainer>
                <SpotImage src={props.data.images[0]}/>
            </ImageContainer>
            <ContentContainer>
                <SpotTitle>
                    {props.data.title}
                </SpotTitle>
                <SpotViews>
                👀 {props.data.views}
                </SpotViews>
            </ContentContainer>
        </SpotContainer>
    )
}

export default SmallSpotCard;