import styled from "@emotion/styled";
import { useState } from "react";

import PanPosition from "../api/datatype/PanPosition_Type";
import CrossHairLogo from "../assets/crosshair.png"

const PanButton = (props: { setPos: (center: PanPosition) => void }) => {
    const [isClicked, setIsClicked] = useState(false);

    const SetPosition = () => {
        setIsClicked(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {   
                props.setPos({center: {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                }})
            })
        } else {
            alert("현재 위치를 불러올 수 없는 기기입니다.");
        }
        setIsClicked(false);
    };

    return (
        <RoundButton clicked={isClicked} onClick={SetPosition}>
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
    background-color: ${(props) => props.clicked? "green":"white"};
    position: absolute;
    z-index: 10;
    bottom: 7em;
    right: 2em;
    transition: background-color 0.5s ease-in-out;

`;


export default PanButton;