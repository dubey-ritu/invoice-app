import { Box, Typography, useTheme } from "@mui/joy";
import Menu from "../../components/menu/";
import { Download } from "@mui/icons-material";
import { memo } from "react";

const getStyles = (theme) => ({
	toolbar: {
		paddingInline: theme.spacing(1.5),
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		gap: theme.spacing(2),
		height: "100%",
	},
	actionsContainer: {
		display: "flex",
		alignItems: "center",
		gap: theme.spacing(1),
		height: "100%",
	},
});

const Toolbar = (props) => {
	const {
		mode,
		onFormMode,
		onPreviewMode,
		isShowModeMenu,
		onDownloadImage,
		onDownloadPdf,
		onPreviewImage,
		onPreviewPdf,
	} = props;

	const theme = useTheme();
	const styles = getStyles(theme);
	
	return (
		<Box sx={styles.toolbar}>
			<Box>
				<Typography>Logo</Typography>
			</Box>
			<Box sx={styles.actionsContainer}>
				{isShowModeMenu && <Menu
					label={mode === "form" ? "Form" : "Preview"}
					items={[
						{ label: "Form", onClick: onFormMode },
						{ label: "Preview", onClick: onPreviewMode },
					]}
					menuButtonProps={{
						variant: "outlined",
					}}
				/>}
				<Menu
					icon={<Download />}
					label="Export"
					items={[
						{ label: "Preview PDF", onClick: onPreviewPdf },
						{ label: "Download PDF", onClick: onDownloadPdf },
						{ label: "Preview Image", onClick: onPreviewImage },
						{ label: "Download Image", onClick: onDownloadImage },
					]}
				/>
			</Box>
		</Box>
	)
};

export default memo(Toolbar);