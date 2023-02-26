import React from 'react'
import { Button, Table } from 'react-bootstrap'
import Filters from '../filters/Filters'
import RowProducts from './RowProducts'

function TableProduct({ products }) {




	//const products = [{ valor: 1 }, { valor: 2}]
	return (
		<>
			<div className="container bg-success  mini-header text-white  mb-2 p-1 px-2 ">
				<h6 className=" m-0 ">Lista Productos 📈</h6>
				<div className="">
					<Button
						size="sm"
						variant="outline-light"
						onClick={() => window.scrollTo(0, 0)} >Ir al Registro</Button>
				</div>
			</div>
			<Filters />
			<Table striped bordered hover responsive size="sm" className='t-nowrap'>
				<thead>
					<tr>
						<th>#</th>
						<th>Proveedor</th>
						<th>Nombre</th>
						<th>Cantidad</th>
						<th>Precio</th>
						<th>P. Venta</th>
						<th>Vendidos</th>

						<th colSpan={3} style={{ maxWidth: "100px" }} >Opciones</th>
					</tr>
				</thead>
				<tbody>
					{
						products.map((product, i) => {
							return <RowProducts key={i} product={product} i={i} />
						})
					}
				</tbody>
			</Table>
		</>
	)
}

export default TableProduct