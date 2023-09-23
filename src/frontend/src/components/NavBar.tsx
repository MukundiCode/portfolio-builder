import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { getCurrentUser, logoutUser } from '../service/ProfileService';
import SignUpComponent from '../pages/home/components/SignUp-component';
import LoginComponent from '../pages/home/components/Login-component';
import { useState } from 'react';

function NavBar() {

    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const handleShowLoginModal = () => setShowLoginModal(true);

    return (
        <div>

            <SignUpComponent
                showSignUpModal={showSignUpModal}
                setShowSignUpModal={setShowSignUpModal}
                username={""}></SignUpComponent>

            <LoginComponent
                setShowLoginModal={setShowLoginModal}
                showLoginModal={showLoginModal}></LoginComponent>

            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">DevPortfolio.me</Navbar.Brand>
                    <Nav className="justify-content-end">
                        {getCurrentUser() ?
                            <Nav.Link className='justify-content-end' onClick={logoutUser}>Sign Out</Nav.Link> :
                            <Nav.Link className='justify-content-end'  onClick={handleShowLoginModal}>Sign In</Nav.Link>}
                    </Nav>

                </Container>
            </Navbar>
        </div>
    );
}

export default NavBar;