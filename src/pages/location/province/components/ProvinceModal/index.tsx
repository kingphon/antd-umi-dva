import { FC, useEffect, useState } from 'react';
import { Form } from 'antd';
import { connect, Dispatch } from 'dva';

import FormInput from '../../../../../components/atoms/FormInput';
import FormCheckBox from '../../../../../components/atoms/FormCheckBox';
import ModalForm from '../../../../../components/molecules/ModalForm';

import { makeSlug } from '@/commons/utils';

import {
  ProvinceModelType,
  Province,
} from '../../../../../models/location/provinceModel';

interface ProvinceModalProps {
  province: ProvinceModelType;
  dispatch: Dispatch;
  modalStatus: boolean;
  setModalStatus: any;
}

const ProvinceModal: FC<ProvinceModalProps> = ({
  province,
  dispatch,
  modalStatus,
  setModalStatus,
}) => {
  const [customizeSlug, setCustomizeSlug] = useState(false);

  const provinceItem: Province = province.province;

  const [form] = Form.useForm();

  const doSave = () => {
    form.validateFields().then(() => {
      const values = form.getFieldsValue();
      const { key, name, slugName } = values;
      const params = {
        name,
        slugName: customizeSlug ? makeSlug(slugName) : makeSlug(name),
        status: !provinceItem.status && 'ACTIVE',
      };

      if (!key) {
        dispatch?.({ type: 'province/doCreate', payload: params });
      } else {
        dispatch?.({ type: 'province/doUpdate', payload: { ...params, key } });
      }
      setModalStatus(false);
    });
  };

  useEffect(() => {
    form.setFieldsValue({ ...provinceItem });
  }, [provinceItem]);

  return (
    <ModalForm
      title={provinceItem.key ? 'Update Province' : 'Create Province'}
      isModalVisible={modalStatus}
      handleOk={doSave}
      handleCancel={() => {
        setModalStatus(false);
        dispatch?.({
          type: 'province/setProvince',
          province: {
            key: '',
            name: '',
            customizeSlug: false,
            slugName: '',
          },
        });
      }}
      form={form}
      formName="provinceForm"
    >
      {provinceItem.key && (
        <FormInput label="Key" name="key" required={true} disabled={true} />
      )}
      <FormInput
        label="Name"
        name="name"
        required={true}
        message="Please input province name"
      />
      <FormCheckBox
        name="customizeSlug"
        checked={customizeSlug}
        label="Customize Slug"
        onClick={() => setCustomizeSlug(!customizeSlug)}
      />
      {customizeSlug && (
        <FormInput
          label="Slug Name"
          name="slugName"
          required={true}
          message="Please input slug name"
        />
      )}
    </ModalForm>
  );
};

export default connect(({ province }: { province: ProvinceModelType }) => ({
  province,
}))(ProvinceModal);
