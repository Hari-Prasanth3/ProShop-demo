import { Navbar, Nav, Container} from 'react-bootstrap';
import { FaShoppingCart, FaUser} from  'react-icons/fa';
const Header = () => {
  return (
    <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container>
               <Navbar.Brand herf="/" >ProShop</Navbar.Brand>
               <Navbar.Toggle aria-controls="basic-navbar-nav"/>
               <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <Nav.Link herf="/cart"><FaShoppingCart/>Cart</Nav.Link>
                    <Nav.Link herf="/login"><FaUser/>Sign In</Nav.Link>

                </Nav>
                </Navbar.Collapse>
          </Container>

        </Navbar>
    </header>
  )
}

export default Header