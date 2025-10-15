import { memo } from 'react';
import { AccordionGroup } from '@mui/joy';
import { accordionDetailsClasses } from '@mui/joy/AccordionDetails';
import { accordionSummaryClasses } from '@mui/joy/AccordionSummary';
import CompanyDetails from './company-details';
import ClientDetails from './client-details';
import InvoiceDetails from './invoice-details';
import InvoiceItems from './invoice-items';
import OtherDetails from './other-details';

const styles = {
	accordionGroup: {
		borderRadius: 'md',
		[`& .${accordionDetailsClasses.content}.${accordionDetailsClasses.expanded}`]:
		{
			paddingBlock: '0.8rem',
		},
		[`& .${accordionSummaryClasses.button}.${accordionDetailsClasses.expanded}`]:
		{
			bgcolor: 'background.level1',
		},
		[`& .${accordionSummaryClasses.button}`]: {
			paddingBlock: '0.5rem',
		},
	},
};

const Form = () => {
	return (
		<AccordionGroup
			transition="0.2s"
			sx={styles.accordionGroup}
		>
			<CompanyDetails />
			<ClientDetails />
			<InvoiceDetails />
			<InvoiceItems />
			<OtherDetails />
		</AccordionGroup>
	);
};

export default memo(Form);