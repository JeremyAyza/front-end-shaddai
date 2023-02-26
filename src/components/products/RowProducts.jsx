import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link} from 'react-router-dom';
import { deleteProduct, setProductToEdit } from '../../data/actions';

export default function RowProducts({product,i}) {
	const dispatch = useDispatch();
	
	//const category = useSelector((state) =>
	//	state.products.categories.find((e) => e._id === product.category)
	//);

	return (
		<tr className='t-nowrap'>
			<td className="">{i+1}</td>
			<td className=" " >{product.provider.name || "proveedor"}</td>
			<td className="" >{product.name}</td>
			<td className="" >{product.quantity}</td>
			<td className="" >S/. {product.price}</td>
			<td className="" >{product.purchase_price}</td>
			<td className="" >{product.sold}</td>
			

			<td>
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
				
			</td>

			
			
		</tr>
	)
}
