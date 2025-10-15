import MuiCheckbox from '@mui/joy/Checkbox';

const Checkbox = (props) => {
	const {
		label = "",
		...rest
	} = props;

  return (
    <MuiCheckbox 
			label={label}
			{...rest}
		/>
  );
};

export default Checkbox;