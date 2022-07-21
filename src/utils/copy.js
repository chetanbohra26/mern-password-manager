const handleCopy = (text) => {
	if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
		// Not IE 11
		navigator.clipboard.writeText(text);
	} else if (window.clipboardData && window.clipboardData.setData) {
		// IE 11
		window.clipboardData.setData("Text", text);
	}
};

export default handleCopy;
