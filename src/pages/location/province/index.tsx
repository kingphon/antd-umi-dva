import { FC, useState } from 'react';

import ProvinceTable from './components/ProvinceTable';
import ProvinceModal from './components/ProvinceModal';
import ContentHeader from '../../../components/organisms/ContentHeader';

const ProvincePage: FC = () => {
  const [modalStatus, setModalStatus] = useState(false);
  return (
    <>
      <ContentHeader
        prefix="Location"
        name="Province"
        onClick={() => setModalStatus(true)}
      />
      <ProvinceTable setModalStatus={setModalStatus} />
      {modalStatus && (
        <ProvinceModal
          modalStatus={modalStatus}
          setModalStatus={setModalStatus}
        />
      )}
    </>
  );
};

export default ProvincePage;
