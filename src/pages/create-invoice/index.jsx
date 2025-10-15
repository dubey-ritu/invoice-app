import { useState, useEffect, useCallback } from "react";
import { Box, CircularProgress, useTheme } from "@mui/joy";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import Form from "./form";
import Preview from "./preview";
import { invoiceDefaultValue, invoiceSchema } from "./invoice-form-config";
import { getPdfAndImage } from "../../utils/pdf";
import { download } from "../../utils/download";
import Toolbar from "./toolbar";
import useBreakpoint from "../../hooks/use-breakpoint";


const getStyles = (theme) => ({
	page: {
		background: "#fff",
		border: `1px solid #ddd`,
		width: "calc(100% - 22px)",
		height: "calc(100% - 22px)",
		margin: "10px",
		borderRadius: "8px",
	},
	toolbarWrapper: {
		height: "50px",
		borderBottom: `1px solid #ddd`,
	},
	createInvoiceContainer: {
		display: "grid",
		gridTemplateColumns: "1fr 1fr",
		height: "calc(100vh - 72px)",
		[theme.breakpoints.down("lg")]: {
			gridTemplateColumns: "1fr",
		},
	},
	formWrapper: {
		overflowY: "auto",
		width: "100%",
		borderRight: "1px solid #ddd",
	},
	previewWrapper: {
		textAlign: "center",
		overflow: "hidden",
		height: "100%",
		[theme.breakpoints.down("md")]: {
			"& img": {
				objectFit: "contain !important",
				width: "100%",
			},
		},
	},
	loading: {
		display: "grid",
		placeItems: "center",
		height: "100%",
	},
});

function CreateInvoice() {
	const [imageUrl, setImageUrl] = useState(null);
	const [pdfUrl, setPdfUrl] = useState(null);
	const [mode, setMode] = useState("both");

	const theme = useTheme();
	const styles = getStyles(theme);

	const methods = useForm({
		mode: "onBlur",
		defaultValues: invoiceDefaultValue,
		resolver: yupResolver(invoiceSchema)
	});

	const formValues = methods.watch();
	console.log(formValues);

	useEffect(() => {
		(async () => {
			const { imageUrl, pdfUrl } = await getPdfAndImage(undefined, formValues);
			setImageUrl(imageUrl);
			setPdfUrl(pdfUrl);
		})();
	}, [JSON.stringify(formValues)]);

	const handleFormModeClick = useCallback(() => {
		setMode("form");
	}, []);

	const handlePreviewModeClick = useCallback(() => {
		setMode("preview");
	}, []);

	const previewPdf = useCallback(() => {
		window.open(pdfUrl, "_blank");
	}, [pdfUrl]);

	const previewImage = useCallback(() => {
		window.open(imageUrl, "_blank");
	}, [imageUrl]);

	const downloadPdf = useCallback(() => {
		download(pdfUrl, "invoice.pdf");
	}, [pdfUrl]);

	const downloadImage = useCallback(() => {
		download(imageUrl, "invoice.jpg");
	}, [imageUrl]);

	const isShowModeMenu = useBreakpoint(
		theme.breakpoints.down("lg").replace(/^@media\s*/, '')
	);

	useEffect(() => {
		if(isShowModeMenu) {
			setMode("form");
		} else {
			setMode("both");
		}
	}, [isShowModeMenu]);

	return (
		<Box sx={styles.page}>
			<Box sx={styles.toolbarWrapper}>
				<Toolbar
					mode={mode}
					onFormMode={handleFormModeClick}
					onPreviewMode={handlePreviewModeClick}
					isShowModeMenu={isShowModeMenu}
					onDownloadImage={downloadImage}
					onDownloadPdf={downloadPdf}
					onPreviewImage={previewImage}
					onPreviewPdf={previewPdf}
				/>
			</Box>
			<FormProvider {...methods}>
				<Box sx={styles.createInvoiceContainer}>
					<Box sx={styles.formWrapper}>
						{["form", "both"].includes(mode) && <Form />}
					</Box>
					<Box sx={styles.previewWrapper}>
						{["preview", "both"].includes(mode) && (
							imageUrl === null ? (
								<Box sx={styles.loading}>
									<CircularProgress/>
								</Box>
							) : (
								<Preview imageUrl={imageUrl} />
							)
						)}
					</Box>
				</Box>
			</FormProvider>
		</Box>
	)
}

export default CreateInvoice;
