import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

import { spotMultiRead } from "../types/Spot";


const SpotCardContainer = styled.div`
    padding: 0.5em 0.25em 0.5em 0.25em;
    border-radius: 0.5em;
    border: 1px solid #f0f0f0;
`;

const SpotInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const SpotTitle = styled.p`
    padding: 0.25em 0 0 0.25em;
    font-weight: 500;
    font-size: 14pt;
    text-align: left;
`;

const MultipleImageContainer = styled.div`
    display: flex;
    margin-top: 0.5em;
    padding: 0.25em;
    width: 95%;
    height: 5em;
    overflow-x: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
`;

const SpotImageContainer = styled.div`
    position: relative;
    flex-shrink: 0;
    width: 5em;
    height: 5em;
    margin-right: 0.1em;
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

const MediumSpotCard = (props: {data: spotMultiRead}) => {

    const spotData = props.data;

    const navigate = useNavigate();
    const queryParam = new URLSearchParams(location.search);
    const placeId = queryParam.get('spotfor');

    return (
        <SpotCardContainer
            onTouchStart={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
            onClick={() => { 
                navigate(`/place?spotfor=${placeId}&id=${spotData.spotId}`)
            }}
        >
            <SpotInfo>
                <SpotTitle>
                    {spotData.title}
                </SpotTitle>
                <p style={{marginRight: "0.25em"}}>
                    👀 {spotData.views}
                </p>
            </SpotInfo>
            
            <MultipleImageContainer>
                {
                    spotData.images.map((img:string, i:number) =>
                        <SpotImageContainer key={i}>
                            <SpotImage src={img}/>
                        </SpotImageContainer>
                    )
                }
                
            </MultipleImageContainer>
        </SpotCardContainer>
    )
}

export default MediumSpotCard;