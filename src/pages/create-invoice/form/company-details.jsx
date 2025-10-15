import { Stack } from "@mui/joy";
import { useFormContext } from "react-hook-form";
import Accordion from "../../../components/accordion";
import TextField from "../../../components/text-field";
import TextArea from "../../../components/textarea";
import Business from "@mui/icons-material/Business";

const CompanyDetails = () => {
	const formKey = "companyDetails";

	const { 
		register, 
		formState: {
			errors,
		}, 
	} = useFormContext();

	const companyDetailsErrors = errors?.[formKey];

	return (
		<Accordion
			icon={<Business />}
			label="Company Details"
			description="Add your business name and address for the invoice sender section."
		>
			<Stack 
				spacing={1}
			>
				<TextField
					label="Company Name"
					inputProps={{ ...register(`${formKey}.name`) }}
					error={!!companyDetailsErrors?.name}
					helperText={companyDetailsErrors?.name?.message}
					required
				/>
				<TextArea
					label="Company Address"
					inputProps={{ ...register(`${formKey}.address`) }}
					error={!!companyDetailsErrors?.address}
					helperText={companyDetailsErrors?.address?.message}
					minRows={2}
					maxRows={5}
					required
				/>
			</Stack>
		</Accordion >
	)
};

export default CompanyDetails;