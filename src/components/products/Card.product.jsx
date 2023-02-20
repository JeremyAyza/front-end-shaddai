import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, delFromCart } from "../../data/actions";
import { toast } from "react-toastify";
import { Button, Card, Modal, Table } from "react-bootstrap";
import { BsCartDashFill, BsFillCartPlusFill } from "react-icons/bs";

const CardProduct = ({ product }) => {

	const { name, photo, price, description, _id, quantity } = product;
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.products.cart);
	const [inCart, setInCart] = useState(cart.find((e) => e._id === _id));
	const [show, setShow] = useState(false);

	const handleAddCart = (e) => {
		dispatch(addToCart(_id));
		setInCart(true);
	};

	const handleRemoveFromCart = (e) => {
		dispatch(delFromCart(_id, true));
		setInCart(false);
	};


	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);



	const ModalInfo = () => {

		return (
			<>
				<Button
					variant="outline-primary"
					className="shadow"
					onClick={handleShow}
					size="sm"


				>Info</Button>



				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Información del producto</Modal.Title>
					</Modal.Header>
					<Modal.Body>

						<Table striped bordered hover>

							<tbody>
								<tr>
									<td>Nombre</td>
									<td>{name}</td>
								</tr>
								<tr>
									<td>Precio</td>
									<td>{price}</td>
								</tr>
								<tr>
									<td>Cantidad</td>
									<td>{quantity}</td>
								</tr>
								<tr>
									<td>Descripcion</td>
									<td>{description}</td>
								</tr>
							</tbody>
						</Table>

					</Modal.Body>
					<Modal.Footer>
						<Button
							className="rounded shadow"
							variant="secondary"
							onClick={handleClose}>
							Close
						</Button>
						{/*<Button variant="primary" onClick={handleClose}>
							Save Changes
						</Button>*/}
					</Modal.Footer>
				</Modal>
			</>
		);

	}

	return (
		<>

			<Card className="card bg-light shadow border">

				<Card.Img className="img-card" src={photo} />
				<Card.Body className="card-body text-center  d-flex flex-column justify-content-center">
					<Card.Title className="fs-6 text-success">{name}</Card.Title>
					<Card.Text className="fs-6 success">Precio: S/. {price}</Card.Text>
					<Card.Text className="d-flex justify-content-around w-100%  py-2 ">
						<ModalInfo></ModalInfo>

						{
							quantity === 0 ? (

								<Button
									className="outline-danger shadow"
									onClick={() => toast.warn("Producto agotado")}>
									Agotado
								</Button>
							)
								:
								(
									<Button
										variant={inCart ? "outline-danger" : "outline-success"}
										onClick={inCart ? handleRemoveFromCart : handleAddCart}
										className="shadow"
										size="sm"
									>
										{inCart ? <BsCartDashFill /> : <BsFillCartPlusFill />}

									</Button>
								)
						}


					</Card.Text>
				</Card.Body>

			</Card>
			{/*<div className="col-md-3" key={product._id}>
				<div className="card mt-4 mb-4 ms-3 rounded-15">
					<div className="card-header">
						<Link style={{ textDecoration: "none" }} to={`/product/${_id}`}>
							<h5 className="textToReduce">{name}</h5>
						</Link>
						<span className="badge rounded-15 bg-success">$ {price}</span>
					</div>
					<div className="card-body">
						<img className="img-fluid imagen" src={photo} alt="" />
						<div className="dropend b-grid">
							<button
								className="btn btn-info dropdown-toggle"
								type="button"
								id={"dropdownMenu" + _id}
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								<span className="textToReduce">Descripcion</span>
							</button>
							<ul
								className="dropdown-menu bg-secondary"
								aria-labelledby={"dropdownMenu" + _id}
							>
								<p className="ps-2 pe-2 text-light text-justify">{description}</p>
							</ul>
						</div>
					</div>
					<div className="card-footer">
						{quantity === 0 ? (
							<button
								className="btn btn-warning"
								onClick={() => toast.warn("Producto agotado")}
							>
								Agotado
							</button>
						) : (
							<button
								className="btn btn-primary"
								onClick={inCart ? handleRemoveFromCart : handleAddCart}
							>
								<span className="textToReduce">
									{inCart ? "Quitar del carrito" : "Añadir al carrito"}
								</span>
							</button>
						)}
					</div>
				</div>
			</div>*/}
		</>
	);
};

export default CardProduct;
