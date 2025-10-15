import MuiMenu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';

const Menu = (props) => {
	const {
		icon = null,
		label = "",
		items = [],
		menuButtonProps = null,
	} = props;

	return (
		<Dropdown>
			<MenuButton
				variant="solid"
				color="primary"
				startDecorator={icon}
				{...menuButtonProps}
			>
				{label}
			</MenuButton>
			<MuiMenu>
				{items.map(item => (
					<MenuItem
						selected={item?.selected}
						onClick={item?.onClick}
					>
						{item?.label}
					</MenuItem>
				))}
			</MuiMenu>
		</Dropdown>
	);
};

export default Menu;
