import React, { useEffect, useState } from "react";
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
	quantity: "",
	photo: "",
};

const validateForm = (form) => {
	let errors = 0;
	let { name, description, price, category, quantity, photo } = form;
	price += "";
	quantity += "";

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

	// category
	if (!category.trim()) {
		toast.error("El campo categoría es requerido");
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
		productToEdit && setForm(productToEdit);
	}, [productToEdit]);

	return (
		<div className="bg-info">
			<span className="h3 " id="Productos">
				Productos
			</span>
			<form className="">


				<div className="form-group mb-2">
					<input
						className="form-control"
						type="text"
						name="name"
						placeholder="Nombre"
						onChange={handleChange}
						value={form.name}
					></input>
				</div>


				<div className="form-group mb-2">
					<textarea
						className="form-control"
						type="text"
						name="description"
						placeholder="Descripcion"
						onChange={handleChange}
						value={form.description}
						//defaultValue="Descripción tarea #01"
					/>

				</div>

				<div className="input-group mb-3">
					<span className="input-group-text">S/</span>
					<input 
						type="number" 
						className="form-control" 
						aria-label="Amount (to the nearest dollar)"
						name="price"
						placeholder="0.00"
						onChange={handleChange}
						value={form.price}
					/>

				</div>
				<div className="input-group mb-3">
					<span className="input-group-text">Cantidad:</span>
					<input
						className="form-control"
						type="number"
						name="quantity"
						placeholder="0"
						onChange={handleChange}
						value={form.quantity}
					/>

				</div>
				<div className="input-group mb-3">
					<select
						className="form-select"
						onChange={handleChange}
						name="category"
						value={form.category}
					>
						{categories.map((e) => (
							<option key={e._id} value={e._id}>
								{e.name}
							</option>
						))}
					</select>

				</div>



				<div className="input-group mb-3">
					<span className="input-group-text">URL Imagen:</span>
					<input
						className="form-control"
						type="text"
						name="photo"
						placeholder="https://img.com/imagen.png"
						onChange={handleChange}
						value={form.photo}
					></input>

					
				</div>
				<div className="col-auto ms-4">
					<button
						onClick={
							productToEdit
								? (e) => handleEdit(e, productToEdit.id)
								: handleCreate
						}
						className="btn btn-primary"
					>
						{productToEdit ? "Guardar" : "Añadir"}
					</button>
					&nbsp;&nbsp;&nbsp;
					<button onClick={handleCleanFields} className="btn btn-primary">
						Limpiar campos
					</button>
				</div>
			</form>
		</div>
	);
};

export default ProductForm;
