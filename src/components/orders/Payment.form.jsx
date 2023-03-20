import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {  Elements,  CardElement,  useStripe,  useElements} from "@stripe/react-stripe-js";
import axios from "axios";
import Loader from "../loader/Loader";
import getHeaderToken from "../../helpers/getHeaderToken";
import { BASEURL, PUBLIC_KEY_STRIPE } from "../../assets/constants";
import { toast } from "react-toastify";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllOrdersByUser } from "../../data/actions";




const stripePromise = loadStripe(PUBLIC_KEY_STRIPE);
console.log({ stripePromise });

const CheckoutForm = ({ orderId, amount, setPaid }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
		console.log('=================');
		console.log({response});
		console.log('=================');

		const { error, paymentMethod }=response
    setLoading(true);

    if (!error) {
      const { id } = paymentMethod;
      try {
        const { data } = await axios.post(
          `${BASEURL}/payment`,
          {
            processId: id,
            orderId,
          },
          getHeaderToken()
        );
        console.log(data);
        toast.info(data);
        elements.getElement(CardElement).clear();
        dispatch(getAllOrdersByUser());
      } catch (error) {
        console.log(error.response.data);
        toast.error(error.response.data);
      } finally {
        setLoading(false);
        setPaid(true);
      }
    }
  };

  return (
		<div className="">
			<form className="form" onSubmit={handleSubmit}>
				<table className="table align-middle">
					<tbody>
						<tr>
							<td>Número de Tarjeta</td>
							<td>Fecha / Codigo Postal</td>
						</tr>
						<tr>
							<td colSpan={2}>
								<div className="p-2">
									<CardElement className="form-control" />
								</div>
							</td>
						</tr>
					</tbody>
				</table>
				<button className="btn btn-success w-100" disabled={!stripe}>
					{loading ? <Loader /> : `Comprar S/${amount}`}
				</button>
			</form>
		</div>

  );
};

function PaymentForm() {
  const { orderId } = useParams();
  const [searchParams] = useSearchParams();
  const [paid, setPaid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    paid && navigate(`/order/${orderId}`);
  }, [paid, navigate, orderId]);

  return (
		<Elements stripe={stripePromise}>
			<div className="container my-3">
				<div className="row justify-content-center">
					<div className="col-lg-6 col-md-8 col-sm-10">
						<div className="card shadow-lg p-3 mb-5 bg-white rounded-15">
							<h2 className="card-header text-center">Ingrese su Tarjeta</h2>
							<div className="card-body border">
								
								<CheckoutForm
									setPaid={(value) => setPaid(value)}
									orderId={orderId}
									amount={searchParams.get("amount")}
								/>
							</div>
							
						</div>
					</div>
				</div>
			</div>
		</Elements>



  );
}

export default PaymentForm;
