import React from 'react'
import { Button, Table } from 'react-bootstrap'
import FiltersProvider from '../../filters/FiltersProvider'
import RowProvider from './RowProvider'

function TableProvider({ providers }) {




	return (
		<>
			<div className="container bg-success  mini-header text-white  mb-2 p-1 px-2 ">
				<h6 className=" m-0 ">Lista Proveedor 📈</h6>
				<div className="">
					<Button
						size="sm"
						variant="outline-light"
						onClick={() => window.scrollTo(0, 0)} >Ir al Registro</Button>
				</div>
			</div>
			<FiltersProvider />
			<Table striped bordered hover responsive size="sm" className='t-nowrap'>
				<thead>
					<tr>
						<th>#</th>
						<th>Proveedor</th>
						<th>Email</th>
						<th>Phone</th>
						<th>Ruc</th>
						<th>Dirección</th>
						<th colSpan={3} style={{ maxWidth: "100px" }} >Opciones</th>
					</tr>
				</thead>
				<tbody>
					{
						providers.map((provider, i) => {
							return <RowProvider key={i} provider={provider} i={i} />
						})
					}
				</tbody>
			</Table>
		</>
	)
}
//
export default TableProvider