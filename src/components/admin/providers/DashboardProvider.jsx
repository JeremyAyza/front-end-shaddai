import React from "react";
import ProviderForm from "./ProviderForm";
import {  useSelector } from "react-redux";

import TableProvider from "./TableProvider";


const DashboardProvider = () => {
	let providers = useSelector((state) => state.providers.filtered);

	return (
		<div className="dashboard-Admin   my-2 ">

			<div className="bg-black">
				<div className="container my-2 py-1 header-gestion">
					<h2 className="title fs-4 m-0 ">Gestión Proveedor</h2>
			</div>
			</div>

			<div className="container bg-light rounded-3 my-3  px-1">
			<ProviderForm/>
			</div>

			<div className="container bg-light rounded-3 my-3  px-1">
			<TableProvider providers={providers} />
			</div>


		</div>
	);
};

export default DashboardProvider;
