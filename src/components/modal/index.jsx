import MuiModal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import { ModalClose } from '@mui/joy';

const Modal = (props) => {
	const {
		open,
		onClose,
		title = "",
		description = "",
		size = "md",
		children,
	} = props;

  return (
		<MuiModal open={open} onClose={onClose}>
			<ModalDialog size={size}>
				<ModalClose />
				<DialogTitle>{title}</DialogTitle>
				<DialogContent>{description}</DialogContent>
				{children}
			</ModalDialog>
		</MuiModal>
  );
};

export default Modal;