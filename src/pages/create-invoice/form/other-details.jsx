import { Stack } from '@mui/joy';
import { useFormContext } from 'react-hook-form';
import Accordion from '../../../components/accordion';
import TextArea from '../../../components/textarea';
import Notes from '@mui/icons-material/Notes'

const ClientDetails = () => {
	const formKey = "otherDetails";

	const { 
		register, 
		formState: {
			errors,
		}, 
	} = useFormContext();

	const otherDetailsErrors = errors?.[formKey];

	return (
		<Accordion
			icon={<Notes />}
			label="Other Details"
			description="Add payment instructions, terms, or extra notes."
		>
			<Stack 
				spacing={1}
			>
				<TextArea
					label="Payment instructions"
					inputProps={{ ...register(`${formKey}.paymentInstructions`) }}
					error={!!otherDetailsErrors?.paymentInstructions}
					helperText={otherDetailsErrors?.paymentInstructions?.message}
					minRows={2}
					maxRows={5}
				/>
				<TextArea
					label="Notes"
					inputProps={{ ...register(`${formKey}.notes`) }}
					error={!!otherDetailsErrors?.notes}
					helperText={otherDetailsErrors?.notes?.message}
					minRows={2}
					maxRows={5}
				/>
			</Stack>
		</Accordion >
	)
};

export default ClientDetails;