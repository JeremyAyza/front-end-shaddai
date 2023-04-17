import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASEURL } from "../../../assets/constants";
import axios from "axios";
import { toast } from "react-toastify";
import TableProductPurchase from "./TableProductPurchase";
import { Button } from "react-bootstrap";
import getHeaderToken from "../../../helpers/getHeaderToken";

//const products = [
//	{
//		id: 1,
//		name: "Product 1",
//		price: 10,
//		stock: 5,
//	},
//	{
//		id: 2,
//		name: "Product 2",
//		price: 20,
//		stock: 10,
//	},
//	{
//		id: 3,
//		name: "Product 3",
//		price: 15,
//		stock: 0,
//	},
//];


const initialForm = {
	name: "",
	description: "",
	price: "",
	quantity: "",
	purchase_price: "",
	selectedProduct:""


};

const NewPurchase = () => {


	const { providerId } = useParams();

	const [productsByProvider, setProductsByProvider] = useState([])
	const [selectedProduct, setSelectedProduct] = useState(initialForm); // _id
	const [quantity, setQuantity] = useState(0);
	const [purchaseList, setPurchaseList] = useState([]);



	const handleProductSelect = (event) => {
		event.preventDefault()
		const productId = event.target.value
		const product = productsByProvider.find((p) => p._id === productId);
		console.log(product);
		setSelectedProduct(product);

	};


	const handleChangeQuantity = (e) => {
		e.preventDefault();
		const value = parseInt(e.target.value)
		setQuantity(value);
		console.log({ newQuantity: quantity });
	};

	const handleAddToCart = () => {
		if(quantity<=0){
			toast.error("La cantidad deseada debe ser mayor a 0");
		}
		else if (selectedProduct.quantity >= quantity ) {
			const item = {
				...selectedProduct,
				quantity
			};
			setPurchaseList([...purchaseList, item]);
			setQuantity(1);
			handleClean()

		}
		else{
			toast.error("La cantidad deseada debe ser menor al stock");

		}
	};

	const handleClean = () => {
		setSelectedProduct(initialForm)
		setQuantity(0)
	}

	const getProduct = async () => {
		try {
			const { data } = await axios.get(`${BASEURL}/provider/${providerId}/products`);
			setProductsByProvider([...data]);
		} catch (err) {
			toast.error("No se ha obtener la información del proveedor y sus productos");
		}
	};

	const createPurchase = async ()=>{

		const purchase={
			products: purchaseList.map((p)=>({product:p._id,quantity:p.quantity})),
		}
		console.log(purchaseList);

		try {
			console.log(purchase);

			await axios.post(
				`${BASEURL}/purchase`,
				purchase,
				getHeaderToken()
			);
			console.log(purchase);
			toast.success(`Compra registrada`);
		}catch (error) {
			console.log(error.response.data);
			toast.error("No se ha podido registrar la compra");
		}

	}

	useEffect(() => {
		getProduct();
	}, []);

	



	return (


		<>

			<div className="container bg-light rounded-3 my-3  px-1">
				{/*<SelectProduct />*/}
				<div className="t-nowrap">
					<div className='container mini-header  mb-2 p-1 px-2 bg-primary text-white'>
						<h6 className=" m-0 ">Añadir pedido</h6>
						<div className="">
							<Button
								size="sm"
								variant="outline-light"
								onClick={() => window.scrollTo(0, 500)} >Ir al Listado</Button>
						</div>
					</div>


					<div className="d-flex flex-wrap d-flex justify-content-around mt-3 ">
						<div className="container-inputs p-1 mb-2 me-2">
							<div className="form-group mb-3">
								<h6>Productos del proveedor:</h6>
								<select
									className="form-select"
									name="selectedProduct"
									onChange={handleProductSelect}
									value={selectedProduct._id}
								>
									<option value="" hidden={true}>Escoger</option>
									{productsByProvider.map((p) => (
										<option key={p._id} value={p._id}>
											{p.name}
										</option>
									))}
								</select>
							</div>
							<div className="form-group mb-3 ">
								<label className="form-label">Nombre</label>
								<input
									className="form-control "
									type="text"
									name="name"
									disabled
									placeholder="Nombre del Producto"
									value={selectedProduct.name}
								></input>

							</div>
							<div className="form-group  mb-3">
								<label className="form-label">Descripción</label>
								<textarea
									className="form-control "
									type="text"
									name="description"
									placeholder="Descripcion"
									disabled
									value={selectedProduct.description}
								></textarea>
							</div>
						</div>

						<div className="container-inputs p-1 mb-2 me-2 d-flex flex-wrap">
							<div className="form-group mb-3 w-50 px-1">
								<label className="form-label">Precio Venta S/.</label>
								<input
									type="number"
									className="form-control "
									name="price"
									placeholder="0.00"
									disabled
									value={selectedProduct.price}
								/>
							</div>
							<div className="form-group mb-3 w-50 px-1">
								<label className="form-label">Precio de Compra S/.</label>
								<input
									type="number"
									className="form-control  "
									name="purchase_price"
									placeholder="0.00"
									disabled
									value={selectedProduct.purchase_price}
								/>
							</div>

							<div className="form-group mb-3 w-50  px-1">
								<label className="form-label">Stock:</label>
								<input
									className="form-control"
									type="number"
									name="stock"
									placeholder="0"
									disabled
									onChange={handleChangeQuantity}
									value={selectedProduct.quantity}
								/>
							</div>

							<div className="form-group mb-3 w-50 px-1">
								<label className="form-label ">Cantidad a comprar:</label>
								<input
									className="form-control"
									type="number"
									name="quantity"
									placeholder="0"
									onChange={handleChangeQuantity}
									value={quantity}
								/>
							</div>
						</div>


					</div>

					<div className=" d-flex justify-content-end ">
						<button className={`btn me-3 btn-primary`}

							onClick={handleAddToCart}
						>
							Añadir
						</button>



						<button
							onClick={handleClean}
							className="btn btn-success me-3">
							Limpiar campos 🗑
						</button>
					</div>



				</div>
			</div>


			<div className="container bg-light rounded-3 my-3  px-1">
				<TableProductPurchase products={purchaseList} />
				<Button onClick={createPurchase}>Comprar</Button>
			</div>



		</>

	);
};

export default NewPurchase;
