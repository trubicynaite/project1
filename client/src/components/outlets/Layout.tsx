import { Outlet } from "react-router";
import { useState } from "react";

import styled from "styled-components";

import Header from "../UI/organisms/Header";
import Footer from "../UI/organisms/Footer";
import Navigation from "../UI/molecules/Navigation";

const StyledMain = styled.main`
    min-height: calc(100vh - 80px - 80px);
`

const Layout = () => {

    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(prev => !prev);

    return (
        <>
            <Header onMenuClick={toggleMenu} />
            <Navigation isOpen={menuOpen} />
            <StyledMain>
                <Outlet />
            </StyledMain>
            <Footer />
        </>
    );
}

export default Layout;