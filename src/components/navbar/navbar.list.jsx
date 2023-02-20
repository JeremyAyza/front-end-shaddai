import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../button/button.component";
import NavItem from "./navbar.item";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../data/actions";
import { Nav } from "react-bootstrap";

const gestiones = ["products","sales","users",]

const AdminNavbarList = ({ isActive, location }) => {
	const [adminView, setAdminView] = useState(true);
	const navigate = useNavigate();

	return (
		<>
			{
				adminView ? 
				(
					<>
						{gestiones.map(name=>(
							<NavItem
								link={`/dashboard/admin/${name}`}
								name="Gestionar productos"
								key={name}
								listStyle={isActive(location, `/dashboard/admin/${name}`)}
							/>
						))}
					</>
				) 
				: 
				(
					<NormalNavbarList
						isActive={isActive}
						location={location}
						isAuth={true}
					/>
				)
			}

			{adminView ? (
				<Button
					className="btn btn-outline-success me"
					onClick={() => {
						if(adminView){
							setAdminView(false);
							navigate("/")
						}
						else{
							setAdminView(true);
							navigate("/dashboard/admin/products");
						}
						
					}}
				>
					Ver como {adminView? 'usuario':'admin'}
				</Button>
			) : (
				<button
					className="btn btn-outline-success me-3"
					onClick={() => {
						
					}}
				>
					Ver como admin
				</button>
			)}
		</>
	);
};

const NormalNavbarList = ({ isActive, location, isAuth = false }) => {
	const cart = useSelector((state) => state.products.cart);

	return (
		<>
			<NavItem link="/" name="Home" listStyle={isActive(location, "/")} />
			<NavItem
				link="/cart"
				name={`Carrito ${cart.length}`}
				listStyle={isActive(location, "/cart")}
			/>
			{isAuth && (
				<NavItem
					link="/user"
					name="Mi perfil"
					listStyle={isActive(location, "/user")}
				/>
			)}
		</>
	);
};

const NavbarList = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isAuth = useSelector((state) => state.auth.isAuthenticated);
	const user = useSelector((state) => state.auth.user);
	// to define the actual route
	const location = useLocation();

	// make active nav item with text primary
	const isActive = (location, path) => {
		// console.log(location);
		if (location.pathname === path) {
			return { fontWeight: "bold" };
		} else {
			return {};
		}
	};

	const handleLogout = () => {
		dispatch(logout());
		navigate("/");
	};

	return (
		<>
			<Nav className="me-auto ">
				<div className="d-flex">
					{isAuth && user && user.role === 1 ? (
						<AdminNavbarList isActive={isActive} location={location} />
					) : (
						<NormalNavbarList
							isActive={isActive}
							location={location}
							isAuth={isAuth}
						/>
					)}
					{isAuth ? (
						<Button
							title="Salir"
							moreStyle="hover:text-primary "
							action={handleLogout}
						/>
					) : (
						<div className="d-flex gap-3">
							<Button
								title="Login"
								href="/login"
								isButton={false}
								isToLogin={false}
							/>
							<Button
								title="Registrarse"
								href="/register"
								isButton={false}
								isToLogin={false}
							/>
						</div>
					)}
				</div>
			</Nav>
		</>
	);
};

export default NavbarList;
