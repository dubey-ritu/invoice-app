import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import MuiTextArea from '@mui/joy/Textarea';

const TextArea = (props) => {
	const {
		label,
    required = false,
		inputProps,
		helperText,
		error = false,
    maxRows = 10,
    minRows = 4,
	} = props;

  return (
    <FormControl error={error}>
      <FormLabel required={required}>
        {label}
      </FormLabel>
      <MuiTextArea 
        minRows={minRows} 
        maxRows={maxRows}
        required={required}
        {...inputProps}
      />
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default React.memo(TextArea);