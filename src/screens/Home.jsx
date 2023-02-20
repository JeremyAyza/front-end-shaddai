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



	// console.log(products);
	return (
		<div className="container containerToReduce">
			<h1 className="title">SHADDAI IMPORT ECOMMERCE</h1>
			<div>
				<Filters />
			</div>
			


			<div className="container my-3">
			{
				products.length ?
					(
						<Row xs={2} md={3} lg={4} className="g-4">
							{products.map((product) => (
								<Col key={product._id}>
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
