import {
	Button,
	Card,
	Col,
	DatePicker,
	Form,
	Input,
	Row,
	Select,
	Typography
} from "antd";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./AddTransaction.module.css";

import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import getAllAccount from "../../api/getAllApis/getAllAccounts";
import { addTransaction } from "../../redux/actions/transaction/addTransactionAction";
import PageTitle from "../page-header/PageHeader";

const AddTransaction = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { Title } = Typography;

  const [form] = Form.useForm();

  let [date, setDate] = useState(moment());
  const [loader, setLoader] = useState(false);

  const [accounts, setAccounts] = useState(null);

  useEffect(() => {
    const getAccounts = async () => {
      const response = await getAllAccount();
      setAccounts(response);
    };
    getAccounts();
  }, []);

  const onFinish = async (values) => {
    try {
      const data = {
        date: date,
        ...values,
      };

      const resp = await dispatch(addTransaction(data));
      if (resp === "Transaction created successfully") {
        setLoader(false);
        navigate(-1);
      }

      toast.success("Payment completed successfully");
      form.resetFields();
      setLoader(false);
    } catch (error) {
      console.log(error.message);
      setLoader(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setLoader(false);
  };

  // const isLogged = Boolean(localStorage.getItem("isLogged"));

  // if (!isLogged) {
  //   return <Navigate to={"/auth/login"} replace={true} />;
  // }

  return (
    <>
      <PageTitle title="Back" />
      <Row className="mr-top">
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={16}
          xl={12}
          className="column-design border rounded bg-white"
        >
          <Card bordered={false}>
            <Title level={4} className="m-2 text-center">
              Transaction
            </Title>
            <Form
              form={form}
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item label="Date" required>
                <DatePicker
                  defaultValue={moment()}
                  onChange={(value) => setDate(value?._d)}
                  style={{ marginBottom: "10px" }}
                  label="date"
                  name="date"
				  className="date-picker"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the date!",
                    },
                  ]}
                />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                name="debit_id"
                label="Debit account"
                rules={[
                  {
                    required: true,
                    message: "Please enter the receivable account!",
                  },
                ]}
              >
                <Select
                  loading={!accounts}
                  showSearch
                  placeholder="Select Debtor Account ID"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    optionA.children
                      .toLowerCase()
                      .localeCompare(optionB.children.toLowerCase())
                  }
                >
                  {accounts &&
                    accounts.map((acc) => (
                      <Select.Option key={acc.id} value={acc.id}>
                        {acc.name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                name="credit_id"
                label="Credit account"
                rules={[
                  {
                    required: true,
                    message: "Please enter the credit account!",
                  },
                ]}
              >
                <Select
                  loading={!accounts}
                  showSearch
                  placeholder="select the credit account ID"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    optionA.children
                      .toLowerCase()
                      .localeCompare(optionB.children.toLowerCase())
                  }
                >
                  {accounts &&
                    accounts.map((acc) => (
                      <Select.Option key={acc.id} value={acc.id}>
                        {acc.name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Amount"
                name="amount"
                rules={[
                  {
                    required: true,
                    message: "Please enter the amount!",
                  },
                ]}
              >
                <Input type="number"  min={0} value={0} />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Particulars"
                name="particulars"
                rules={[
                  {
                    required: true,
                    message: "Please enter the individual's name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                className={styles.payNowBtnContainer}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  shape="round"
                  loading={loader}
                  onClick={() => setLoader(true)}
                >
                  Pay now
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AddTransaction;
