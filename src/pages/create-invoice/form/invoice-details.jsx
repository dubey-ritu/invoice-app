import { Stack } from '@mui/joy';
import { useFormContext } from 'react-hook-form';
import Accordion from '../../../components/accordion';
import TextField from '../../../components/text-field'
import Description from '@mui/icons-material/Description'
import Select from '../../../components/select';
import { currencies } from '../../../constants';

const InvoiceDetails = () => {
	const formKey = "invoiceDetails";

	const { 
		control,
		register, 
		formState: {
			errors,
		}, 
	} = useFormContext();

	const invoiceDetailsErrors = errors?.[formKey];

	return (
		<Accordion
			icon={<Description />}
			label="Invoice Details"
			description="Set invoice number, dates, and currency for the invoice."
		>
			<Stack 
				spacing={1}
			>
				<TextField
					label="Invoice prefix"
					inputProps={{ ...register(`${formKey}.prefix`) }}
					error={!!invoiceDetailsErrors?.prefix}
					helperText={invoiceDetailsErrors?.prefix?.message}
					required
				/>
				<TextField
					label="Invoice number"
					inputProps={{ ...register(`${formKey}.number`) }}
					error={!!invoiceDetailsErrors?.number}
					helperText={invoiceDetailsErrors?.number?.message}
					required
				/>
				<Select
					label="Currency"
					options={currencies}
					controllerProps={{ 
						control: control,
						name: `${formKey}.currency`,
					}}
					error={!!invoiceDetailsErrors?.currency}
					helperText={invoiceDetailsErrors?.currency?.message}
					required
				/>
				<TextField
					label="Invoice date"
					inputProps={{ 
						type: "date",
						...register(`${formKey}.invoiceDate`)
					}}
					error={!!invoiceDetailsErrors?.invoiceDate}
					helperText={invoiceDetailsErrors?.invoiceDate?.message}
					required
				/>
				<TextField
					label="Due date"
					inputProps={{ 
						type: "date",
						...register(`${formKey}.dueDate`)
					}}
					error={!!invoiceDetailsErrors?.dueDate}
					helperText={invoiceDetailsErrors?.dueDate?.message}
					required
				/>
			</Stack>
		</Accordion >
	)
};

export default InvoiceDetails;