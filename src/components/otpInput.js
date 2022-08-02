import { useEffect, useState, createRef } from "react";

const OtpInput = ({ otpValue = "", inputLength = 0, handleChangeOTP }) => {
	const [refs, setRefs] = useState([]);

	const handleOTPInput = ({ currentTarget }) => {
		const value = currentTarget.value;
		const index = parseInt(currentTarget.id);
		let newOTP = otpValue;
		if (value === "") {
			const prev = refs[Math.max(0, index - 1)];
			newOTP = [newOTP.slice(0, index, " ", newOTP.slice(index))].join(
				""
			);
			prev.current.focus();
		} else {
			const next = refs[Math.min(inputLength - 1, index + 1)];
			newOTP = [
				newOTP.slice(0, index + 1),
				value,
				newOTP.slice(index + 1),
			].join("");
			next.current.focus();
		}
		handleChangeOTP(newOTP);
	};

	useEffect(() => {
		const newRefs = [];
		for (let i = 0; i < inputLength; i++) {
			newRefs.push(createRef());
		}
		setRefs(newRefs);
	}, [inputLength]);
	return (
		<div className="d-flex flex-columnalign-items-center">
			{refs.map((ref, index) => (
				<input
					key={index}
					type="text"
					id={index}
					maxLength={1}
					size={1}
					className="px-0 py-2 me-1 border text-center form-control"
					onChange={handleOTPInput}
					ref={ref}
					value={otpValue[index] || ""}
				/>
			))}
		</div>
	);
};

export default OtpInput;
