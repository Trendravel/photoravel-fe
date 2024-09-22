import styled from "@emotion/styled";
import { useState } from "react";

const ViewerContainer = styled.div`
    width: 100%;
    position: relative;
    display: inline-block;
    background-color: #F0F0F0;
`;

const ImageViewer = styled.img<{height: string;}>`
    width: auto;
    height: ${(props) => props.height};
`
const PMButton = styled.button<{color: string, left: string, right: string}>`
    position: absolute;
    color: white;
    z-index: 1;
    background-color: ${(props) => props.color};
    padding: 0.75em;
    top: 40%;
    left: ${(props) => props.left};
    right: ${(props) => props.right};
    opacity: 0.7;
`;

const MultipleImageViewer = (props: {height: string, src: string[]}) => {
    const imageSrc = props.src;
    const maxIndex = props.src.length-1;
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <ViewerContainer>
            <ImageViewer
                height={props.height}
                src={imageSrc[currentIndex]}
            >   
                
            </ImageViewer>
            <PMButton
                color="#000000"
                left=""
                right="0"
                onClick={() => {
                    if (currentIndex+1 <= maxIndex) {
                        setCurrentIndex(currentIndex+1);
                    }
                }}
            >
                &gt;
            </PMButton>
            <PMButton
                color="#000000"
                left="0"
                right=""
                onClick={() => {
                    if (currentIndex >= 1) {
                        setCurrentIndex(currentIndex-1);
                    }
                }}
            >
                &lt;
            </PMButton>
        </ViewerContainer>
        
    )
}

export default MultipleImageViewer