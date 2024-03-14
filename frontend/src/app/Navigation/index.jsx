import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import { useAppContext } from '@/context/appContext';
import {
  SettingOutlined,
  CustomerServiceOutlined,
  TeamOutlined,
  MoneyCollectOutlined,
  FundProjectionScreenOutlined,
  ControlOutlined,
  LoginOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import history from '@/utils/history';

const { Sider } = Layout;
const { SubMenu } = Menu;

export default function Navigation() {
  const { state: stateApp, appContextAction } = useAppContext();
  const { isNavMenuClose } = stateApp;
  const { navMenu } = appContextAction;
  const [showLogoApp, setLogoApp] = useState(isNavMenuClose);
  // const userInfo = window.localStorage.auth ? JSON.parse(window.localStorage.auth) : {};
  // console.log(userInfo, 'userInfo');
  useEffect(() => {
    if (isNavMenuClose) {
      setLogoApp(isNavMenuClose);
    }
    const timer = setTimeout(() => {
      if (!isNavMenuClose) {
        setLogoApp(isNavMenuClose);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [isNavMenuClose]);
  const onCollapse = () => {
    navMenu.collapse();
  };
  return (
    <>
      <Sider collapsible collapsed={isNavMenuClose} onCollapse={onCollapse} className="navigation overflow-scroll">
        <div className="logo">
          <img
            src={`https://www.mundoeli.com/wp-content/uploads/2022/05/LogoEli.jpg`}
            alt="Logo"
            style={{ display: "block", width: '100%' }}
          />
        </div>
        <Menu mode="inline">
          <Menu.Item key={'Customer'} icon={<CustomerServiceOutlined />}>
            <Link to={'/customer'} />
            Customer
          </Menu.Item>
          <Menu.Item key={'Reservations'} icon={<ControlOutlined />}>
            <Link to={'/reservations'} />
            Reservations
          </Menu.Item>
          <Menu.Item key={'RDCheckout'} icon={<MoneyCollectOutlined />}>
            <Link to={'/rd_checkout'} />
            RD-Checkout
          </Menu.Item>
          <Menu.Item key={'Payments'} icon={<MoneyCollectOutlined />}>
            <Link to={'/payments'} />
            Payments
          </Menu.Item>
          <SubMenu key={'Reports'} icon={<SettingOutlined />} title={'Reports'}>
            <Menu.Item key={"Report1"} icon={<SettingOutlined />}>
              <Link to={'/report1'} />
              Report1
            </Menu.Item>
            <Menu.Item key={'Report2'} icon={<TeamOutlined />}>
              <Link to={'/report2'} />
              Report2
            </Menu.Item>
            <Menu.Item key={'Report3'} icon={<FundProjectionScreenOutlined />}>
              <Link to={'/report3'} />
              Report3
            </Menu.Item>
          </SubMenu>
          <SubMenu key={'Settings'} icon={<SettingOutlined />} title={'Settings'}>
            <Menu.Item key={"SystemInfo"} icon={<SettingOutlined />}>
              <Link to={'/system_info'} />
              SystemInfo
            </Menu.Item>
            <Menu.Item key={'Admin'} icon={<TeamOutlined />}>
              <Link to={'/admin'} />
              Users
            </Menu.Item>
            <Menu.Item key={'Reserva Products'} icon={<FundProjectionScreenOutlined />}>
              <Link to={'/product_list'} />
              Reserva Products
            </Menu.Item>
            <Menu.Item key={'Checkout Products'} icon={<CheckOutlined />}>
              <Link to={'/product_list_checkout'} />
              Checkout Products
            </Menu.Item>
            <Menu.Item key={'Product Types'} icon={<FundProjectionScreenOutlined />}>
              <Link to={'/product_types'} />
              Product Types
            </Menu.Item>
            <Menu.Item key={'company_list'} icon={<FundProjectionScreenOutlined />}>
              <Link to={'/company_list'} />
              Company
            </Menu.Item>
            <Menu.Item key={'Payment Method'} icon={<FundProjectionScreenOutlined />}>
              <Link to={'/payment_method'} />
              Payment Method
            </Menu.Item>
          </SubMenu>
          <Menu.Item key={`SignOut`} icon={<LoginOutlined />} onClick={() => history.push('/logout')}>
            Sign Out
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
}
