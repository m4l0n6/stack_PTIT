import React from 'react';
import { Button, Result } from 'antd';
import { history} from 'umi'

const AuthAccessDenied: React.FC = () => {
  return (
    <Result
      status="403"
      title="403"
      subTitle="Xin lỗi, bạn không có quyền truy cập vào trang này."
      extra={<Button type="primary" onClick={() => history.push('/')}>Quay lại Trang Chủ</Button>}
    />
  );
}

export default AuthAccessDenied;