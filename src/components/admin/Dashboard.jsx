import React, { useState } from "react";
import ProductForm from "./ProductForm";
import { useDispatch, useSelector } from "react-redux";
import CardProductAdmin from "../products/Card.product.admin";
import { EditCategories } from "./EditCategories";
import Filters from "../filters/Filters";
import TableProduct from "../products/TableProduct";
import { Button, Modal } from "react-bootstrap";
import { hideModalProducts } from "../../data/actions";

const Dashboard = () => {
	const products = useSelector((state) => state.products.filtered);
	return (
		<div className="dashboard-Admin   my-2 ">

			<div className="bg-black">
				<div className="container my-2 py-1 header-gestion">
					<h2 className="title fs-4 m-0 ">Gestión Producto</h2>
			</div>
			</div>


			
			<div className="container bg-light rounded-3 my-3  px-1">
			<ProductForm/>
			</div>

			<div className="container bg-light rounded-3 my-3  px-1">
			<TableProduct products={products} />
			</div>


		</div>
	);
};

export default Dashboard;
