import React, { FC } from 'react'
import { Form, Modal } from 'antd'

interface ModalProps {
  title: string
  isModalVisible: boolean
  handleOk: any
  handleCancel: any
  form: any
  labelAlign?: string
  formName: string
  labelCol?: number
  wrapperCol?: number
  autoComplete?: string
  children: any
}

const ModalForm: FC<ModalProps> = ({
  title,
  isModalVisible,
  handleOk,
  handleCancel,
  form,
  labelAlign = 'left',
  formName,
  labelCol = 8,
  wrapperCol = 16,
  autoComplete = 'off',
  children
}) => {
  return (
    <Modal
      destroyOnClose={true}
      closable={false}
      title={title}
      visible={isModalVisible}
      okButtonProps={{ htmlType: 'submit' }}
      onOk={handleOk}
      onCancel={handleCancel}>
      <Form
        preserve={false}
        form={form}
        labelAlign={labelAlign}
        name={formName}
        labelCol={{ span: labelCol }}
        wrapperCol={{ span: wrapperCol }}
        autoComplete={autoComplete}>
        {children}
      </Form>
    </Modal>
  )
}

export default ModalForm
