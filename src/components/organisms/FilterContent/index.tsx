import { FC } from 'react';
import { Select } from 'antd';
import { connect, Dispatch } from 'dva';

import {
  ProvinceModelType,
  Province,
} from '../../../models/location/provinceModel';

const { Option } = Select;

// import { ALL, ACTIVE, HIDDEN } from '../../../constants/status';

interface FilterContentProps {
  dispatch: Dispatch;
}

const FilterContent: FC<FilterContentProps> = ({ dispatch }) => {
  return (
    <div
      style={{
        background: 'white',
        margin: '1rem',
        width: '16rem',
        height: '6rem',
      }}
    >
      <div style={{ padding: '1rem' }}>
        <p style={{ marginBottom: '0.5rem' }}>STATUS</p>
        <Select
          defaultValue="ALL"
          style={{ width: '14rem' }}
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
