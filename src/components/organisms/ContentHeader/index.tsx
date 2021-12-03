import { FC } from 'react'
import { Button } from 'antd'

interface PathName {
  prefix: string
  name: string
  onClick: any
  createButtonLoading: boolean
}

const ContentHeader: FC<PathName> = ({ prefix, name, onClick, createButtonLoading }) => {
  return (
    <div style={{ background: 'white', display: 'flex', justifyContent: 'space-between', padding: '0.5rem 2rem', alignItems: 'center' }}>
      <div>
        <span style={{ color: '#999' }}>{`${prefix} /`}</span>
        <span style={{ cursor: 'pointer' }}> {name}</span>
      </div>
      <div>
        <Button onClick={onClick} type="primary" 
        loading={createButtonLoading}
        >
          Tạo mới
        </Button>
      </div>
    </div>
  )
}

export default ContentHeader
