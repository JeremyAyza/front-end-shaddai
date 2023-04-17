import React from 'react'
import { Button, Table } from 'react-bootstrap'
import RowPurchase from './RowPurchase'

function TableProductPurchase({ products }) {




	//const products = [{ valor: 1 }, { valor: 2}]
	return (
		<>
			
			<div className="container bg-success  mini-header text-white  mb-2 p-1 px-2 ">
				<h6 className=" m-0 ">Lista Productos A Comprar 📈</h6>
				<div className="">
					<Button
						size="sm"
						variant="outline-light"
						onClick={() => window.scrollTo(0, 0)} >Ir al Registro</Button>
				</div>
			</div>
			<Table striped bordered hover responsive size="sm" className='t-nowrap'>
				<thead>
					<tr>
						<th>#</th>
						<th>Nombre</th>
						<th>Precio</th>
						<th>P. Compra</th>
						<th>Unidades</th>


						<th colSpan={3} style={{ maxWidth: "100px" }} >Opciones</th>
					</tr>
				</thead>
				<tbody>
					{
						products.map((product, i) => {
							return <RowPurchase key={i} product={product} i={i} />
						})
					}
				</tbody>
			</Table>
		</>
	)
}

export default TableProductPurchase