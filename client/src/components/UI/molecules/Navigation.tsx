import styled from "styled-components";
import { NavProps } from "../../../types";

const StyledNav = styled.div<{ isOpen: boolean }>`

    position: fixed;
    top: 80px;
    right: 0;
    width: 200px;
    height: 100vh;
    background-color: #F58027;
    z-index: 999;
    transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(100%)")};
    transition: transform 0.3s ease-in-out;
    
    display: flex;
    flex-direction: column;
    padding: 20px;

    >a{
        margin: 10px 0;
        color: white;
        text-decoration: none;
        font-weight: bold;
        cursor: pointer;
    }
`;

const Navigation = ({ isOpen }: NavProps) => {

    return (
        <StyledNav isOpen={isOpen}>
            <a>Prisijungti</a>
            <a>Apie treneri</a>
            <a>Treniruotes</a>
            <a>Tvarkarastis</a>
            <a>Kainos</a>
            <a>Susisiekti</a>
        </StyledNav>
    );
}

export default Navigation;