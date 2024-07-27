import styled from "@emotion/styled";

const NotFound = () => {
    return (
        <NotFoundContainer>
            Not Found Page
        </NotFoundContainer>
    )
}

const NotFoundContainer = styled.div`
    position: fixed;
    width: 100vw;
    height: 100%;
    text-align: center;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #f0f0f0;
`;

export default NotFound;