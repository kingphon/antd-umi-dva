import React, { FC } from 'react';
import { Layout } from 'antd';

import SideBar from '../../organisms/SideBar';
import ContentHeader from '../../organisms/ContentHeader';

import styles from './main.less';

const { Header, Content, Footer } = Layout;

interface InputProps {
  children: any;
  contentPrefix?: string;
  contentName?: string;
  showModal?: any;
}

const Main: FC<InputProps> = ({
  children,
  contentPrefix,
  contentName,
  showModal,
}) => {
  return (
    <Layout className={styles.wrapperLayout}>
      <SideBar />
      <Layout className={styles.mainLayout}>
        <Header className={styles.headerLayout} />
        <Content>
          {children}
        </Content>
        <Footer className={styles.footerLayout}>
          Ant Design ©2018 Created by Kin
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Main;
