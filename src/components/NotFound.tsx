import styled from "@emotion/styled";

import { PlaceName } from "../components/LocationDetail";

const NotFound = () => {
    return (
        <NotFoundContainer>
            <PlaceName>
                결과를 찾을 수 없습니다!
            </PlaceName>
        </NotFoundContainer>
    )
}

const NotFoundContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    text-align: center;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #f0f0f0;
`;

export default NotFound;