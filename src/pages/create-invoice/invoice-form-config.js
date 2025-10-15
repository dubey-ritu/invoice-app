import * as Yup from 'yup';
import { currencies } from '../../constants';


export const invoiceDefaultValue = {
	companyDetails: {
		name: "Your Company Name",
		address: "123 Main Street, City, ZIP",
	},
	clientDetails: {
		name: "Client Name",
		address: "456 Client Road, City, ZIP",
	},
	invoiceDetails: {
		prefix: "INV-",
		number: "1001",
		currency: currencies[4].value,
		invoiceDate: new Date().toISOString().split("T")[0],
		dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
	},
	invoiceItems: [],
	otherDetails: {
		paymentInstructions: "Please make payment via bank transfer to...",
		notes: "Thank you for your business!",
	},
};

export const invoiceSchema = Yup.object().shape({
	companyDetails: Yup.object().shape({
		name: Yup.string()
			.required('Company name is required'),
		address: Yup.string()
			.required('Company address is required')
			.max(200),
	}),
	clientDetails: Yup.object().shape({
		name: Yup.string()
			.required('Client name is required'),
		address: Yup.string()
			.required('Client address is required')
			.max(200),
	}),
	invoiceDetails: Yup.object().shape({
		prefix: Yup.string()
			.required('Invoice prefix is required')
			.max(50),
		number: Yup.string()
			.required('Invoice number is required')
			.max(20),
		currency: Yup.string()
			.required('Invoice currency is required'),
		invoiceDate: Yup.string()
			.required('Invoice date is required'),
		dueDate: Yup.string()
			.required('Due date is required'),
	}),

	invoiceItems: Yup.array().of(
		Yup.object().shape({
			name: Yup.string()
				.required('Item name is required'),
			description: Yup.string()
				.max(100),
			quantity: Yup.number()
				.required('Item quantity is required')
				.min(1),
			unitPrice: Yup.number()
				.required('Item unit price is required')
				.min(1),
		})
	),
	otherDetails: Yup.object().shape({
		paymentInstructions: Yup.string()
			.max(200),
		notes: Yup.string()
			.max(200),
	}),
});