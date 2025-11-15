import styled from "styled-components";
import { HeaderProps } from "../../../types";

const StyledHeader = styled.header`
    height: 80px;
    padding: 5px 20px;
    background-color: #9634b7;

    display: flex;
    justify-content: space-between;
    align-items: center;

    .burger{
        cursor: pointer;
    }

    >nav.desktop-menu{
        display: none;
    }

    @media (min-width: 768px){
       .burger{
        display: none;
       }

        >nav.desktop-menu{
            display: flex;
            gap: 20px;

            >a{
                color: white;
                text-decoration: none;
                font-weight: bold;
                cursor: pointer;
            }
        }
    }
`;

const Header = ({ onMenuClick }: HeaderProps) => {
    return (
        <StyledHeader>
            <div className="name">
                <h2>Better You</h2>
            </div>
            {/* Burger menu */}
            <i className="bi bi-list burger"
                style={{ fontSize: '3rem', color: 'white' }}
                onClick={onMenuClick}
            ></i>
            {/* Desktop menu */}
            <nav className="desktop-menu">
                <a>Home</a>
                <a>Profile</a>
                <a>Saved Books</a>
                <a>Upload a Book</a>
                <a>About Us</a>
            </nav>
        </StyledHeader>
    );
}

export default Header;