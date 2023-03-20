import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createOrder } from "../../data/actions";
import FormInput from "../inputs/input.component";
import Loader from "../loader/Loader";

const initialState = {
  country: "",
  city: "",
  address: "",
  reference: "",
};

const validateForm = (form) => {
  const { country, city, address, reference } = form;
  const errors = {};

  if (!country) {
    errors.country = "Campo requerido";
  }
  if (!city) {
    errors.city = "Campo requerido";
  }
  if (!address) {
    errors.address = "Campo requerido";
  }
  if (!reference) {
    errors.reference = "Campo requerido";
  }

  return errors;
};

const OrderForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const cart = useSelector((state) => state.products.cart);
  const loadingOrder = useSelector((state) => state.orders.loadingOrders);
  const createdOrder = useSelector((state) => state.orders.createdOrder);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newForm = { ...form, [name]: value };

    setForm(newForm);
    setErrors(validateForm(newForm));
  };

  const handleCancelar = (e) => {
    navigate("/");
    toast.info("Se ha cancelado la orden");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentErrors = validateForm(form);
    setErrors(currentErrors);

    if (Object.keys(currentErrors).length) {
      toast.warn("El formulario contiene errores");
    } else {
      const order = {
        ...form,
        products: cart.map((e) => ({
          productId: e._id,
          quantity: e.quantity,
        })),
      };
      dispatch(createOrder(order));
    }
  };

  useEffect(() => {
    if (createdOrder) {
      navigate(`/order/${createdOrder._id}`);
    }
  }, [loadingOrder, createdOrder, navigate]);

  return (
		<div className="container">
			<div className="card p-3">
				<h2 className="card-title">Productos a comprar</h2>
				{cart.length ? (
					<table className="table table-striped responsive">
						<thead>
							<tr>
								<th>Nombre</th>
								<th>Cantidad</th>
								<th>Precio Unitario</th>
								<th>Subtotal</th>
							</tr>
						</thead>
						<tbody>
							{cart.map((item) => (
								<tr key={item._id}>
									<td>{item.name}</td>
									<td>{item.quantity}</td>
									<td>{item.price}</td>
									<td>{item.price * item.quantity}</td>
								</tr>
							))}
							<tr>
								<td colSpan="3" className="text-end fw-bold">Total:</td>
								<td className="fw-bold">{cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}</td>
							</tr>
						</tbody>
					</table>
				) : (
					<p className="text-muted">No hay productos en el carrito</p>
				)}
				{loadingOrder && <Loader />}
			</div>

			<div className="card mt-3 p-3">
				<h2 className="card-title">Dirección de envío</h2>
				<form onSubmit={handleSubmit}>
					<div className="row g-3">
						<div className="col-md-6 " disabled >
							<FormInput
								type="text"
								title="País"
								name="country"
								disabled 
								placeholder="Perú"
								value={form.country}
								handleChange={handleChange}
							/>
							{errors.country && <div className="text-danger">{errors.country}</div>}
						</div>
						<div className="col-md-6">
							<FormInput
								type="text"
								title="Ciudad"
								name="city"
								placeholder="Loja"
								value={form.city}
								handleChange={handleChange}
							/>
							{errors.city && <div className="text-danger">{errors.city}</div>}
						</div>
						<div className="col-md-12">
							<FormInput
								type="text"
								title="Dirección"
								name="address"
								placeholder="Av. Occidental y Luis Crespo"
								value={form.address}
								handleChange={handleChange}
							/>
							{errors.address && <div className="text-danger">{errors.address}</div>}
						</div>
						<div className="col-md-12">
							<FormInput
								type="text"
								title="Referencia"
								name="reference"
								placeholder="Junto a la tienda Camila..."
								value={form.reference}
								handleChange={handleChange}
							/>
							{errors.reference && <div className="text-danger">{errors.reference}</div>}
						</div>
						<div className="col-md-12">
							<div className="d-grid gap-2 d-md-flex justify-content-md-end">
								<button className="btn btn-primary me-md-2" type="submit">Guardar datos</button>
								<button className="btn btn-danger" type="button" onClick={handleCancelar}>Cancelar</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>

  );
};

export default OrderForm;
