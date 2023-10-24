import { ADD_CUSTOMER } from "../../types/CustomerType";
import axios from "axios";
import { toast } from "react-toastify";

const addCustomerAction = (data) => {
	return {
		type: ADD_CUSTOMER,
		payload: data,
	};
};

export const addCustomer = (values) => {
	return async (dispatch) => {
		try {
			const { data } = await axios({
				method: "post",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `customer/`,
				data: {
					...values,
				},
			});
			//dispatching data
			dispatch(addCustomerAction(data));
			toast.success("Customer added");
			return {
				message: "success",
			};
		} catch (error) {
			toast.error("Error adding a customer, try again");
			console.log(error.message);
		}
	};
};
