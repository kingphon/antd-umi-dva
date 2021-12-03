import { FC, useEffect } from 'react';
import { Checkbox, Form } from 'antd';
import { connect, Dispatch } from 'dva';

import FormInput from '../../../atoms/FormInput';
import FormCheckBox from '../../../atoms/FormCheckBox';
import ModalForm from '../../../molecules/ModalForm';

import {
  ProvinceModelType,
  Province,
} from '../../../../models/location/provinceModel';

interface ProvinceModalProps {
  province: ProvinceModelType;
  dispatch: Dispatch;
}

const ProvinceModal: FC<ProvinceModalProps> = ({ province, dispatch }) => {
  const provinceItem: Province = province.province;

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ ...provinceItem })
  }, [provinceItem]);

  return (
    <ModalForm
      title={provinceItem.key ? 'Update Province' : 'Create Province'}
      isModalVisible={province.openModal}
      handleOk={() =>
        form
          .validateFields()
          .then(
            dispatch?.({
              type: 'province/doSave',
              payload: form.getFieldsValue(),
            }),
          )
      }
      handleCancel={() => dispatch?.({ type: 'province/closeModal' })}
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
      <FormCheckBox name="customizeSlug" checked={provinceItem.customizeSlug} label='Customize Slug' onClick={dispatch?.({ type: 'province/onCustomSlug' })}/>
      <Form.Item
        name="customizeSlug"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox
          checked={provinceItem.customizeSlug}
          onChange={() => console.log('slug')}
        >
          Customize Slug
        </Checkbox>
      </Form.Item>
      {provinceItem.customizeSlug && (
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
