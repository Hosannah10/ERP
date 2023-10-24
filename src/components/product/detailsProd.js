import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Col, Image, Popover, Row, Typography } from "antd";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteProduct } from "../../redux/actions/product/deleteProductAction";
import { loadSingleProduct } from "../../redux/actions/product/detailProductAction";
import Loader from "../loader/loader";
import PageTitle from "../page-header/PageHeader";

const DetailsProd = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  //dispatch
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.product);

  //Delete Supplier
  const onDelete = () => {
    try {
      dispatch(deleteProduct(id));

      setVisible(false);
      toast.warning(`the product : ${product.name} is deleted `);
      return navigate("/product");
    } catch (error) {
      console.log(error.message);
    }
  };
  // Delete Supplier PopUp
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
  };

  useEffect(() => {
    dispatch(loadSingleProduct(id));
  }, [id]);

  // const isLogged = Boolean(localStorage.getItem("isLogged"));

  // if (!isLogged) {
  //   return <Navigate to={"/auth/login"} replace={true} />;
  // }
  return (
    <div>
      <PageTitle title=" Back  " />

      <div className="mr-top">
        {product ? (
          <Fragment key={product.id}>
            <Card bordered={false} className="card-custom">
              <div className="card-header d-flex justify-content-between m-3">
                <h5>
                  <i className="bi bi-person-lines-fill"></i>
                  <span className="mr-left">
                    ID : {product.id} | {product.name}
                  </span>
                </h5>
                <div className="text-end">
                  <Link
                    className="m-2"
                    to={`/product/${product.id}/update`}
                    state={{ data: product }}>
                    <Button
                      type="primary"
                      shape="round"
                      icon={<EditOutlined />}></Button>
                  </Link>
                  <Popover
                    className="m-2"
                    content={
                      <a onClick={onDelete}>
                        <Button type="primary" danger>
                          Yes !
                        </Button>
                      </a>
                    }
                    title="Voulez-vous vraiment supprimer ?"
                    trigger="click"
                    visible={visible}
                    onOpenChange={handleVisibleChange}>
                    <Button
                      type="danger"
                      shape="round"
                      icon={<DeleteOutlined />}></Button>
                  </Popover>
                </div>
              </div>
              <Row className="d-flex justify-content-between">
                <Col xs={24} xl={8}>
                  <div className="card-body ms-3">
                    <h5> Product information :</h5>
                    <p>
                      <Typography.Text strong>Quantity :</Typography.Text>{" "}
                      {product.quantity}
                    </p>

                    <p>
                      <Typography.Text strong>Purchase price :</Typography.Text>{" "}
                      {product.purchase_price}
                    </p>

                    <p>
                      <Typography.Text strong>Selling price :</Typography.Text>{" "}
                      {product.sale_price}
                    </p>
                    <p>
                      <Typography.Text strong>Unit type :</Typography.Text>{" "}
                      {product.unit_type}
                    </p>
                  </div>
                </Col>

                <Col xs={24} xl={8}>
                  <div className="card-body ms-3">
                    <Image
                      width={300}
                      className="fluid"
                      src={product.imageUrl}
                    />
                  </div>
                </Col>
              </Row>
            </Card>
          </Fragment>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default DetailsProd;
