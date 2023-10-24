import axios from "axios";
import { toast } from "react-toastify";

export const addReturnSale = async (values) => {
	try {
		const { data } = await axios({
			method: "post",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json;charset=UTF-8",
			},
			url: `return-sale-invoice/`,
			data: {
				...values,
			},
		});
		toast.success("The sale was added successfully");
		return "success";
	} catch (error) {
		toast.error("Something went wrong while displaying the sale ");
		console.log(error.message);
	}
};
