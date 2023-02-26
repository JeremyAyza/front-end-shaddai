import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
	createProduct,
	setProductToEdit,
	updateProduct,
} from "../../data/actions";

const initialForm = {
	name: "",
	description: "",
	price: "",
	category: "",
	provider: "",
	quantity: "",
	photo: "",
	purchase_price:""
};

const validateForm = (form) => {
	let errors = 0;
	let { name, description, price, category, quantity, photo, provider, purchase_price } = form;




	price += "";
	quantity += "";
	purchase_price+="";

	// name
	if (!name.trim()) {
		toast.error("El campo nombre es requerido");
		errors += 1;
	}

	// description
	if (!description.trim()) {
		toast.error("El campo descripción es requerido");
		errors += 1;
	} else if (description.length < 10) {
		toast.error("El campo descripción debe tener mínimo 10 caracteres");
		errors += 1;
	}

	// price
	if (!price.trim()) {
		toast.error("El campo price es requerido");
		errors += 1;
	} else if (parseFloat(price) < 0) {
		toast.error("El campo precio debe ser un numero entero positivo");
		errors += 1;
	}
	if (!purchase_price.trim()) {
		toast.error("El campo price es requerido");
		errors += 1;
	} else if (parseFloat(purchase_price) < 0) {
		toast.error("El campo precio debe ser un numero entero positivo");
		errors += 1;
	}


	// category

	if (!category.trim()) {
		toast.error("El campo categoría es requerido");
		errors += 1;
	}

	// provider
	if (!provider.trim()) {
		toast.error("El campo proveedor es requerido");
		errors += 1;
	}

	// quantity
	if (!quantity.trim()) {
		toast.error("El campo cantidad es requerido");
		errors += 1;
	} else if (parseInt(quantity) < 0) {
		toast.error("El campo cantidad debe ser un numero entero positivo");
		errors += 1;
	}

	//photo
	if (!photo.trim()) {
		toast.error("El campo Url es requerido");
		errors += 1;
	}

	return errors;
};

const ProductForm = () => {
	const providers = useSelector((state) => state.products.providers);
	const categories = useSelector((state) => state.products.categories);
	const productToEdit = useSelector((state) => state.products.productToEdit);
	const [form, setForm] = useState(productToEdit || initialForm);
	const dispatch = useDispatch();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	const handleEdit = (e, id) => {
		e.preventDefault();

		if (!validateForm(form)) {
			dispatch(updateProduct(form));
			setForm(initialForm);
			dispatch(setProductToEdit(null));
		}
	};

	const handleCreate = (e) => {
		e.preventDefault();

		if (!validateForm(form)) {
			dispatch(createProduct(form));
			setForm(initialForm);
		}
	};

	const handleCleanFields = (e) => {
		e.preventDefault();

		setForm(initialForm);
		dispatch(setProductToEdit(null));
	};



	useEffect(() => {

		if (productToEdit) {
			const product = {
				...productToEdit,
				category: productToEdit.category._id,
				provider: productToEdit.provider._id
			}
			setForm(product);
		}


	}, [productToEdit]);

	//form - group mb - 2 mx - 1 border flex - grow - 1 w - 50 m - w - 250
	return (

		<form className="t-nowrap">
			<div className={`container mini-header  mb-2 p-1 px-2  ${productToEdit ? 'bg-warning ' :'bg-primary text-white'}`}>
				<h6 className=" m-0 ">{productToEdit ? 'Actualizar Poducto 🖊'  : 'Registrar Producto ✍'}</h6>
				<div className="">
					<Button
						size="sm"
						variant="outline-light"
						onClick={() => window.scrollTo(0, 500)} >Ir al Listado</Button>
				</div>
			</div>
			
			<div className="d-flex flex-wrap d-flex justify-content-around mt-3 ">
				<div className="container-inputs p-1 mb-2 me-2">
					<div className="form-group mb-3 ">
						<label className="form-label">Nombre</label>
						<input
							className="form-control "
							type="text"
							name="name"
							placeholder="Nombre del Producto"
							onChange={handleChange}
							value={form.name}
						></input>

					</div>

					<div className="form-group mb-3 ">
						<label className="form-label">Precio S/.</label>
						<input
							type="number"
							className="form-control"
							name="price"
							placeholder="0.00"
							onChange={handleChange}
							value={form.price}
						/>
					</div>
					<div className="form-group mb-3 ">
						<label className="form-label">Precio de Venta S/.</label>
						<input
							type="number"
							className="form-control"
							name="purchase_price"
							placeholder="0.00"
							onChange={handleChange}
							value={form.purchase_price}
						/>
					</div>

					<div className="form-group mb-3">
						<label className="form-label">URL Imagen:</label>
						<input
							className="form-control"
							type="text"
							name="photo"
							placeholder="https://img.com/imagen.png"
							onChange={handleChange}
							value={form.photo}
						></input>
					</div>
				</div>
				<div className="container-inputs p-1 mb-2 me-2" >

					<div className="form-group mb-3">
						<label className="form-label">Cantidad:</label>
						<input
							className="form-control"
							type="number"
							name="quantity"
							placeholder="0"
							onChange={handleChange}
							value={form.quantity}
						/>
					</div>

					<div className="form-group mb-3 d-flex">
						<select
							className="form-select w-50 me-2"
							onChange={handleChange}
							name="category"
							value={form.category}
							placeholder="asda"
						>
							<option value="" hidden={true} >Categoria</option>
							{categories.map((e) => (
								<option key={e._id} value={e._id}>
									{e.name}
								</option>
							))}
						</select>

						<select
							className="form-select w-50 ms-1"
							onChange={handleChange}
							name="provider"
							value={form.provider}
						>
							<option value="" hidden={true} >Proveedor</option>
							{providers.map((e) => (
								<option key={e._id} value={e._id}>
									{e.name}
								</option>
							))}
						</select>


					</div>

					<div className="form-group  mb-3">
						<label className="form-label">Descripción</label>
						<input
							className="form-control "
							type="text"
							name="description"
							placeholder="Descripcion"
							onChange={handleChange}
							value={form.description}
						></input>
					</div>

				</div>
			</div>

			<div className=" d-flex justify-content-end ">
				<button className={`btn me-3 ${productToEdit? 'btn-warning':'btn-primary' }`}

				onClick={
						productToEdit
							? (e) => handleEdit(e, productToEdit.id)
							: handleCreate
					}
				>
					{productToEdit ? "Actualizar ✅" : "Registrar 💾"}
				</button>


				<button 
					onClick={handleCleanFields} 
					className="btn btn-success me-3">
					Limpiar campos 🗑
				</button>
			</div>



		</form>



	);
};

export default ProductForm;
