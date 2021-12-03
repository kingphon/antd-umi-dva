import React, { FC } from 'react'
import { Form, Input } from 'antd'

interface InputProps {
  label: string
  name: string
  required?: boolean
  message?: string
  disabled?: boolean
}

const FormInput: FC<InputProps> = ({ label, name, required = false, message, disabled = false }) => {
  return (
    <Form.Item label={label} name={name} rules={[{ required, message }]}>
      <Input disabled={disabled} />
    </Form.Item>
  )
}

export default FormInput
