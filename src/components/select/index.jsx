import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import MuiSelect from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { Controller } from 'react-hook-form';

const Select = (props) => {
	const {
		options = [],
		label = "",
		helperText = "",
		selectProps = {},
		controllerProps = null,
		error = false,
		required = false,
	} = props;

	return (
		<FormControl error={error}>
			<FormLabel required={required}>
				{label}
			</FormLabel>
			{controllerProps ? (
				<Controller
					{...controllerProps}
					render={({ field }) => (
						<MuiSelect
							{...selectProps}
							{...field}
							value={field.value || ''}
							onChange={(_, value) => field.onChange(value)}
						>
							{options.map(option => (
								<Option value={option.value}>{option.label}</Option>
							))}
						</MuiSelect>
					)}
				>
				</Controller>
			) : (
				<MuiSelect
					{...selectProps}
				>
					{options.map(option => (
						<Option value={option.value}>{option.label}</Option>
					))}
				</MuiSelect>
			)}
			<FormHelperText>{helperText}</FormHelperText>
		</FormControl>
	);
}

export default Select;