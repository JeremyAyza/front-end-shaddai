import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link} from 'react-router-dom';
import { deleteProduct, deleteProvider, setProductToEdit, setProviderToEdit } from '../../../data/actions';

export default function RowProvider({ provider,i}) {
	const dispatch = useDispatch();
	
	//const category = useSelector((state) =>
	//	state.products.categories.find((e) => e._id === product.category)
	//);

	return (
		<tr className='t-nowrap'>
			<td className="">{i+1}</td>
			<td className=" " >{provider.name || "proveedor"}</td>
			<td className="" >{provider.email}</td>
			<td className="" >{provider.phone}</td>
			<td className="" >{provider.ruc}</td>
			<td className="" >{provider.address}</td>
			

			{/*<td>
				<Link to={`/product/${provider._id}`} className="btn btn btn-outline-info px-2" >
					📓 Más Detalles
				</Link>
			</td>*/}

			<td>
				<Link to={`/dashboard/admin/purchase/new/${provider._id}`} className="btn btn btn-outline-info px-2" >
					📦 Comprar Productos
				</Link>
			</td>
			<td>
				<Button 
				variant='outline-warning' 
				className="px-2 "
					onClick={()=>{
							dispatch(setProviderToEdit(provider))
							window.scrollTo(0,0);						
						} }>
					🖊 Actualizar
				</Button>
			</td>
			
			{/*<td>
				<Button 
					variant="outline-danger" 
					className="px-2"
					onClick={() => dispatch(deleteProvider(provider._id))}>
					
					🗑 Eliminar
				</Button>
				
			</td>*/}

			
			
		</tr>
	)
}
