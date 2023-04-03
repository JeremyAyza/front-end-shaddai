import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
	createProvider,
	setProviderToEdit,
	updateProvider,
} from "../../../data/actions";

const initialForm = {
	name: "",
	email: "",
	phone: "",
	ruc: "",
	address: "",
};

const validateForm = (form) => {
	let errors = 0;
	let { name, email, ruc, phone, address } = form;

	// name
	if (!name.trim()) {
		toast.error("El campo nombre es requerido");
		errors += 1;
	} else if (name.length < 5 || name.length > 30) {
		toast.error("El campo nombre debe tener entre 5 y 30 caracteres");
		errors += 1;
	}

	// email
	if (!email.trim()) {
		toast.error("El campo email es requerido");
		errors += 1;
	} else if (!/\S+@\S+\.\S+/.test(email)) {
		toast.error("El campo email es inválido");
		errors += 1;
	}

	// ruc
	if (!ruc.trim()) {
		toast.error("El campo RUC es requerido");
		errors += 1;
	} else if (ruc.length !== 11) {
		toast.error("El campo RUC debe tener 11 dígitos");
		errors += 1;
	} else if (!/^\d+$/.test(ruc)) {
		toast.error("El campo RUC solo debe contener números");
		errors += 1;
	}

	// phone
	if (!phone.trim()) {
		toast.error("El campo phone es requerido");
		errors += 1;
	} else if (!/^\+?\d{9}$/.test(phone)) {
		toast.error("El campo phone debe tener 9 dígitos");
		errors += 1;
	} else if (!/^\+?\d+$/.test(phone)) {
		toast.error("El campo phone solo debe contener números y el signo +");
		errors += 1;
	}

	// address
	if (!address.trim()) {
		toast.error("El campo address es requerido");
		errors += 1;
	} else if (address.length < 5 || address.length > 100) {
		toast.error("El campo address debe tener entre 5 y 100 caracteres");
		errors += 1;
	}

	return errors;
};


const ProviderForm = () => {
	const providerToEdit = useSelector((state) => state.providers.providerToEdit);
	const [form, setForm] = useState(providerToEdit || initialForm);
	const dispatch = useDispatch();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	const handleEdit = (e, id) => {
		e.preventDefault();

		if (!validateForm(form)) {
			dispatch(updateProvider(form));
			setForm(initialForm);
			dispatch(setProviderToEdit(null));
		}
	};

	const handleCreate = (e) => {
		e.preventDefault();

		if (!validateForm(form)) {
			dispatch(createProvider(form));
			setForm(initialForm);
		}
	};

	const handleCleanFields = (e) => {
		e.preventDefault();

		setForm(initialForm);
		dispatch(setProviderToEdit(null));
	};



	useEffect(() => {

		if (providerToEdit) {
			const provider = {
				...providerToEdit
			}
			setForm(provider);
		}


	}, [providerToEdit]);

	//form - group mb - 2 mx - 1 border flex - grow - 1 w - 50 m - w - 250
	return (

		<form className="t-nowrap">
			<div className={`container mini-header  mb-2 p-1 px-2  ${providerToEdit ? 'bg-warning ' : 'bg-primary text-white'}`}>
				<h6 className=" m-0 ">{providerToEdit ? 'Actualizar Proveedor 🖊' : 'Registrar Proveedor ✍'}</h6>
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
							minLength={10}
							placeholder="Nombre del Proveedor"
							onChange={handleChange}
							value={form.name}
						></input>

					</div>
					<div className="form-group mb-3 ">
						<label className="form-label">Email</label>
						<input
							className="form-control "
							type="mail"
							name="email"
							placeholder="example@email.com"
							onChange={handleChange}
							value={form.email}
						></input>

					</div>


				</div>
				<div className="container-inputs p-1 mb-2 me-2" >

					<div className="form-group mb-3 ">
						<label className="form-label">Phone</label>
						<input
							className="form-control "
							type="text"
							name="phone"
							placeholder="+51 921850524"
							onChange={handleChange}
							value={form.phone}
						></input>

					</div>
					<div className="form-group mb-3 ">
						<label className="form-label">RUC</label>
						<input
							className="form-control "
							type="text"
							name="ruc"
							placeholder="12345678915"
							onChange={handleChange}
							value={form.ruc}
						></input>

					</div>

				</div>
				<div className="container-inputs p-1 mb-2 me-2" >

					<div className="form-group mb-3 ">
						<label className="form-label">Dirección</label>
						<input
							className="form-control "
							type="text"
							name="address"
							placeholder="Jr Lima 123"
							onChange={handleChange}
							value={form.address}
						></input>

					</div>


				</div>
			</div>

			<div className=" d-flex justify-content-end ">
				<button className={`btn me-3 ${providerToEdit ? 'btn-warning' : 'btn-primary'}`}

					onClick={
						providerToEdit
							? (e) => handleEdit(e, providerToEdit.id)
							: handleCreate
					}
				>
					{providerToEdit ? "Actualizar ✅" : "Registrar 💾"}
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

export default ProviderForm;
