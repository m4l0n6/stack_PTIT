import { Button, Typography } from 'antd';
import { useModel } from 'umi';
import ModalTagFollow from '@/components/ModalTagFollow';
import { useModal } from '@/hooks/useModal';

const { Title } = Typography;

export default function HomePage() {
  const { user } = useModel('user');
  const { visble, setVisible } = useModal();
  
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
          <p className="mb-4 text-lg">Nơi bạn có thể đặt câu hỏi và tìm kiếm câu trả lời</p>
          <Button
            type="primary"
            onClick={() => {
              setVisible(true);
            }}
            className="mb-4"
          >
            Thiết lập thẻ theo dõi
          </Button>
          <ModalTagFollow 
            visible={visble} 
            setVisible={setVisible} 
          />
        </div>
      )}
    </div>
  );
}
