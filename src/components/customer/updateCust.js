import { Alert, Button, Col, Form, Input, Row, Typography } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import PageTitle from "../page-header/PageHeader";

//Update customer API REQ
const updateCustomer = async (id, values) => {
  try {
    await axios({
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      url: `customer/${id}`,
      data: {
        ...values,
      },
    });
    return "success";
    // return data;
  } catch (error) {
    console.log(error.message);
  }
};

function UpdateCust() {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const [success, setSuccess] = useState(false);
  const { id } = useParams();

  //Loading Old data from URL
  const location = useLocation();
  const { data } = location.state;

  const cust = data;
  const [initValues, setInitValues] = useState({
    name: cust.name,
    phone: cust.phone,
    address: cust.address,
    due_amount: cust.due_amount,
  });

  const onFinish = (values) => {
    try {
      updateCustomer(id, values);
      setSuccess(true);
      toast.success("Updating customer contact details");
      setInitValues({});
    } catch (error) {
      console.log(error.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // const isLogged = Boolean(localStorage.getItem("isLogged"));

  // if (!isLogged) {
  //   return <Navigate to={"/auth/login"} replace={true} />;
  // }

  return (
    <>
      <PageTitle
        title={`Update Customer/ ${id}`}
        subtitle="Update customer information"
      />
      <div className="text-center">
        <div className="">
          <Row className="mr-top">
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={14}
              className="border rounded column-design"
            >
              {success && (
                <div>
                  <Alert
                    message={`customer data was successfully updated`}
                    type="success"
                    closable={true}
                    showIcon
                  />
                </div>
              )}
              <Title level={3} className="m-3 text-center">
              Edit customer form
              </Title>
              <Form
                initialValues={{
                  ...initValues,
                }}
                form={form}
                className="m-4"
                name="basic"
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 16,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  fields={[{ name: "Name" }]}
                  label="Name"
                  name="Name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the customer's name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Phone"
                  name="Phone"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the customer's phone number!",
                    },
                  ]}
                >
                  <Input maxLength={14}/>
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Address"
                  name="Address"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the customer's address!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Amount to be paid"
                  name="due Amount"
                  rules={[
                    {
                      type: Number,
                      required: true,
                      message: "Please enter the customer's amount!",
                    },
                  ]}
                >
                  <Input type="number"  min={0} value={0} />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Button block type="primary" htmlType="submit" shape="round">
                  Update
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default UpdateCust;
