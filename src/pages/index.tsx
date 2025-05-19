import yayJpg from '../assets/yay.jpg';
import { Button } from 'antd';

export default function HomePage() {
  return (
    <div>
      <h2>Yay! Welcome to umi!</h2>
      <p>
        <img src={yayJpg} width="388" title='img'/>
      </p>
      <p>
        <Button type="primary" onClick={() => window.open('https://umijs.org/zh-CN/docs')}>Get Started</Button>
      </p>
    </div>
  );
}
