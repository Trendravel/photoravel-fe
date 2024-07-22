import styled from "styled-components";
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./FontAwesome";

const BottomNav = () => {
  const location = useLocation();

  return (
    <Wrapper>
      <NavItem>
        <NavLink to="/home" className={location.pathname === '/home' ? 'active' : ''}>
          <FontAwesomeIcon icon="home" />
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/guidematching" className={location.pathname === '/guidematching' ? 'active' : ''}>
          <FontAwesomeIcon icon="magnifying-glass" />
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/guidebook" className={location.pathname === '/guidebook' ? 'active' : ''}>
          <FontAwesomeIcon icon="book" />
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/chat" className={location.pathname === '/chat' ? 'active' : ''}>
          <FontAwesomeIcon icon="message" />
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>
          <FontAwesomeIcon icon="user" />
        </NavLink>
      </NavItem>
    </Wrapper>
  );
};

export default BottomNav;

const Wrapper = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 0 -1px 0px rgba(0, 0, 0, 0.1);
  padding: 15px 10px;
  padding-bottom: 23px;  
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  .active {
    color: #000;
  }
`;

const NavLink = styled(Link)`
  color: #aaa;
  font-size: 22px;
`;