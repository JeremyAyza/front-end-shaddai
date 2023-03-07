import { React, useState } from "react";
import { BsFillBackspaceFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
	filterByCategory,
	orderProducts,
	setOptions,
	searchByName
} from "../../data/actions";
import { RESTART_FILTERS, RESTART_PRODUCTS } from "../../data/actions/types";
import { toast } from "react-toastify";
import { Button, Container, Form, Modal } from "react-bootstrap";

const Filters = () => {
	const categories = useSelector((state) => state.products.categories);
	// options -> order, orderBy
	const options = useSelector((state) => state.products.options);
	const dispatch = useDispatch();
	const [search, setSearch] = useState("");
	const [filters, setFilters] = useState(false)

	const handleChangeSearch = (e) => {
		const { value } = e.target;
		setSearch(value);
	};

	const handleSearch = (e) => {
		e.preventDefault();

		if (!search.trim()) {
			setSearch("");
			toast.info("Ingrese su búsqueda");
		} else {
			setFilters(true)

			dispatch(searchByName(search));
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;

		//  console.log(name + " " + value);

		dispatch(setOptions({ [name]: value }));
		if (name === "category") {
			if (value === "all") {
				dispatch({ type: RESTART_PRODUCTS });
			} else {


				dispatch(filterByCategory(value));
			}
		}
		setFilters(true)
		dispatch(orderProducts());
	};

	const handleRestartFilters = (e) => {
		e.preventDefault();
		setFilters(false)
		dispatch({ type: RESTART_FILTERS });
		dispatch({ type: RESTART_PRODUCTS });
		dispatch(orderProducts());

	};

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);


	return (
		<div className=" my-2  d-flex flex-row flex-wrap justify-content-between  ">
			<Form className="  my-1" onSubmit={handleSearch}>
				<div className="d-flex align-items-center ">
					<Form.Group className="flex-grow-1" >
						<Form.Control
							type="search"
							placeholder="Producto"
							aria-label="Search"
							value={search}
							onChange={handleChangeSearch}
						/>
					</Form.Group>
					<Button variant="primary" type="submit" className="flex-grow-1 t-nowrap">
						Buscar🔎
					</Button>
				</div>
			</Form>

			{
				filters
				?
				<Button onClick={handleRestartFilters} variant="danger" className=" my-1 shadow">
						Borrar Filtros 🗑
				</Button>
				:
				<Button variant="warning" className="shadow my-1 px-4" onClick={handleShow}>
						Filtros ⚙
				</Button>
			}


			<Modal show={show} onHide={handleClose} animation={false}>
				<Modal.Header closeButton>
					<Modal.Title>Filtros de busqueda</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form
						className=" text-secondary d-flex flex-row flex justify-content-between flex-wrap "
						onSubmit={null}
					>
						<Form.Group className="w-f-100 m-2">
							<Form.Label className="">Filtrar por:</Form.Label>
							<Form.Select aria-label="Default select example" size="sm"
								title="orderBy"
								name={"orderBy"}
								id={"orderBy"}
								onChange={handleChange}
								value={options.orderBy}
							>
								<option value={"name"} key={"name"}>
									{"Nombre"}
								</option>
								<option value={"price"} key={"price"}>
									{"Precio"}
								</option>
							</Form.Select>
						</Form.Group>
						<Form.Group className="w-f-100 m-2">
							<Form.Label>Ordenar:</Form.Label>
							<Form.Select aria-label="Default select example" size="sm"
								title="order"
								name={"order"}
								id={"order"}
								onChange={handleChange}
								value={options.order}
							>
								<option value={"asc"} key={"asc"}>
									{"Ascendente"}
								</option>
								<option value={"desc"} key={"desc"}>
									{"Descendente"}
								</option>
							</Form.Select>
						</Form.Group>
						<Form.Group className="w-f-100 m-2">
							<Form.Label>Categorias:</Form.Label>
							<Form.Select aria-label="Default select example" size="sm"
								name="category"
								onChange={handleChange}
								value={options.category}
							>
								<option value={"all"}>Todas</option>
								{categories.map((e) => (
									<option key={e._id} value={e._id}>
										{e.name}
									</option>
								))}
							</Form.Select>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={handleRestartFilters} variant="danger" className=" text-light">
						Borrar Filtros 🗑
					</Button>
					<Button variant="success" onClick={handleClose}>
						Listo
					</Button>
				</Modal.Footer>
			</Modal>

		</div>


	);
};

export default Filters;
