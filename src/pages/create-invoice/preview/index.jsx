
const styles = {
	previewImage: {
		height: "100%",
		objectFit: "cover",
		boxShadow: "0px 0px 2px 2px rgba(0,0,0,0.05)"
	},
};

const Preview = ({ imageUrl }) => {
	return (
		<img
			onContextMenu={(e) => e.preventDefault()}
			src={imageUrl}
			style={styles.previewImage}
		/>
	)
};

export default Preview;