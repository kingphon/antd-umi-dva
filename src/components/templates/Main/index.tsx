import { FC } from 'react';
import { Layout } from 'antd';

import SideBar from '../../organisms/SideBar';

import styles from './main.less';

const { Header, Content, Footer } = Layout;

interface InputProps {
  children: any;
}

const Main: FC<InputProps> = ({ children }) => {
  return (
    <Layout className={styles.wrapperLayout}>
      <SideBar />
      <Layout className={styles.mainLayout}>
        <Header className={styles.headerLayout} />
        <Content>{children}</Content>
        <Footer className={styles.footerLayout}>
          Ant Design ©2018 Created by Kin
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Main;
