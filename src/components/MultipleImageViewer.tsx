import styled from "@emotion/styled";
import { useState } from "react";

const ViewerContainer = styled.div`
    width: 100%;
    position: relative;
    display: inline-block;
    background-color: #F0F0F0;
`;

const ImageContainer = styled.div<{height: string}>`
    position: relative;
    width: 100%;
    height: ${(props) => props.height};
`;

const ImageViewer = styled.img`
    position: absolute; 
    top: 0;
    right: 0;
    transform: translate(50, 50);
    width: 100%;
    height: 100%;
    object-fit: cover;
    margin: auto;
`
const PMButton = styled.button<{left: string, right: string}>`
    position: absolute;
    color: white;
    z-index: 1;
    padding: 0.75em;
    top: 40%;
    left: ${(props) => props.left};
    right: ${(props) => props.right};
    font-size: 14pt;
    font-weight: 900;
`;

const MultipleImageViewer = (props: {height: string, src: string[]}) => {
    const imageSrc = props.src;
    const maxIndex = props.src.length-1;
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <ViewerContainer>
            <ImageContainer height="20vh">
                <ImageViewer src={imageSrc[currentIndex]}/>
            </ImageContainer>
            <PMButton
                left=""
                right="0"
                onClick={() => {
                    if (currentIndex+1 <= maxIndex) {
                        setCurrentIndex(currentIndex+1);
                    }
                }}
                onTouchStart={(e) => e.stopPropagation()}
            >
                &gt;
            </PMButton>
            <PMButton
                left="0"
                right=""
                onClick={() => {
                    if (currentIndex >= 1) {
                        setCurrentIndex(currentIndex-1);
                    }
                }}
                onTouchStart={(e) => e.stopPropagation()}
            >
                &lt;
            </PMButton>
        </ViewerContainer>
        
    )
}

export default MultipleImageViewer