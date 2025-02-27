import { Layout, Menu, Dropdown, Avatar } from 'antd';
import { UserOutlined, LogoutOutlined, MenuOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useUser } from '../../../provider/userContex';

const { Header } = Layout;

const LayoutGrantt = () => {
    const {user, logged} = useUser();


  const handleLogout = () => {
    logged({name:"", token: "", idUser: ""})
    localStorage.removeItem('token')
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<LogoutOutlined />} onClick={handleLogout}>
        Cerrar sesión
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="bg-white shadow-md flex justify-between items-center px-4 sticky top-0">
      
      <div className="flex items-center justify-between text-white w-full">
        <span className="mr-4 text-lg font-medium">{user?.name}</span>
        <Dropdown overlay={menu} placement="bottomRight">
          <Avatar icon={<UserOutlined />} className="cursor-pointer" />
        </Dropdown>
      </div>
    </Header>
  );
};

export default LayoutGrantt;
