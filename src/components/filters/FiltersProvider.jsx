import { React, useState } from "react";
import { useDispatch } from "react-redux";
import {
	orderProviders,
	searchProviderByName
} from "../../data/actions";
import { RESTART_PROVIDER_FILTERS, RESTART_PROVIDERS } from "../../data/actions/types";
import { toast } from "react-toastify";
import { Button, Form,  } from "react-bootstrap";

const FiltersProvider = () => {
	//const categories = useSelector((state) => state.products.categories);
	// options -> order, orderBy
	//const options = useSelector((state) => state.providers.options);
	const dispatch = useDispatch();
	const [search, setSearch] = useState("");

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
			dispatch(searchProviderByName(search));
		}
	};

	//const handleChange = (e) => {
	//	const { name, value } = e.target;

	//	//  console.log(name + " " + value);

	//	dispatch(setOptions({ [name]: value }));
		
	//	setFilters(true)
	//	dispatch(orderProviders());
	//};

	const handleRestartFilters = (e) => {
		e.preventDefault();
		dispatch({ type: RESTART_PROVIDER_FILTERS });
		dispatch({ type: RESTART_PROVIDERS });
		dispatch(orderProviders());

	};




	return (
		<div className=" my-2  d-flex flex-row flex-wrap justify-content-between  ">
			<Form className="  my-1" onSubmit={handleSearch}>
				<div className="d-flex align-items-center ">
					<Form.Group className="flex-grow-1" >
						<Form.Control
							type="search"
							placeholder="Proveedor"
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
			<div className="my-1">
				<Button onClick={handleRestartFilters} variant="warning" className="text-light">
					Limpiar Busqueda 🗑
				</Button>
			</div>


		</div>


	);
};

export default FiltersProvider;
