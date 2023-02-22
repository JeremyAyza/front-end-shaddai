import React from 'react'
import { Table } from 'react-bootstrap'
import RowProducts from './RowProducts'

function TableProduct({ products }) {
	//const products = [{ valor: 1 }, { valor: 2}]
	return (
		<Table striped bordered hover size="sm">
			<thead>
				<tr>
					<th>#</th>
					<th>Proveedor</th>
					<th>Nombre</th>
					<th>Cantidad</th>
					<th>Precio</th>
					<th>Vendidos</th>
					
					<th colSpan={3} style={{ maxWidth: "100px" }} >Opciones</th>
				</tr>
			</thead>
			<tbody>
				{
					products.map((product,i) => {
						return <RowProducts key={i} product={product} i={i} />
					})
				}
			</tbody>
		</Table>
	)
}

export default TableProduct