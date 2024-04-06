import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import styled from '@emotion/styled';

// Styled container replacing layoutStyles
const StyledLayout = styled.div`
    background-color: #F7D9C4;
    color: #BE7333;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    font-family: 'Open Sans', sans-serif;
`;

// Styled header replacing headerStyles
const StyledHeader = styled.header`
    background-color: #FAEDCB;
    padding: 20px 0;
    margin-bottom: 20px;
    text-align: center;
    font-size: 36px;
    font-family: 'Montserrat', sans-serif;
`;

// Custom Container to apply flex style
const StyledContainer = styled(Container)`
    flex: 1;
`;

// Styled footer replacing footerStyles
const StyledFooter = styled.footer`
    text-align: center;
    padding: 10px 0;
    font-family: 'Open Sans', sans-serif;
`;

const Layout: React.FC = () => (
    <StyledLayout>
        <StyledHeader>All About Cats</StyledHeader>
        <StyledContainer>
            <Row>
                <Col>
                    <Outlet />
                </Col>
            </Row>
        </StyledContainer>
        <StyledFooter>
            <div>Cat Browser Assignment By: Sharina Rapales</div>
        </StyledFooter>
    </StyledLayout>
);

export default Layout;
