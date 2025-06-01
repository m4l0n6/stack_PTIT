import { Button, Typography } from 'antd';
import { useModel } from 'umi';

const { Title } = Typography;

export default function HomePage() {
  const { user } = useModel('user');
  return (
    <div>
      {user ? (
        <div>
          <Title level={2}>Chào mừng trở lại, {user.username}!</Title>
          <p className="text-lg">Khám phá câu câu hỏi mà bạn yêu thích</p>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <h1 className="text-3xl">Welcome to Stack PTIT</h1>
          <Button
            type="primary"
            onClick={() => window.open("/auth/login")}
            className="mt-4"
          >
            Log In
          </Button>
        </div>
      )}
    </div>
  );
}
