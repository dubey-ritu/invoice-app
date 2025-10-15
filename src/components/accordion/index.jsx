import MuiAccordion from '@mui/joy/Accordion';
import Avatar from '@mui/joy/Avatar';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary from '@mui/joy/AccordionSummary';

const Accordion = (props) => {
	const {
		icon,
		iconColor = "primary",
		label,
		description,
		children
	} = props;

	return (
		<MuiAccordion>
			<AccordionSummary>
				<Avatar color={iconColor}>
					{icon}
				</Avatar>
				<ListItemContent>
					<Typography level="title-md">{label}</Typography>
					<Typography level="body-sm">{description}</Typography>
				</ListItemContent>
			</AccordionSummary>
			<AccordionDetails>
				{children}
			</AccordionDetails>
		</MuiAccordion>
	);
};

export default Accordion;