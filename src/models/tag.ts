import { useState, useEffect } from "react";
import { Tag } from '@/services/Tags/typing';
import { getTags, searchTags } from '@/services/Tags';
import { message } from "antd";

export default () => {
    const [tags, setTags] = useState<Tag[]>([]);
    const [filter, setFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState<boolean>(true);
    const pageSize = 12; // Số lượng thẻ mỗi trang
    
    const paginatedTags = tags.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );
  
    // Reset về trang đầu tiên khi thay đổi filter
    useEffect(() => {
        setCurrentPage(1);
    }, [filter]);

    const fetchTags = async () => {
        try {
        setLoading(true);
        const result = await getTags();
        if (result.success) {
            setTags(result.data);
        } else {
            message.error("Không thể lấy danh sách tags");
        }
        } catch (error) {
        console.error("Error fetching tags:", error);
        message.error("Đã xảy ra lỗi khi lấy danh sách tags");
        } finally {
        setLoading(false);
        }
    };

    // Lấy danh sách tags từ API
    useEffect(() => {
        fetchTags();
    }, []);

    // Tìm kiếm tags
    const handleSearch = async () => {
        if (!filter) {
        fetchTags();
        return;
        }

        try {
        setLoading(true);
        const result = await searchTags(filter);
        if (result.success) {
            setTags(result.data);
            setCurrentPage(1); // Reset về trang đầu tiên khi tìm kiếm
        } else {
            message.error("Không thể tìm kiếm tags");
        }
        } catch (error) {
        console.error("Error searching tags:", error);
        message.error("Đã xảy ra lỗi khi tìm kiếm tags");
        } finally {
        setLoading(false);
        }
    };

    return {
        tags,
        loading,
        pageSize,
        filter,
        setFilter,
        currentPage,
        setCurrentPage,
        paginatedTags,
        handleSearch,
        fetchTags,
    };
}