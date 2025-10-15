import { DesignServices, EditNote, PictureAsPdf, Language } from "@mui/icons-material";
import { Box, Button, Typography, useTheme } from "@mui/joy"
import { useNavigate } from "react-router-dom";

const getStyles = (theme) => ({
	header: {
		position: "sticky",
		top: 0,
		height: "60px",
		background: "rgba(255, 255, 255, 0.45)",
		borderBottom: "1px solid #ddd",
		backdropFilter: "blur(5px)",
		"& > .MuiBox-root": {
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
			height: "100%",
			gap: theme.spacing(2),
			marginInline: "auto",
			width: "calc(100% - 32px)",
			maxWidth: "1280px",
		},
	},
	gridContainer: {
		marginBlock: "5vh",
		width: "calc(100% - 32px)",
		maxWidth: "1280px",
		marginInline: "auto",
		display: "grid",
		gridTemplateColumns: "repeat(3, 1fr)",
		gap: theme.spacing(2.5),
		[theme.breakpoints.down("lg")]: {
			gridTemplateColumns: "1fr 1fr",
		},
		[theme.breakpoints.down("md")]: {
			gridTemplateColumns: "1fr",
		},
	},
	hero: {
		background: "#1e89ef",
		borderRadius: theme.spacing(1),
		padding: theme.spacing(4, 2),
		boxShadow: "0px 2px 5px 2px rgba(0,0,0,0.05)",
		gridColumn: "span 2",
		"& .MuiTypography-h1": {
			color: "#fff",
			marginBottom: theme.spacing(1),
		},
		"& .MuiTypography-body-md": {
			color: "#f5f5f5",
			marginBottom: theme.spacing(2.5),
		},
		"& button": {
			background: "#fff",
			color: "#1e89ef",
			"&:hover": {
				background: "#fff",
				color: "#2791f5ff",
			}
		},
		[theme.breakpoints.down("md")]: {
			gridColumn: "span 1",
		}
	},
	previewImage: {
		gridRow: "span 3",
		padding: theme.spacing(2),
		borderRadius: theme.spacing(1),
		boxShadow: "0px 2px 5px 2px rgba(0,0,0,0.02)",
		background: "#eee",
		"& img": {
			borderRadius: theme.spacing(1),
			width: "100%",
			objectFit: "cover",
		},
		[theme.breakpoints.down("lg")]: {
			gridRow: "span 4",
		},
		[theme.breakpoints.down("md")]: {
			gridTemplateColumns: "unset",
		},
	},
	feature: {
		padding: theme.spacing(2),
		borderRadius: theme.spacing(1),
		boxShadow: "0px 2px 5px 2px rgba(0,0,0,0.05)",
		background: "#fff",
		"& .MuiSvgIcon-root": {
			width: "1.25em",
			height: "1.25em",
			marginBottom: theme.spacing(1),
		},
		"& .MuiTypography-title-lg": {
			marginBottom: theme.spacing(0.5),
		},
	},
});

const Home = () => {
	const theme = useTheme();
	const styles = getStyles(theme);

	const navigate = useNavigate();

	const handleCreateInvoiceClick = () => {
		navigate("/create-invoice");
	};

	return (
		<>
			<Box
				component="header"
				sx={styles.header}
			>
				<Box>
					<Box>Invoicess</Box>
					<Button
						onClick={handleCreateInvoiceClick}
					>
						Create Invoice
					</Button>
				</Box>
			</Box>
			<Box sx={styles.gridContainer}>
				<Box sx={styles.hero}>
					<Typography level="h1">
						Create Beautiful Invoices Instantly
					</Typography>
					<Typography level="body-md">
						Generate professional PDF or image invoices in seconds. Simple, fast, and hassle-free — perfect for freelancers, small businesses, and startups.
					</Typography>
					<Button
						onClick={handleCreateInvoiceClick}
					>
						Create Invoice
					</Button>
				</Box>
				<Box sx={styles.previewImage}>
					<img
						src="https://marketplace.canva.com/EAE92Pl9bfg/6/0/1131w/canva-black-and-gray-minimal-freelancer-invoice-wPpAXSlmfF4.jpg"
					/>
				</Box>
				<Box sx={styles.feature}>
					<EditNote />
					<Typography level="title-lg">
						Easy-to-Use Editor
					</Typography>
					<Typography level="body-sm">
						Intuitive interface lets you build invoices without needing design or technical skills.
					</Typography>
				</Box>
				<Box sx={styles.feature}>
					<PictureAsPdf />
					<Typography level="title-lg">
						Download as PDF or Image
					</Typography>
					<Typography level="body-sm">
						Export your invoice as a high-quality PDF or image with one click.
					</Typography>
				</Box>
				<Box sx={styles.feature}>
					<DesignServices />
					<Typography level="title-lg">
						Customizable Templates
					</Typography>
					<Typography level="body-sm">
						Choose from clean, modern templates and customize with your branding.
					</Typography>
				</Box>
				<Box sx={styles.feature}>
					<Language />
					<Typography level="title-lg">
						Multi-Currency & Locale Support
					</Typography>
					<Typography level="body-sm">
						Automatically format currencies and dates based on locale — perfect for global clients.
					</Typography>
				</Box>
			</Box>
		</>
	)
};

export default Home;
