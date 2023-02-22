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
    <div className="dashboard-Admin container-fluid my-2">
      <div className=" border">
				<div className="border"></div>
				{/* MODAL EDITAR */}
				<ProductForm/>
				<Filters />
				<TableProduct products={products} />




      </div>
    </div>
  );
};

export default Dashboard;
