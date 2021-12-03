import { FC } from 'react';
import { connect, Dispatch } from 'dva';

import ProvinceTable from '../../../components/organisms/Province/ProvinceTable';
import ProvinceModal from '../../../components/organisms/Province/ProvinceModal';
import ContentHeader from '../../../components/organisms/ContentHeader';

import { ProvinceModelType } from '../../../../models/location/provinceModel';

interface ProvinceProps {
  province: ProvinceModelType;
  dispatch: Dispatch;
}

const ProvincePage: FC<ProvinceProps> = ({ province, dispatch }) => {
  return (
    <>
      <ContentHeader
        prefix="Location"
        name="Province"
        onClick={() => dispatch?.({type: 'province/openModal'})}
        createButtonLoading={province.createButtonLoading}
      />
      <ProvinceTable />
      <ProvinceModal />
    </>
  );
};

export default connect(({ province }: { province: ProvinceModelType }) => ({
  province,
}))(ProvincePage);
