import styled from "@emotion/styled";

import { PlaceName } from "../components/LocationDetail";

const NotFound = () => {
    return (
        <NotFoundContainer>
            <PlaceName>
                Not Found Page
            </PlaceName>
            
        </NotFoundContainer>
    )
}

const NotFoundContainer = styled.div`
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100%;
    text-align: center;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #f0f0f0;
`;

export default NotFound;