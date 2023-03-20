import axios from 'axios';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import { BASEURL } from '../../../assets/constants';
import { deleteOrder, deleteProduct, getAllSales, setProductToEdit } from '../../../data/actions';
import getHeaderToken from '../../../helpers/getHeaderToken';

export default function RowSale({sale,i}) {
	const dispatch = useDispatch();
	
	//const category = useSelector((state) =>
	//	state.products.categories.find((e) => e._id === product.category)
	//);

	

	const handleChange = async (e, id) => {
		const { value } = e.target;

		try {
			await axios.put(
				`${BASEURL}/order/${id}`,
				{ status: value },
				getHeaderToken()
			);
			toast.success(
				`Se ha marcado como ${value === "PENDING" ? "pendiente" : "entregada"}`
			);
			dispatch(getAllSales());
		} catch (err) {
			toast.error("No se ha podido editar la orden");
			console.log(err);
		}
	};

	return (
		<tr className='t-nowrap'>
			<td className="">{i+1}</td>
			<td className="" >{sale.user.name}</td>
			<td className="" >{sale.city},{sale.country} - {sale.address} <br /> {sale.reference}  </td>
			<td className="" >
				<select
					name="stateProduct"
					className="form-select"
					onChange={(e) => handleChange(e, sale._id)}
					value={sale.status}
				>
					<option value="PENDING">Pendiente</option>
					<option value="COMPLETED">Entregado</option>
				</select>
			</td>
			<td className="">{sale.paid ? "Si" : "No"}</td>
			
			<td>
				<Link to={`/order/${sale._id}`} className="btn btn btn-outline-info px-2" >
					📓 Más Detalles
				</Link>
			</td>
			<td>
				<Button
					variant="outline-danger"
					className="px-2"
					onClick={() => {
						dispatch(deleteOrder(sale._id));
						dispatch(getAllSales());
					}}
				>

					🗑 Eliminar
				</Button>

			</td>
			

			{/*<td>
				<Link to={`/product/${product._id}`} className="btn btn btn-outline-info px-2" >
					📓 Más Detalles
				</Link>
			</td>
			<td>
				<Button 
				variant='outline-warning' 
				className="px-2 "
					onClick={()=>{
							dispatch(setProductToEdit(product))
							window.scrollTo(0,0);						
						} }>
					🖊 Actualizar
				</Button>
			</td>
			
			<td>
				<Button 
					variant="outline-danger" 
					className="px-2"
					onClick={() => dispatch(deleteProduct(product._id))}>
					
					🗑 Eliminar
				</Button>
				
			</td>*/}

			
			
		</tr>
	)
}
