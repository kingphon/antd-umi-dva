import { FC } from 'react';
import { Checkbox, Table } from 'antd';
import {
  EditOutlined,
  InfoCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { connect, Dispatch } from 'dva';

import { formatDateTime } from '../../../../commons/utils';
import FilterContent from '../../FilterContent';
import { ProvinceModelType } from '../../../../models/location/provinceModel';

interface ProvinceTableProps {
  province: ProvinceModelType;
  dispatch: Dispatch;
}

const ProvinceTable: FC<ProvinceTableProps> = ({ province, dispatch }) => {
  const columns = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
      render: (key) => (
        <div
          style={{
            backgroundColor: '#999',
            padding: '0.2rem 0.5rem',
            borderRadius: '100px',
            fontSize: '0.8rem',
            width: '1.6rem',
            height: '1.6rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {key}
        </div>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Slug Name',
      dataIndex: 'slugName',
      key: 'slugName',
    },
    {
      title: 'Create Date',
      dataIndex: 'createDate',
      key: 'createDate',
      align: 'center',
      render: (createDate) => <p>{formatDateTime(createDate)}</p>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status, key) => (
        <Checkbox
          checked={status === 'ACTIVE'}
          onClick={() =>
            dispatch?.({ type: 'province/updateStatus', payload: key })
          }
        />
      ),
    },
    {
      title: 'Audit',
      dataIndex: 'audit',
      align: 'center',
      render: () => <InfoCircleOutlined style={{ cursor: 'pointer' }} />,
    },
    {
      title: '',
      align: 'center',
      render: ({ key }) => (
        <div>
          <EditOutlined
            style={{ cursor: 'pointer', padding: '0.5rem' }}
            onClick={() =>
              dispatch?.({ type: 'province/getUpdateAction', payload: key })
            }
          />
          <DeleteOutlined
            style={{ cursor: 'pointer', padding: '0.5rem' }}
            onClick={() =>
              dispatch?.({ type: 'province/doDelete', payload: key })
            }
          />
        </div>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex' }}>
      <FilterContent />
      <Table
        style={{ width: '100%', margin: '1rem' }}
        columns={columns}
        dataSource={province.dataFilters}
        loading={province.loading}
      />
    </div>
  );
};

export default connect(({ province }: { province: ProvinceModelType }) => ({
  province,
}))(ProvinceTable);
