import { FC } from 'react';
import { Form, Checkbox } from 'antd';

interface InputProps {
  label: string;
  name: string;
  wrapperCol?: any;
  checked: any;
  onClick: any;
  required?: boolean;
  message?: string;
  disabled?: boolean;
}

const FormInput: FC<InputProps> = ({
  label,
  name,
  wrapperCol = { offset: 8, span: 16 },
  checked,
  onClick,
}) => {
  return (
    <Form.Item name={name} wrapperCol={wrapperCol}>
      <Checkbox checked={checked} onChange={onClick}>
        {label}
      </Checkbox>
    </Form.Item>
  );
};

export default FormInput;
