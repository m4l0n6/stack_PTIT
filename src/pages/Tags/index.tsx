import React from 'react';
import { Layout } from 'antd';
import Tags from './Components/Tags';

const { Content } = Layout;

const TagsPage: React.FC = () => {
  return (
    <Layout>
      <Content style={{ padding: '16px', background: '#f0f2f5' }}>
        <Tags />
      </Content>
    </Layout>
  );
};

export default TagsPage;