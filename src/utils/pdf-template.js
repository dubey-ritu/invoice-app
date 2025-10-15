import { currencies } from "../constants";

export const formatCurrency = (value, currencyValue) => {
	if (
		value === undefined || 
		value === null || 
		value === ""
	) {
		return "";
	}

	const {
		meta: {
			locale,
			currency
		},
	} = currencies.find(entry => entry.value === currencyValue);

	return new Intl.NumberFormat(locale, {
		style: "currency",
		currency,
	}).format(value);
};