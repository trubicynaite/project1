import styled from "styled-components";

const StyledFooter = styled.footer`
    height: 80px;
    background-color: #9634b7;

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding-left: 20px;
    padding-right: 20px;

    gap: 20px;

    >a{
        color: white;
        text-align: center;

        &:hover {
        text-decoration: underline;
        }
    }

    >p{
        color: white;
        text-align: center;
        }
`;

const Footer = () => {
    return (
        <StyledFooter>
            <p>&copy; Jovita Trubicynaite</p>
            <a href="/">Privacy Policy</a>
            <a href="/">Terms of Service</a>
            <a href="/">Contact Us</a>
        </StyledFooter>
    );
}

export default Footer;