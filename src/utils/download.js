
export const download = (data, fileName) => {
	const a = document.createElement("a");
	a.setAttribute("href", data);
	a.setAttribute("download", fileName);
	document.body.appendChild(a);
	a.click();
	a.remove();
};