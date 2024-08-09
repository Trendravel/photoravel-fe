import styled from "@emotion/styled";
import { useState } from "react";

import PanPosition from "../api/datatype/PanPosition_Type";
import CrossHairLogo from "../assets/crosshair.png"

const PanButton = (props: { setPos: (center: PanPosition) => void }) => {
    const [isClicked, setIsClicked] = useState(false);

    const setPosition = async () => {
        setIsClicked(true);

        const getCurrentPosition = () => {
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
        };
    
        try {
            const pos = await getCurrentPosition();
            props.setPos({
                center: {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                },
            });
        } catch (error) {
            alert("현재 위치를 불러올 수 없는 기기입니다.");
        } finally {
            // 위치 처리와 상관없이 마지막에 클릭 상태를 리셋합니다.
            setTimeout(() => {
                setIsClicked(false)
            }, 500)
            
        }

    }

    return (
        <RoundButton clicked={isClicked} onClick={setPosition}>
            <CrossHairImage src={CrossHairLogo}/>
        </RoundButton>
    )
}

const CrossHairImage = styled.img`
    position: relative;
    margin: 0.6em 0.5em 0.75em 0.5em;
    width: 2.75em;
    height: 2.75em;
`;

const RoundButton = styled.button<{clicked: boolean}>`
    width: 4em;
    height: 4em;
    border-radius: 4em;
    box-shadow: 1px 1px 3px rgb(0, 0, 0, 0.15);
    background-color: ${(props) => props.clicked? "#87DEBE":"white"};
    position: absolute;
    z-index: 5;
    bottom: 7em;
    right: 2em;
    transition: background-color 0.5s ease-in-out;

`;



export default PanButton;