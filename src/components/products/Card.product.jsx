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
					variant="primary"
					className="shadow px-3"
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

			<Card className="card bg-light shadow border ">

				<Card.Img className="img-card" src={photo} />
				<Card.Body className="card-body text-center  d-flex flex-column justify-content-center">
					<Card.Title className="fs-6 text-success">{name}</Card.Title>
					<Card.Text className="fs-6 success">Precio: S/. {price}</Card.Text>
					<Card.Text className="d-flex justify-content-around w-100%  py-2 ">
						<ModalInfo></ModalInfo>

						{
							quantity === 0 ? (

								<Button
									variant="danger"
									className="disable shadow"
									onClick={() => toast.warn("Producto agotado")}>
									Agotado
								</Button>
							)
								:
								(
									<Button
										variant={inCart ? "outline-danger" : "success"}
										onClick={inCart ? handleRemoveFromCart : handleAddCart}
										className="shadow px-3"
										size="sm"
									>
										{inCart ? <BsCartDashFill /> : <BsFillCartPlusFill />}

									</Button>
								)
						}


					</Card.Text>
				</Card.Body>

			</Card>
			
		</>
	);
};

export default CardProduct;
