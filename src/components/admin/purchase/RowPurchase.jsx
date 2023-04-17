import { Button } from 'react-bootstrap';
import { Link} from 'react-router-dom';

export default function RowPurchase({product,i}) {
	
	//const category = useSelector((state) =>
	//	state.products.categories.find((e) => e._id === product.category)
	//);

	return (
		<tr className='t-nowrap'>
			<td className="">{i+1}</td>
			<td className="" >{product.name}</td>
			<td className="" >S/. {product.price}</td>
			<td className="" >S/. {product.purchase_price}</td>
			<td className="" >{product.quantity}</td>

			

			<td>
				<Link to={`/product/${product._id}`} className="btn btn btn-outline-info px-2" >
					📓 Más Detalles
				</Link>
			</td>
			
			<td>
				<Button 
					variant="outline-danger" 
					className="px-2"
					//onClick={() => dispatch(deleteProduct(product._id))}
					>
					🗑 Eliminar
				</Button>
				
			</td>

			
			
		</tr>
	)
}
