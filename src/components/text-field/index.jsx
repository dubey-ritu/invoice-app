import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';

const TextField = (props) => {
	const {
		label,
    required = false,
		inputProps,
		helperText,
		error = false,
	} = props;

  return (
    <FormControl error={error}>
      <FormLabel required={required}>
        {label}
      </FormLabel>
      <Input 
        {...inputProps}
        required={required}
      />
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default React.memo(TextField);