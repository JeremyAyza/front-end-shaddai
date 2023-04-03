import axios from "axios";
import React, { useEffect, useState } from "react";
import {useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BASEURL } from "../assets/constants";
import Loader from "../components/loader/Loader";
import { addToCart, delFromCart } from "../data/actions";

const Productdetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { name, description, price, provider,category, quantity, photo } = product || {};
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.products.cart);
  const [inCart, setInCart] = useState(cart.find((e) => e._id === id));

  const handleAddCart = (e) => {
    dispatch(addToCart(id));
    setInCart(true);
  };

  const handleRemoveFromCart = (e) => {
    dispatch(delFromCart(id, true));
    setInCart(false);
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await axios.get(`${BASEURL}/product/${id}`);
        setProduct({ ...data });
      } catch (err) {
        toast.error("No se ha obtener la información del producto");
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  return loading ? (
    <Loader />
  ) : product ? (
			<div className="container p-5">
				<div className="row g-5">
					<div className="col-md-5 d-flex align-items-center">
						<img src={photo} alt={name} className="img-fluid rounded-start" style={{ maxHeight: "300px" }} />
					</div>
					<div className="col-md-7 d-flex align-items-center">
						<div className="container-fluid">
							<h2 className="mb-3">{name}</h2>
							<ul className="list-group">
								<li className="list-group-item border-0  border bg-bone ">
									ℹ Descripción: <br />{description}
								</li>
								<li className="list-group-item border-0  border bg-bone ">
									ℹ Precio: {price}
								</li>
								<li className="list-group-item border-0  border bg-bone ">
									ℹ Categoría: {category.name}
								</li>
								<li className="list-group-item border-0  border bg-bone ">
									ℹ Proveedor: {provider.name}
								</li>
								<li className="list-group-item border-0  border bg-bone ">
									ℹ Cantidad: {quantity}
								</li>
							</ul>
							<div className="mt-3">
								{quantity > 0 ? (
									inCart ? (
										<button className="btn btn-outline-danger" onClick={handleRemoveFromCart}>
											<i className="bi bi-cart-x me-2"></i>Quitar del carrito
										</button>
									) : (
										<button className="btn btn-outline-primary" onClick={handleAddCart}>
											<i className="bi bi-cart-plus me-2"></i>Añadir al carrito
										</button>
									)
								) : (
									<button className="btn btn-outline-secondary" onClick={() => toast.warn("Ya no quedan más unidades en stock. Lamentamos las molestias")}>
										<i className="bi bi-emoji-frown me-2"></i>Producto agotado
									</button>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>


  ) : (
    <div>
      <h3>404</h3>
      <div>Producto no encontrado</div>
    </div>
  );
};

export default Productdetail;
