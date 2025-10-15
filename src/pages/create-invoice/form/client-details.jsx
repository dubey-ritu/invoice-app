import { Stack } from '@mui/joy';
import { useFormContext } from 'react-hook-form';
import Accordion from '../../../components/accordion';
import TextField from '../../../components/text-field'
import TextArea from '../../../components/textarea';
import Person from '@mui/icons-material/Person';

const ClientDetails = () => {
	const formKey = "clientDetails";

	const { 
		register, 
		formState: {
			errors,
		}, 
	} = useFormContext();

	const clientDetailsErrors = errors?.[formKey];

	return (
		<Accordion
			icon={<Person />}
			label="Client Details"
			description="Enter your client's name and billing address."
		>
			<Stack 
				spacing={1}
			>
				<TextField
					label="Client Name"
					inputProps={{ ...register(`${formKey}.name`) }}
					error={!!clientDetailsErrors?.name}
					helperText={clientDetailsErrors?.name?.message}
					required
				/>
				<TextArea
					label="Client Address"
					inputProps={{ ...register(`${formKey}.address`) }}
					error={!!clientDetailsErrors?.address}
					helperText={clientDetailsErrors?.address?.message}
					minRows={2}
					maxRows={5}
					required
				/>
			</Stack>
		</Accordion >
	)
};

export default ClientDetails;