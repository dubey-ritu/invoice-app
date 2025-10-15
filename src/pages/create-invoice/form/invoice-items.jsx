import { useMemo, useState } from 'react';
import { Box, Typography, Stack, Card, CardContent, CardActions, Button } from '@mui/joy';
import { useFormContext, useFieldArray, useWatch } from 'react-hook-form';
import Add from '@mui/icons-material/Add';
import ShoppingCart from '@mui/icons-material/ShoppingCart'
import Accordion from '../../../components/accordion';
import TextField from '../../../components/text-field'
import Modal from '../../../components/modal';

const InvoiceItems = () => {
	const formKey = "invoiceItems";

	const [editInvoiceItemIndex, setEditInvoiceItemIndex] = useState(-1);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { 
		control, 
		register,
		formState: {
			errors,
		},  
	} = useFormContext();
	const { fields, append, remove } = useFieldArray({
		control,
		name: formKey,
	});
	const invoiceItems = useWatch({ name: formKey });

	const invoiceItemErrors = errors?.[formKey]?.[editInvoiceItemIndex];

	const getFormKey = (key) => (
		`${formKey}.${editInvoiceItemIndex}.${key}`
	);

	const handleAddInvoiceItemClick = () => {
		append({
			name: "",
			description: "",
			quantity: 1,
			unitPrice: 1,
		});
		setEditInvoiceItemIndex(fields.length);
		setIsModalOpen(true);
	};

	const handleEditInvoiceItemClick = (index) => {
		setEditInvoiceItemIndex(index);
		setIsModalOpen(true);
	};

	const handleDeleteInvoiceItemClick = (index) => {
		remove(index);
	};

	const handleModalCancel = () => {
		setIsModalOpen(false);
		setEditInvoiceItemIndex(null);
		if(invoiceItemErrors) {
			remove(editInvoiceItemIndex);
		}
	};

	const handleModalAdd = () => {
		setIsModalOpen(false)
	};

	const isAddDisabled = useMemo(() => {
		if(invoiceItemErrors) return true;
		const invoiceItem = invoiceItems?.[editInvoiceItemIndex];
		if(invoiceItem){
			return false;
		}
		return false;
	}, [invoiceItems, editInvoiceItemIndex, invoiceItemErrors]);

	return (
		<Accordion
			icon={<ShoppingCart />}
			label="Invoice Items"
			description="List the products or services being invoiced."
		>
			{invoiceItems.length !== 0 && (
				<Stack
					spacing={1}
					sx={{
						marginBottom: 1.5,
					}}
				>
					{invoiceItems.map((entry, index) => (
						<Card variant="outlined">
							<CardContent>
								<Typography level="title-md">{entry.name}</Typography>
								<Typography>{entry.description}</Typography>
								<Typography>Quantity: {entry.quantity}</Typography>
								<Typography>Unit price: {entry.unitPrice}</Typography>
								<CardActions buttonFlex="0 1 120px">
									<Button
										variant="soft"
										color="primary"
										size="sm"
										onClick={() => handleEditInvoiceItemClick(index)}
									>
										Edit
									</Button>
									<Button
										variant="soft"
										color="danger"
										size="sm"
										onClick={() => handleDeleteInvoiceItemClick(index)}
									>
										Delete
									</Button>
								</CardActions>
							</CardContent>
						</Card>
					))}
				</Stack>
			)}
			<Button
				variant="outlined"
				color="neutral"
				startDecorator={<Add />}
				onClick={handleAddInvoiceItemClick}
			>
				Add Item
			</Button>
			{isModalOpen && (
				<Modal
					open={isModalOpen}
					onClose={handleModalCancel}
					title="Add item"
					description="Add the product or service details you want to include in this invoice."
				>
					<Stack 
						sx={{
							marginTop: 0.5,
						}} 
						spacing={1}
					>
						<TextField
							label="Item name"
							inputProps={{ 
								...register(getFormKey("name")),
								autofocus: true,
							}}
							error={!!invoiceItemErrors?.name}
							helperText={invoiceItemErrors?.name?.message}
							required
						/>
						<TextField
							label="Item description"
							inputProps={{ ...register(getFormKey("description")) }}
							error={!!invoiceItemErrors?.description}
							helperText={invoiceItemErrors?.description?.message}
						/>
						<TextField
							label="Quantity"
							inputProps={{ 
								type: "number",
								...register(getFormKey("quantity"))
							}}
							error={!!invoiceItemErrors?.quantity}
							helperText={invoiceItemErrors?.quantity?.message}
							required
						/>
						<TextField
							label="Unit price"
							inputProps={{ 
								type: "number",
								...register(getFormKey("unitPrice"))
							}}
							error={!!invoiceItemErrors?.unitPrice}
							helperText={invoiceItemErrors?.unitPrice?.message}
							required
						/>
						<Box 
							sx={{
								display: "flex",
								justifyContent: "flex-end",
								gap: ({ spacing }) => spacing(1),
							}}
						>
								<Button
									variant="outlined"
									color="neutral"
									onClick={handleModalCancel}
								>
									Cancel
								</Button>
								<Button
									disabled={isAddDisabled}
									onClick={handleModalAdd}
								>
									Add
								</Button>
						</Box>
					</Stack>
				</Modal>
			)}
		</Accordion>
	)
};

export default InvoiceItems;