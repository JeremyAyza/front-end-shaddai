import React from "react";
import { useSelector } from "react-redux";
import CardProduct from "../components/products/Card.product";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Filters from "../components/filters/Filters";
import { Col, Row } from "react-bootstrap";

const Home = () => {
	const products = useSelector((state) => state.products.filtered);
	const cart = useSelector((state) => state.products.cart);
	const navigate = useNavigate();



	return (
		<div className="container containerToReduce">
			
			{/* TITLE */}
			<div className="title-container my-3 ">
				<h2 className="title">Home</h2>
				<hr class="border border-success border-2 opacity-50 m-0"></hr>
			</div>


			{/* FILTROS */}
			<div className="px-1">
				<Filters />
			</div>


			{/* ITEMS */}
			<div className="container my-3">
			{
				products.length ?
					(
						<Row xs={2} md={3} lg={4} className="g-4 ">
							{products.map((product) => (
								<Col key={product._id} className="px-1">
								<CardProduct key={product._id} product={product} />
								</Col>
							))}
						</Row>
					)
					:
					(
						<div>No hay productos registrados</div>
					)
			}
			</div>


			{/* CARRITO */}
			<div className="btn-flotante">
				<button
					onClick={() => navigate("/cart")}
					className="btn fs-2 btn-success  position-relative  btn-sm border rounded-circle"
					
				>
					<FaShoppingCart />
					<span className="fs-6 position-absolute top-0 start-120 translate-middle badge rounded-pill bg-danger">
						{cart.length}+
					</span>
				</button>
			</div>

			
		</div>
	);
};

export default Home;
