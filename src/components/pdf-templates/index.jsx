import { Font, Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { formatCurrency } from "../../utils/pdf-template";

const DefaultInvoiceTemplate = ({ data }) => {
	const {
		clientDetails,
		companyDetails,
		invoiceDetails,
		invoiceItems,
		otherDetails,
	} = data;

	const totalPrice = invoiceItems.reduce((acc, entry) => (
		acc + ((entry?.quantity * entry.unitPrice) || 0)
	), 0);

	return (
		<Document>
			<Page style={styles.body}>
				<View style={styles.header}>
					<View style={styles.line}></View>
					<Text>INVOICE</Text>
				</View>
				<View style={styles.invoiceDetails}>
					<View style={styles.clientAndCustomerDetails}>
						<Text style={styles.h6}>Issued to</Text>
						<Text>{clientDetails?.name}</Text>
						<Text>{clientDetails?.address}</Text>

						<View style={styles.hr}></View>

						<Text style={styles.h6}>Pay to</Text>
						<Text>{companyDetails?.name}</Text>
						<Text>{companyDetails?.address}</Text>
					</View>
					<View style={styles.invoiceData}>
						<Text style={styles.h6}>
							Invoice no: {`${invoiceDetails?.prefix}${invoiceDetails?.number}`}
						</Text>
						<Text>
							Date: {invoiceDetails?.invoiceDate}
						</Text>
						<Text>
							Due date: {invoiceDetails?.dueDate}
						</Text>
					</View>
				</View>
				<View style={styles.items}>
					<View style={styles.itemsRow}>
						<View style={[styles.itemsDescriptionCol, styles.bgFilled]}>
							<Text style={styles.h6}>Name</Text>
						</View>
						<View style={[styles.itemsQtyCol, styles.bgFilled]}>
							<Text style={styles.h6}>Quantity</Text>
						</View>
						<View style={[styles.itemsPriceCol, styles.bgFilled]}>
							<Text style={styles.h6}>Price</Text>
						</View>
						<View style={[styles.itemsTotalCol, styles.bgFilled]}>
							<Text style={styles.h6}>Sub-total</Text>
						</View>
					</View>
					{invoiceItems.map((invoiceItem) => (
						<View style={styles.itemsRow}>
							<View style={styles.itemsDescriptionCol}>
								<Text>{invoiceItem.name}</Text>
								<Text style={styles.p2}>{invoiceItem.description}</Text>
							</View>
							<View style={styles.itemsQtyCol}>
								<Text>{invoiceItem.quantity}</Text>
							</View>
							<View style={styles.itemsPriceCol}>
								<Text>{formatCurrency(invoiceItem.unitPrice, invoiceDetails?.currency)}</Text>
							</View>
							<View style={styles.itemsTotalCol}>
								<Text>
									{formatCurrency(
										(invoiceItem.quantity * invoiceItem.unitPrice) || '', 
										invoiceDetails?.currency
									)}
								</Text>
							</View>
						</View>
					))}
				</View>
				<View style={styles.footer}>
					<View style={styles.payentInstructionAndNotes}>
						{otherDetails?.paymentInstructions && (
							<>
								<Text style={styles.h6}>Payment instructions: </Text>
								<Text>{otherDetails?.paymentInstructions}</Text>
							</>
						)}
						{otherDetails?.paymentInstructions && otherDetails?.notes && (
							<View style={styles.hr}></View>
						)}
						{otherDetails?.notes && (
							<>
								<Text style={styles.h6}>Notes</Text>
								<Text>{otherDetails?.notes}</Text>
							</>
						)}
					</View>
					<View style={styles.totalTable}>
						<View style={styles.tableEntry}>
							<Text>Subtotal</Text>
							<Text>
								{formatCurrency(totalPrice, invoiceDetails?.currency)}
							</Text>
						</View>
						<View style={[styles.tableEntry, styles.bgFilled]}>
							<Text>Total</Text>
							<Text>
								{formatCurrency(totalPrice, invoiceDetails?.currency)}
							</Text>
						</View>
					</View>
				</View>
			</Page>
		</Document>
	);
};

Font.register({
	family: 'Oswald',
	src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

const styles = StyleSheet.create({
	body: {
		fontSize: 14,
		paddingTop: 35,
		paddingBottom: 65,
		paddingHorizontal: 35,
	},
	bgFilled: {
		backgroundColor: '#eee',
	},
	p2: {
		color: "#555",
		fontSize: 12,
		marginTop: 2,
	},
	h6: {
		fontWeight: 600,
	},
	hr: {
		marginTop: 4,
		marginBottom: 4,
	},
	header: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		gap: 16,
		fontSize: 32,
		fontWeight: 400,
		marginBottom: 40,
	},
	line: {
		flex: 1,
		height: "1px",
		backgroundColor: "#bbb",
	},
	invoiceDetails: {
		display: "flex",
		flexDirection: "row",
		gap: 16,
	},
	clientAndCustomerDetails: {
		width: "50%",
	},
	invoiceData: {
		width: "50%",
		textAlign: "right",
	},
	container: {
		display: "flex",
		flexDirection: 'row',
		justifyContent: 'space-between', // Distribute space between items
		marginBottom: 20,
	},
	items: {
		marginTop: 32,
	},
	itemsRow: {
		display: "flex",
		flexDirection: 'row',
		alignItems: "center",
		borderBottom: "1px solid #ddd",
	},
	itemsDescriptionCol: {
		overflow: "hidden",
		padding: 8,
		width: "45%",
	},
	itemsQtyCol: {
		textAlign: "right",
		padding: 8,
		width: "15%",
	},
	itemsPriceCol: {
		padding: 8,
		width: "20%",
		textAlign: "right",
	},
	itemsTotalCol: {
		padding: 8,
		width: "20%",
		textAlign: "right",
	},
	footer: {
		marginTop: 32,
		display: "flex",
		flexDirection: 'row',
		gap: 32,
	},
	payentInstructionAndNotes: {
		width: "55%",
	},
	totalTable: {
		width: "45%",
	},
	tableEntry: {
		display: "flex",
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: "center",
		padding: 8,
		borderBottom: '1px solid #ddd',
		borderRadius: 5,
	},
});

export default DefaultInvoiceTemplate;
