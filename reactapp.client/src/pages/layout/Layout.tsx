import { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Outlet, Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';


export function Layout() {
    const { t, i18n } = useTranslation();
    const [language, setLanguage] = useState(i18n.language);

    const handleLanguageChange = (e) => {
        const newLanguage = e.target.checked ? 'en' : 'pl';
        i18n.changeLanguage(newLanguage);
        setLanguage(newLanguage);
    };

    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary">
                <div className="container-fluid">
                    <Navbar.Brand>
                        <Link to="/" className="d-block">
                            <Image src="/image/image2.png" className="logo"></Image>
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link className="px-2">
                                <Link to="/" className="d-block">{t('home')}</Link>
                            </Nav.Link>
                            <NavDropdown title={t('resources')} id="navbarScrollingDropdown">
                                <NavDropdown.Item>
                                    <Nav.Link>
                                        <Link to="/ksiazka" className="d-block">{t('add_book')}</Link>
                                    </Nav.Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <Nav.Link>
                                        <Link to="/ksiazki" className="d-block">{t('books')}</Link>
                                    </Nav.Link>
                                </NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title={t('staff')} id="navbarScrollingDropdown">
                                <NavDropdown.Item>
                                    <Nav.Link>
                                        <Link to="/pracownik" className="d-block">{t('add_employee')}</Link>
                                    </Nav.Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <Nav.Link>
                                        <Link to="/pracownicy" className="d-block">{t('employees')}</Link>
                                    </Nav.Link>
                                </NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title={t('readers')} id="navbarScrollingDropdown">
                                <NavDropdown.Item>
                                    <Nav.Link>
                                        <Link to="/czytelnik" className="d-block">{t('add_reader')}</Link>
                                    </Nav.Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <Nav.Link>
                                        <Link to="/czytelnicy" className="d-block">{t('readers_list')}</Link>
                                    </Nav.Link>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Form className="d-flex flex-column align-items-center">
                            <Form.Label className="label-shift-left">{t('language')}</Form.Label>
                            <div className="d-flex align-items-center">
                                <span className="me-2">PL</span>
                                <Toggle
                                    checked={language === 'en'}
                                    onChange={handleLanguageChange}
                                    icons={false}
                                    className="toggle"
                                />
                                <span className="ms-2">EN</span>
                            </div>
                        </Form>
                    </Navbar.Collapse>
                </div>
            </Navbar>

            <div className='px-3, container-fluid'>
                <div className="container-fluid">
                    <Outlet />
                </div>
            </div>

            <Card className="text-center">
                <Card.Footer className="text-muted">Tomasz Gajos 2024</Card.Footer>
            </Card>
        </div>
    );
}
