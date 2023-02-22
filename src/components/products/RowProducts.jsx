import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { BsPen, BsTrashFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteProduct, setProductToEdit, showModalProducts } from '../../data/actions';
import ProductForm from '../admin/ProductForm';

export default function RowProducts({product,i}) {
	const dispatch = useDispatch();
	
	//const category = useSelector((state) =>
	//	state.products.categories.find((e) => e._id === product.category)
	//);




	
	
	return (
		<tr>
			<td className="text-center">{i}</td>
			<td className="text-center" >{product.provider || "proveedor"}</td>
			<td className="text-center" >{product.name}</td>
			<td className="text-center" >{product.quantity}</td>
			<td className="text-center" >S/. {product.price}</td>
			<td className="text-center" >{product.sold}</td>
			

			<td>
				<Link to={`/product/${product._id}`} className="btn btn btn-outline-info px-2" >
					📓 Más Detalles
				</Link>
			</td>
			<td>
				<Button 
				variant='outline-warning' 
				className="px-2 "
					onClick={()=>{dispatch(setProductToEdit(product))} }>
					🖊 Actualizar
				</Button>
			</td>
			
			<td>
				<Button 
					variant="outline-danger" 
					className="px-2"
					onClick={() => dispatch(setProductToEdit(product))}>
					
					🗑 Eliminar
				</Button>
				
			</td>

			
			
		</tr>
	)
}
