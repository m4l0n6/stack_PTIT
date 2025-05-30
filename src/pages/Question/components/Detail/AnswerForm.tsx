import React, { useRef } from "react";
import { Card, Button, Typography } from "antd";
import { history } from "umi";
import TinyEditor from "@/components/TinyEditor";

const { Text } = Typography;

interface AnswerFormProps {
  isAuthenticated: boolean;
  isSubmitting: boolean;
  handleSubmit: () => Promise<void>;
  onEditorInit: (editor: any) => void;
}

const AnswerForm: React.FC<AnswerFormProps> = ({
  isAuthenticated,
  isSubmitting,
  handleSubmit,
  onEditorInit,
}) => {
  return (
    <div className="mt-6">
      <Card title="Câu trả lời của bạn">
        {isAuthenticated ? (
          <div>
            <TinyEditor onEditorInit={onEditorInit} />
            <div className="mt-4">
              <Button
                type="primary"
                onClick={handleSubmit}
                loading={isSubmitting}
              >
                Đăng câu trả lời
              </Button>
            </div>
          </div>
        ) : (
          <div className="py-4 text-center">
            <Text type="secondary">
              Vui lòng{" "}
              <a onClick={() => history.push("/auth/login")}>đăng nhập</a> để
              trả lời câu hỏi này
            </Text>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AnswerForm;
