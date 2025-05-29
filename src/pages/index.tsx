import { Button } from 'antd';
import { useModel } from 'umi';

export default function HomePage() {
  const { user } = useModel('user');
  return (
    <div>
      {user ? (
        <div>
          <h1 className="mb-4 font-bold text-3xl">
            Chào mừng quay trở lại, {user.username} !
          </h1>
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
