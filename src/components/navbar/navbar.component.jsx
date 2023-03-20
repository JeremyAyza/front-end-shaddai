import React from "react";
import { Link, useNavigate } from "react-router-dom";
// import Container from "../container/container.component";
import { Navbar, Container, NavDropdown, Button, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../data/actions";



//const gestiones = ["products", "sales", "users"]



const HeaderNavbar = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isAuth = useSelector((state) => state.auth.isAuthenticated);
	const user = useSelector((state) => state.auth.user);

	const handleLogout = () => {
		dispatch(logout());
		navigate("/");
	};


	return (
		<>
			{/*<header>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <Link to="/">
              <img
                className="logo"
                src={require("../../assets/logo.png")}
                alt="Main Logo"
								/>
            </Link>
          </Navbar.Brand>
          <NavbarList />
        </Container>
      </Navbar>
    </header>*/}
			<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
				<Container>
					<Navbar.Brand className="title fs-3">SHADDAI IMPORT ECOMMERCE</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="me-auto">

							<Nav.Link as={Link} to="/">Home</Nav.Link>
							<Nav.Link as={Link} to="/cart">Cart</Nav.Link>
							{/*<Nav.Link as={Link} to="/contacts">Contacts</Nav.Link>*/}

							{/* si está logeado aparece user */}
							{isAuth && (<Nav.Link as={Link} to="/user">Mi cuenta</Nav.Link>)}

							{/* si está logueado y es admin aparece gestiones */}

							{
								isAuth && user && user.role === 1 && (
									<>
										<NavDropdown title="Gestiones" id="collasible-nav-dropdown">
											<NavDropdown.Item as={Link} to={`/dashboard/admin/products`} >Gestion Producto</NavDropdown.Item>
											{/*<NavDropdown.Item as={Link} to={`/dashboard/admin/sales`} >Gestion Ventas</NavDropdown.Item>*/}
											<NavDropdown.Item as={Link} to={`/dashboard/admin/salesp`} >Gestion Ventas</NavDropdown.Item>

											<NavDropdown.Item as={Link} to={`/dashboard/admin/users`} >Gestion Usuarios</NavDropdown.Item>
											<NavDropdown.Item as={Link} to={`/dashboard/admin/categories`} >Gestion Categorias</NavDropdown.Item>

											<NavDropdown.Item href="#action/3.2">Gestion</NavDropdown.Item>
											<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
											<NavDropdown.Divider />
											<NavDropdown.Item href="#action/3.4">
												Separated link
											</NavDropdown.Item>
										</NavDropdown>
									</>
								)

							}




						</Nav>
						{/* si no está logueado */
							!isAuth ? (
								<>
									<Nav.Link className="btn btn-outline-primary text-priamry p-1 px-3 mx-2 white-imp" as={Link} to="/login">Login</Nav.Link>
									<Nav.Link className="btn btn-outline-primary text-priamry p-1 px-3 mx-2 white-imp" as={Link} to="/register">Registrar</Nav.Link>
								</>
							) :
								(
									<Button variant="outline-danger" onClick={handleLogout}>Cerrar sesion</Button>

								)

						}

					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
};

export default HeaderNavbar;
