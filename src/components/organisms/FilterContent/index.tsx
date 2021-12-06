import { FC } from 'react';
import { Select } from 'antd';
import { connect, Dispatch } from 'dva';

import { ProvinceModelType } from '../../../models/location/provinceModel';

import styles from './styles.less';

const { Option } = Select;

// import { ALL, ACTIVE, HIDDEN } from '../../../constants/status';

interface FilterContentProps {
  dispatch: Dispatch;
}

const FilterContent: FC<FilterContentProps> = ({ dispatch }) => {
  return (
    <div className={styles.box}>
      <div className={styles.wrapper}>
        <p className={styles.text}>STATUS</p>
        <Select
          defaultValue="ALL"
          className={styles.select}
          onChange={(value) =>
            dispatch?.({ type: 'province/doFilter', payload: value })
          }
        >
          <Option value="ALL">ALL</Option>
          <Option value="ACTIVE">ACTIVE</Option>
          <Option value="HIDDEN">HIDDEN</Option>
        </Select>
      </div>
    </div>
  );
};

export default connect(({ province }: { province: ProvinceModelType }) => ({
  province,
}))(FilterContent);
