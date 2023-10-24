import { useState, useEffect } from "react";
import {
  CheckOutlined,
  FileDoneOutlined,
  FileOutlined,
  FileSyncOutlined,
  FundOutlined,
  HomeOutlined,
  InboxOutlined,
  MinusSquareOutlined,
  PlusSquareOutlined,
  SettingOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UnorderedListOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  UserSwitchOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Divider, Menu } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import logo from "../../assets/images/sai-i-lama-logo.png";
import NotificationIcon from "../notification/NotificationIcon";
import { loadProduct } from "../../redux/actions/product/getAllProductAction";
// import styles from "./Sidenav.module.css";

const Test = (props) => {
  const dispatch = useDispatch();
  const [list, setList] = useState([]);

  useEffect(() => {
    dispatch(loadProduct({ status: "true", page: 1, limit: 10 }));
  }, []);

  const productsList = useSelector((state) => state.products.list);

  useEffect(() => {
    setList(productsList);
  }, [productsList]);

  const menu = [
    {
      label: (
        <NavLink to="/dashboard">
          <span>DASHBOARD</span>
        </NavLink>
      ),
      key: "dashboard",
      icon: <HomeOutlined />,
    },
    {
      label: "PRODUCT",
      key: "product",
      icon: <ShopOutlined />,
      children: [
        {
          label: (
            <NavLink to="/product-category">
              <span>Product category</span>
            </NavLink>
          ),
          key: "productCategory",
          icon: <UnorderedListOutlined />,
        },
        {
          label: (
            <NavLink to="/product">
              <span>Products</span>
            </NavLink>
          ),
          key: "products",
          icon: <UnorderedListOutlined />,
        },
      ],
    },
    {
      label: "SUPPLY",
      key: "purchaseSection",
      icon: <PlusSquareOutlined />,
      children: [
        {
          label: (
            <NavLink to="/supplier">
              <span>Suppliers</span>
            </NavLink>
          ),
          key: "suppliers",
          icon: <UserOutlined />,
        },
        {
          label: (
            <NavLink to="/purchase">
              <span>New Supply</span>
            </NavLink>
          ),
          key: "newPurchase",
          icon: <CheckOutlined />,
        },
        {
          label: (
            <NavLink to="/purchaselist">
              <span>Supply List</span>
            </NavLink>
          ),
          key: "purchaseList",
          icon: <UnorderedListOutlined />,
        },
      ],
    },
    {
      label: "SALE",
      key: "saleSection",
      icon: <MinusSquareOutlined />,
      children: [
        {
          label: (
            <NavLink to="/customer">
              <span>Customer base</span>
            </NavLink>
          ),
          key: "customers",
          icon: <UserOutlined />,
        },
        {
          label: (
            <NavLink to="/sale">
              <span>SPA</span>
            </NavLink>
          ),
          key: "newSale",
          icon: <CheckOutlined />,
        },
        {
          label: (
            <NavLink to="/pos">
              <span>Boutique</span>
            </NavLink>
          ),
          key: "pos",
          icon: <ShoppingCartOutlined />,
        },
        {
          label: (
            <NavLink to="/salelist">
              <span>Sales List</span>
            </NavLink>
          ),
          key: "saleList",
          icon: <UnorderedListOutlined />,
        },
      ],
    },
    {
      label: "ACCOUNTS",
      key: "accountSection",
      icon: <InboxOutlined />,
      children: [
        {
          label: (
            <NavLink to="/account/">
              <span>Account</span>
            </NavLink>
          ),
          key: "accountList",
          icon: <UnorderedListOutlined />,
        },
        {
          label: (
            <NavLink to="/transaction/create">
              <span>New transaction</span>
            </NavLink>
          ),
          key: "newTransaction",
          icon: <CheckOutlined />,
        },
        {
          label: (
            <NavLink to="/transaction/">
              <span>List of transactions</span>
            </NavLink>
          ),
          key: "transactionList",
          icon: <UnorderedListOutlined />,
        },
      ],
    },
    {
      label: "REPORT",
      key: "reportSection",
      icon: <FundOutlined />,
      children: [
        {
          label: (
            <NavLink to="/account/trial-balance">
              <span>Verification scale</span>
            </NavLink>
          ),
          key: "trialBalance",
          icon: <FileDoneOutlined />,
        },
        {
          label: (
            <NavLink to="/account/balance-sheet">
              <span>Balance sheet</span>
            </NavLink>
          ),
          key: "balanceSheet",
          icon: <FileOutlined />,
        },
        {
          label: (
            <NavLink to="/account/income">
              <span>Status of the results</span>
            </NavLink>
          ),
          key: "incomeStatement",
          icon: <FileSyncOutlined />,
        },
      ],
    },

    {
      label: "HR",
      key: "hrSection",
      icon: <UserOutlined />,
      children: [
        {
          label: (
            <NavLink to="/hr/staffs">
              <span>Staff</span>
            </NavLink>
          ),
          key: "staffs",
          icon: <UsergroupAddOutlined />,
        },
        {
          label: (
            <NavLink to="/role">
              <span>Role and permissions</span>
            </NavLink>
          ),
          key: "roleAndPermissions",
          icon: <UserSwitchOutlined />,
        },
        {
          label: (
            <NavLink to="/designation/">
              <span>Function</span>
            </NavLink>
          ),
          key: "designation",
          icon: <UserSwitchOutlined />,
        },
      ],
    },
    {
      label: "SETTINGS",
      key: "settings",
      icon: <SettingOutlined />,
      children: [
        {
          label: (
            <NavLink to="/invoice-setting">
              <span>Invoice Settings</span>
            </NavLink>
          ),
          key: "invoiceSetting",
          icon: <SettingOutlined />,
        },
      ],
    },
    {
      label: <NavLink to="../help">HELP</NavLink>,
      key: "help",
      icon: <QuestionCircleOutlined />,
    },
  ];

  return (
    <div>
      <center>
        <img
          src={logo}
          alt="logo"
          style={{
            width: "50%",
            height: "50%",
            objectFit: "cover",
          }}
        />

        <Menu
          theme="dark"
          mode="inline"
          items={menu}
          className="sidenav-menu"
          // style={{ backgroundColor: "transparent" }}
        />
        <Divider
          style={{ borderColor: "white", borderWidth: "2px",borderRadius:"10px" }}
        />
        <NotificationIcon list={list} />
      </center>
    </div>
  );
};

export default Test;
