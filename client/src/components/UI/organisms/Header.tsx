import styled from "styled-components";
import { HeaderProps } from "../../../types";

const StyledHeader = styled.header`
    height: 80px;
    padding: 5px 20px;
    background-color: #F58027;

    display: flex;
    justify-content: space-between;
    align-items: center;

    .menu-icon{
        cursor: pointer;
    }
`;

const Header = ({ onMenuClick }: HeaderProps) => {
    return (
        <StyledHeader>
            <div className="left">
                <h2>Vardas Pavarde</h2>
            </div>
            <div className="right">
                <i className="bi bi-list"
                    style={{ fontSize: '3rem', color: 'white' }}
                    onClick={onMenuClick}
                ></i>
            </div>
        </StyledHeader>
    );
}

export default Header;