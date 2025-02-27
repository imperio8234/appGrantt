import { Layout, Menu, Dropdown, Avatar } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useUser } from '../../../provider/userContex';
import React from 'react';

const { Header } = Layout;

interface propsGrant {
   deleteData: () => void
}

const LayoutGrantt: React.FC<propsGrant> = ({deleteData}) => {
    const {user, logged} = useUser();


  const handleLogout = () => {
    logged({name:"", token: "", idUser: ""})
    deleteData();
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
