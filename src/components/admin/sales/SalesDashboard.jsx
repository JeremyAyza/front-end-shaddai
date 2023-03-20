import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSales, hideModalProducts } from "../../../data/actions";
import TableSales from "./TableSales";

const SalesDashboard = () => {
	//const sales = useSelector((state) => state.admin.sales);
	//const dispatch = useDispatch();

	//useEffect(() => {
	//	dispatch(getAllSales());
	//}, [dispatch]);

	return (
		<div className="dashboard-Admin   my-2 ">

			<div className="bg-black">
				<div className="container my-2 py-1 header-gestion">
					<h2 className="title fs-4 m-0 ">Gestión Ventas</h2>
				</div>
			</div>
			<div className="container bg-light rounded-3 my-3  px-1">
				{/*<ProductForm />*/}
			</div>

			<div className="container bg-light rounded-3 my-3  px-1">
				<TableSales  />
			</div>


		</div>
	);
};

export default SalesDashboard