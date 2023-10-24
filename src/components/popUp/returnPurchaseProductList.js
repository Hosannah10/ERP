import { Button, Card, Col, Modal, Row, Table } from "antd";
import React, { useState } from "react";

const CustomTable = ({ list }) => {
	const columns = [
		{
			title: "Name",
			dataIndex: "product",
			key: "product",
			render: (product) => product?.name,
		},
		{
			title: " Product Quantity ",
			dataIndex: "product_quantity",
			key: "product_quantity",
		},
		{
			title: "Unit price of the Product ",
			dataIndex: "product_purchase_price",
			key: "product_purchase_price",
		},
		{
			title: " Total amount ",
			dataIndex: "",
			render: ({ product_quantity, product_purchase_price }) =>
				product_quantity * product_purchase_price,
		},
	];
	const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

	return (
		<Row>
			<Col span={24} className='mt-2'>
				<Card
					className='header-solid h-full'
					bordered={false}
					bodyStyle={{ paddingTop: "0" }}>
					<div className='col-info'>
						<Table
							loading={!list}
							columns={columns}
							dataSource={list ? addKeys(list) : []}
						/>
					</div>
				</Card>
			</Col>
		</Row>
	);
};

const ReturnPurchaseInvoiceProductList = ({ list }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<button className='btn btn-primary btn-sm' onClick={showModal}>
				view
			</button>
			<Modal
				width={1000}
				title={`View product details`}
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}>
				<CustomTable list={list} />
				<div className='text-start ms-3'>
					<h6>
					Total quantity:{"  "}{" "}
						<strong>
							{list?.reduce((acc, item) => acc + item.product_quantity, 0)}
						</strong>
					</h6>
					<h6>
					Total amount:{"  "}{" "}
						<strong>
							{list?.reduce(
								(acc, item) =>
									acc + item.product_quantity * item.product_purchase_price,
								0
							)}
						</strong>
					</h6>
				</div>
			</Modal>
		</>
	);
};

export default ReturnPurchaseInvoiceProductList;
