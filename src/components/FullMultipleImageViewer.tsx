import styled from "@emotion/styled";
import { useState } from "react";

const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #000000;
    opacity: 0.5;
    z-index: 50;
`;

const Image = styled.img`
    position: fixed;
    top: 30%;
    left: 0;
    width: 100vw;
    z-index: 55;
`;

const MoveButton = styled.button<{left: string, right: string}>`
    position: fixed;
    top: 45%;
    left: ${(props) => props.left};
    right: ${(props) => props.right};
    width: 2em;
    height: 2em;
    padding: 1em;
    color: white;
    font-size: 20pt;
    font-weight: 600;
    z-index: 60;
`;

const CloseButton = styled.button`
    position: fixed;
    font-size: 18pt;
    color: white;
    top: 2em;
    right: 1em;
    width: 2em;
    height: 2em;
    padding: 1em;
    z-index: 60;
`;

const CurrentIndex = styled.p`
    position: fixed;
    bottom: 2em;
    left: 45%;
    z-index: 60;
    color: white;
`;

const FullMultipleImageViewer = (props: {images: string[], changeIsOpen: () => void, isOpen: boolean}) => {

    const [index, setIndex] = useState(0);

    const moveImage = (i: number) => {
        if (i === 1) {
            if (index+1 < props.images.length)
                setIndex(prevIndex => prevIndex+1)
        } else if (i === -1) {
            if (index-1 >= 0)
                setIndex(prevIndex => prevIndex-1);
        }
    }

    return (
        <div
            style={props.isOpen? {} : {display: "none"}}
            onTouchStart={(e) => {e.stopPropagation()}}
        >   
            <Background/>
            <div style={props.images.length > 1? {} : {display: "none"}}>
                <MoveButton
                left="0" right=""
                onClick={() => moveImage(-1)}
                >
                    &lt;
                </MoveButton>
                <MoveButton
                left="" right="0"
                onClick={() => moveImage(1)}
                >
                    &gt;
                </MoveButton>
            </div>
            
            <Image src={props.images[index]}/>
            <CloseButton onClick={() => props.changeIsOpen()}>
                X
            </CloseButton>
            <CurrentIndex>
                {index+1} / {props.images.length}
            </CurrentIndex>
        </div>
        
    )
}

export default FullMultipleImageViewer;