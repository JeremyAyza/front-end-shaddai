import React, { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { getAllSales } from '../../../data/actions';
import Filters from '../../filters/Filters'
import RowSale from './RowSale'

function TableSales() {

	
	const sales = useSelector((state) => state.admin.sales);
	const dispatch = useDispatch();

	useEffect(() => {
		console.log('===================');
		dispatch(getAllSales());
	},[dispatch]);



	
	return (
		<>
			<div className="container bg-success  mini-header text-white  mb-2 p-1 px-2 ">
				<h6 className=" m-0 ">Lista Ventas 📈</h6>
				<div className="">
					
				</div>
			</div>
			<Table striped bordered hover responsive size="sm" className='t-nowrap'>
				<thead>
					<tr>
						<th>#</th>
						<th>Usuario</th>
						<th>Direccion</th>
						<th>Estado</th>
						<th>Pagada</th>
						<th colSpan={2}>Acciones</th>


					</tr>
				</thead>
				<tbody>
					{
						(sales || []).map((sale, i) => {
							return <RowSale key={i} sale={sale} i={i} />
						})
					}
				</tbody>
			</Table>
		</>
	)
}

export default TableSales