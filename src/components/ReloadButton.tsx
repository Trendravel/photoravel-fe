import styled from "@emotion/styled";

const Button = styled.button<{isOpen: boolean}>`
    position: ${(props) => props.isOpen? "absolute": ""};
    z-index: 10;
    top: 13vh;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 0.5em 0.75em 0.5em 0.75em;
    border-radius: 2em;
    box-shadow: 1px 1px 3px 1px #cccccc;
    background-color: #FF808A;
    font-size: 12pt;
    font-weight: 600;
    color: white;
`;

const ReloadButton = (props: {isOpen: boolean, clickEvent: () => void}) => {
    return (
        <Button
            isOpen={props.isOpen}
            onClick={() => { props.clickEvent() }}
        >
            🔍 장소 다시 불러오기
        </Button>
    )
}

export default ReloadButton;