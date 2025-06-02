import React, { useState } from 'react'
import { Button, Modal, Input } from 'antd'
import { useModel } from 'umi';

interface ModalTagFollowProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

const ModalTagFollow: React.FC<ModalTagFollowProps> = ({ visible, setVisible }) => {
    const { tags } = useModel('tag');
    const [selectedTags, setSelectedTags] = useState<number[]>([]);

    const toggleTag = (id: number) => {
        setSelectedTags((prev) =>
            prev.includes(id) ? prev.filter((tagId) => tagId !== id) : [...prev, id]
        );
    };

    return (
        <Modal
            title="Hãy thiết lập thẻ theo dõi"
            open={visible}
            footer={false}
            onCancel={() => setVisible(false)}
            width={400}
        >
            <div className="flex flex-col gap-4">
                <p>
                    Hãy chọn các thẻ mà bạn quan tâm để nhận thông báo khi có câu hỏi mới
                    liên quan đến thẻ đó.
                </p>

                <div>
                    <p className="mb-2">Chọn các thẻ theo dõi:</p>
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <Button
                                key={tag.id}
                                type={selectedTags.includes(tag.id) ? 'primary' : 'default'}
                                onClick={() => toggleTag(tag.id)}
                                size='middle'
                                style={{ borderRadius: 10 }}
                            >
                                {tag.name}
                            </Button>
                        ))}
                    </div>
                </div>

                <p>
                    Hoặc bạn có thể tìm kiếm thêm
                </p>
                <Input.Search
                    placeholder="Tìm kiếm thẻ..."
                    allowClear
                    size="large"
                    onSearch={(value) => {
                        // Xử lý tìm kiếm thẻ ở đây
                        console.log('Tìm kiếm thẻ:', value);
                    }}
                />
                <Button
                    type="primary"
                    onClick={() => setVisible(false)}
                    disabled={selectedTags.length === 0}
                >
                    Thiết lập thẻ theo dõi
                </Button>
            </div>
        </Modal>
    );
}

export default ModalTagFollow
