import { FC } from 'react';
import { Button } from 'antd';

import styles from './styles.less'

interface PathName {
  prefix: string;
  name: string;
  onClick: any;
}

const ContentHeader: FC<PathName> = ({ prefix, name, onClick }) => {
  return (
    <div className={styles.wrapper}>
      <div>
        <span className={styles.prefixFont}>{`${prefix} /`}</span>
        <span className={styles.nameFont}> {name}</span>
      </div>
      <div>
        <Button onClick={onClick} type="primary">
          Tạo mới
        </Button>
      </div>
    </div>
  );
};

export default ContentHeader;
