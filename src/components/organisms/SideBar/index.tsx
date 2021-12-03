import React, { FC, useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'umi';

import Logo from '../../../../public/Toi Dev-logos.jpeg';

import { menu } from './data';
import styles from './sideBar.less';

const { Sider } = Layout;
const { SubMenu } = Menu;

const SideBar: FC = () => {
  return (
    <Sider className={styles.sider}>
      <div className={styles.logoBox}>
        <img src={Logo} alt="logo" className={styles.logo} />
      </div>
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        {menu.map((item) => {
          return (
            (!item.subItem && (
              <Menu.Item
                key={item.key}
                icon={item.icon}
              >
                <Link to={item.url}>{item.title}</Link>
              </Menu.Item>
            )) || (
              <SubMenu key={item.key} icon={item.icon} title={item.title}>
                {item.subItem.map((sItem) => (
                  <Menu.Item
                    key={sItem.key}
                  >
                    <Link to={sItem.url}>{sItem.title}</Link>
                  </Menu.Item>
                ))}
              </SubMenu>
            )
          );
        })}
      </Menu>
    </Sider>
  );
};

export default SideBar;
