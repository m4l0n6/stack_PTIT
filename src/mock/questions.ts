import { Question, Answer, Comment } from '@/services/Questions/typing';
import { parse } from 'url';

// Dữ liệu mẫu cho câu hỏi
const questions: Question[] = [
  {
    id: 1,
    title: "Làm thế nào để tạo một REST API với Node.js?",
    content: "Tôi đang học về phát triển web và muốn tạo một REST API đơn giản bằng Node.js. Có thể cho tôi hướng dẫn chi tiết về cách thực hiện không?",
    tags: ["nodejs", "javascript", "restapi", "backend"],
    user: {
      id: 1,
      name: "Sinh Viên 1",
      avatar: "https://via.placeholder.com/150",
    },
    createdAt: "2023-10-01",
    voteCount: 15,
    answerCount: 2,
    viewCount: 120,
    answers: [
      {
        id: 1,
        content: "Để tạo một REST API với Node.js, bạn có thể sử dụng Express.js - một framework phổ biến và dễ sử dụng. Đây là các bước cơ bản:\n\n1. Cài đặt Node.js và npm\n2. Tạo thư mục dự án và khởi tạo package.json: `npm init -y`\n3. Cài đặt Express: `npm install express`\n4. Tạo file index.js với nội dung sau:\n\n```javascript\nconst express = require('express');\nconst app = express();\nconst port = 3000;\n\napp.use(express.json());\n\napp.get('/api/items', (req, res) => {\n  res.json([{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }]);\n});\n\napp.post('/api/items', (req, res) => {\n  const newItem = req.body;\n  // Xử lý lưu dữ liệu vào database\n  res.status(201).json(newItem);\n});\n\napp.listen(port, () => {\n  console.log(`API running at http://localhost:${port}`);\n});\n```\n\n5. Chạy server: `node index.js`\n\nĐể API chuyên nghiệp hơn, bạn nên thêm các middleware như cors, helmet để bảo mật, và mongoose hoặc sequelize để kết nối database.",
        user: {
          id: 2,
          name: "Giảng Viên 1",
          avatar: "https://via.placeholder.com/150",
        },
        createdAt: "2023-10-02",
        voteCount: 7,
        isAccepted: true,
        commentCount: 2,
        comments: [
          {
            id: 1,
            content: "Rất hữu ích, cảm ơn thầy!",
            user: {
              id: 1,
              name: "Sinh Viên 1",
              avatar: "https://via.placeholder.com/150",
            },
            createdAt: "2023-10-02"
          },
          {
            id: 2,
            content: "Bạn có thể thêm dotenv để quản lý biến môi trường nữa nhé",
            user: {
              id: 3,
              name: "Quản Trị Viên",
              avatar: "https://via.placeholder.com/150",
            },
            createdAt: "2023-10-03"
          }
        ]
      },
      {
        id: 2,
        content: "Ngoài Express.js mà giảng viên đã đề cập, bạn cũng có thể thử NestJS - một framework Node.js hiện đại được xây dựng trên Express và sử dụng TypeScript.\n\nNestJS cung cấp kiến trúc ứng dụng module, dependency injection và nhiều tính năng cao cấp khác. Nó rất phù hợp cho các API lớn và phức tạp.\n\nĐây là một ví dụ đơn giản với NestJS:\n\n```typescript\n// items.controller.ts\nimport { Controller, Get, Post, Body } from '@nestjs/common';\n\n@Controller('items')\nexport class ItemsController {\n  @Get()\n  findAll() {\n    return [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];\n  }\n\n  @Post()\n  create(@Body() createItemDto) {\n    return createItemDto;\n  }\n}\n```\n\nNestJS có learning curve cao hơn Express nhưng lại mang lại cấu trúc và tính bảo trì tốt hơn cho dự án lớn.",
        user: {
          id: 3,
          name: "Quản Trị Viên",
          avatar: "https://via.placeholder.com/150",
        },
        createdAt: "2023-10-03",
        voteCount: 5,
        isAccepted: false,
        commentCount: 1,
        comments: [
          {
            id: 3,
            content: "NestJS có vẻ phức tạp hơn cho người mới bắt đầu, nhưng cảm ơn về gợi ý này!",
            user: {
              id: 1,
              name: "Sinh Viên 1",
              avatar: "https://via.placeholder.com/150",
            },
            createdAt: "2023-10-04"
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Cách tối ưu hóa hiệu suất ứng dụng React",
    content: "Ứng dụng React của tôi đang chạy khá chậm khi xử lý một lượng lớn dữ liệu. Tôi đã thử sử dụng React.memo và useCallback nhưng vẫn chưa đạt được hiệu quả như mong đợi. Có ai có kinh nghiệm tối ưu hóa React có thể chia sẻ một số kỹ thuật không?",
    tags: ["react", "javascript", "performance", "frontend"],
    user: {
      id: 2,
      name: "Giảng Viên 1",
      avatar: "https://via.placeholder.com/150",
    },
    createdAt: "2023-10-05",
    voteCount: 20,
    answerCount: 1,
    viewCount: 200,
    answers: [
      {
        id: 3,
        content: "Tối ưu hóa hiệu suất React là một chủ đề rộng lớn, nhưng đây là một số kỹ thuật phổ biến:\n\n1. **Code-splitting với React.lazy và Suspense**: Chia nhỏ bundle để tải theo nhu cầu\n2. **Virtualization**: Sử dụng thư viện như react-window hoặc react-virtualized để render một số lượng lớn mục mà không ảnh hưởng đến hiệu suất\n3. **useMemo cho tính toán phức tạp**: Tránh tính toán lại những giá trị phức tạp mỗi lần render\n4. **Debounce và throttle cho các sự kiện thường xuyên**: Như scroll, resize, input search\n5. **Web Workers**: Di chuyển xử lý nặng ra khỏi main thread\n6. **Profiling**: Sử dụng React Profiler và Chrome Performance tab để tìm bottleneck\n\nNếu bạn đề cập cụ thể hơn về vấn đề, tôi có thể cho lời khuyên chi tiết hơn.",
        user: {
          id: 3,
          name: "Quản Trị Viên",
          avatar: "https://via.placeholder.com/150",
        },
        createdAt: "2023-10-06",
        voteCount: 12,
        isAccepted: true,
        commentCount: 0,
        comments: []
      }
    ]
  },
  {
    id: 3,
    title: "Cách xử lý authentication trong ứng dụng UmiJS",
    content: "Tôi đang xây dựng một ứng dụng với UmiJS và cần triển khai hệ thống xác thực người dùng. Tôi đã thử một vài cách nhưng vẫn gặp vấn đề với việc lưu trữ token và bảo vệ các route. Ai có kinh nghiệm với UmiJS có thể chia sẻ cách tiếp cận tốt nhất?",
    tags: ["umijs", "authentication", "react", "typescript"],
    user: {
      id: 3,
      name: "Quản Trị Viên",
      avatar: "https://via.placeholder.com/150",
    },
    createdAt: "2023-10-10",
    voteCount: 8,
    answerCount: 0,
    viewCount: 150,
  },
];

// Dữ liệu mẫu cho comments, answers
let nextQuestionId = questions.length + 1;
let nextAnswerId = 4; // Dựa vào dữ liệu mẫu đã có
let nextCommentId = 4; // Dựa vào dữ liệu mẫu đã có

export default {
  // API lấy danh sách câu hỏi
  'GET /api/questions': (req: any, res: any) => {
    const { query = {} } = parse(req.url || '', true);
    const { sort, filter, page = '1', pageSize = '10' } = query;
    
    let result = [...questions];
    
    // Sắp xếp câu hỏi
    if (sort === 'newest') {
      // Sắp xếp theo ngày tạo mới nhất (gần đây nhất lên đầu)
      result.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA; // Sắp xếp giảm dần theo thời gian
      });
    } else if (sort === 'popular') {
      result.sort((a, b) => b.voteCount - a.voteCount);
    }
    
    // Lọc câu hỏi
    if (filter === 'no answer') {
      result = result.filter(q => q.answerCount === 0);
    } else if (filter === 'answered') {
      result = result.filter(q => q.answerCount > 0);
    }
    
    // Phân trang
    const pageNumber = parseInt(page as string, 10);
    const pageSizeNumber = parseInt(pageSize as string, 10);
    const startIndex = (pageNumber - 1) * pageSizeNumber;
    const endIndex = pageNumber * pageSizeNumber;
    const paginatedResult = result.slice(startIndex, endIndex);
    
    res.send({
      success: true,
      data: {
        list: paginatedResult,
        total: result.length,
        page: pageNumber,
        pageSize: pageSizeNumber,
      },
    });
  },
  
  // API lấy chi tiết một câu hỏi
  'GET /api/questions/:id': (req: any, res: any) => {
    const id = parseInt(req.params.id, 10);
    const question = questions.find(q => q.id === id);
    
    if (question) {
      // Tăng số lượt xem khi truy cập chi tiết
      const updatedQuestion = { ...question, viewCount: question.viewCount + 1 };
      const index = questions.findIndex(q => q.id === id);
      questions[index] = updatedQuestion;
      
      res.send({
        success: true,
        data: updatedQuestion,
      });
    } else {
      res.status(404).send({
        success: false,
        message: 'Không tìm thấy câu hỏi',
      });
    }
  },
  
  // API tạo câu hỏi mới
  'POST /api/questions': (req: any, res: any) => {
    const { title, content, tags } = req.body;
    const token = req.headers.authorization?.split(' ')[1];
    
    // Kiểm tra token (giả định token có dạng mock-token-{userId})
    if (!token || !token.startsWith('mock-token-')) {
      return res.status(401).send({
        success: false,
        message: 'Bạn cần đăng nhập để đặt câu hỏi',
      });
    }
    
    const userId = parseInt(token.replace('mock-token-', ''), 10);
    
    if (!title || !content) {
      return res.status(400).send({
        success: false,
        message: 'Tiêu đề và nội dung là bắt buộc',
      });
    }
    
    // Lấy thông tin người dùng giả định
    let userName = 'Người dùng';
    let userAvatar = 'https://via.placeholder.com/150';
    
    if (userId === 1) {
      userName = "Sinh Viên 1";
    } else if (userId === 2) {
      userName = "Giảng Viên 1";
    } else if (userId === 3) {
      userName = "Quản Trị Viên";
    }
    
    const newQuestion: Question = {
      id: nextQuestionId++,
      title,
      content,
      tags: tags || [],
      user: {
        id: userId,
        name: userName,
        avatar: userAvatar,
      },
      createdAt: new Date().toISOString().split('T')[0],
      voteCount: 0,
      answerCount: 0,
      viewCount: 1,
      answers: [],
    };
    
    questions.push(newQuestion);
    
    res.send({
      success: true,
      data: newQuestion,
    });
  },
  
  // API vote cho câu hỏi
  'POST /api/questions/:id/vote': (req: any, res: any) => {
    const id = parseInt(req.params.id, 10);
    const { direction } = req.body; // 'up' hoặc 'down'
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token || !token.startsWith('mock-token-')) {
      return res.status(401).send({
        success: false,
        message: 'Bạn cần đăng nhập để bình chọn',
      });
    }
    
    const question = questions.find(q => q.id === id);
    
    if (!question) {
      return res.status(404).send({
        success: false,
        message: 'Không tìm thấy câu hỏi',
      });
    }
    
    const index = questions.findIndex(q => q.id === id);
    const updatedQuestion = { ...question };
    
    if (direction === 'up') {
      updatedQuestion.voteCount += 1;
    } else if (direction === 'down') {
      updatedQuestion.voteCount -= 1;
    }
    
    questions[index] = updatedQuestion;
    
    res.send({
      success: true,
      data: updatedQuestion,
    });
  },
  
  // API thêm câu trả lời
  'POST /api/questions/:id/answers': (req: any, res: any) => {
    const questionId = parseInt(req.params.id, 10);
    const { content } = req.body;
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token || !token.startsWith('mock-token-')) {
      return res.status(401).send({
        success: false,
        message: 'Bạn cần đăng nhập để trả lời câu hỏi',
      });
    }
    
    const userId = parseInt(token.replace('mock-token-', ''), 10);
    
    if (!content) {
      return res.status(400).send({
        success: false,
        message: 'Nội dung câu trả lời là bắt buộc',
      });
    }
    
    const question = questions.find(q => q.id === questionId);
    
    if (!question) {
      return res.status(404).send({
        success: false,
        message: 'Không tìm thấy câu hỏi',
      });
    }
    
    // Lấy thông tin người dùng giả định
    let userName = 'Người dùng';
    let userAvatar = 'https://via.placeholder.com/150';
    
    if (userId === 1) {
      userName = "Sinh Viên 1";
    } else if (userId === 2) {
      userName = "Giảng Viên 1";
    } else if (userId === 3) {
      userName = "Quản Trị Viên";
    }
    
    const newAnswer: Answer = {
      id: nextAnswerId++,
      content,
      user: {
        id: userId,
        name: userName,
        avatar: userAvatar,
      },
      createdAt: new Date().toISOString().split('T')[0],
      voteCount: 0,
      isAccepted: false,
      commentCount: 0,
      comments: [],
    };
    
    const questionIndex = questions.findIndex(q => q.id === questionId);
    
    // Thêm câu trả lời và cập nhật answerCount
    if (!questions[questionIndex].answers) {
      questions[questionIndex].answers = [];
    }
    
    questions[questionIndex].answers?.push(newAnswer);
    questions[questionIndex].answerCount += 1;
    
    res.send({
      success: true,
      data: newAnswer,
    });
  },
  
  // API vote cho câu trả lời
  'POST /api/questions/:questionId/answers/:answerId/vote': (req: any, res: any) => {
    const questionId = parseInt(req.params.questionId, 10);
    const answerId = parseInt(req.params.answerId, 10);
    const { direction } = req.body; // 'up' hoặc 'down'
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token || !token.startsWith('mock-token-')) {
      return res.status(401).send({
        success: false,
        message: 'Bạn cần đăng nhập để bình chọn',
      });
    }
    
    const question = questions.find(q => q.id === questionId);
    
    if (!question || !question.answers) {
      return res.status(404).send({
        success: false,
        message: 'Không tìm thấy câu hỏi hoặc câu trả lời',
      });
    }
    
    const answerIndex = question.answers.findIndex(a => a.id === answerId);
    
    if (answerIndex === -1) {
      return res.status(404).send({
        success: false,
        message: 'Không tìm thấy câu trả lời',
      });
    }
    
    // Cập nhật vote
    if (direction === 'up') {
      question.answers[answerIndex].voteCount += 1;
    } else if (direction === 'down') {
      question.answers[answerIndex].voteCount -= 1;
    }
    
    res.send({
      success: true,
      data: question.answers[answerIndex],
    });
  },
  
  // API đánh dấu câu trả lời là đúng (chấp nhận)
  'PUT /api/questions/:questionId/answers/:answerId/accept': (req: any, res: any) => {
    const questionId = parseInt(req.params.questionId, 10);
    const answerId = parseInt(req.params.answerId, 10);
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token || !token.startsWith('mock-token-')) {
      return res.status(401).send({
        success: false,
        message: 'Bạn cần đăng nhập để chấp nhận câu trả lời',
      });
    }
    
    const userId = parseInt(token.replace('mock-token-', ''), 10);
    const question = questions.find(q => q.id === questionId);
    
    if (!question || !question.answers) {
      return res.status(404).send({
        success: false,
        message: 'Không tìm thấy câu hỏi hoặc câu trả lời',
      });
    }
    
    // Kiểm tra xem người dùng có phải là người đặt câu hỏi không
    if (question.user.id !== userId) {
      return res.status(403).send({
        success: false,
        message: 'Chỉ người đặt câu hỏi mới có thể chấp nhận câu trả lời',
      });
    }
    
    const answerIndex = question.answers.findIndex(a => a.id === answerId);
    
    if (answerIndex === -1) {
      return res.status(404).send({
        success: false,
        message: 'Không tìm thấy câu trả lời',
      });
    }
    
    // Reset tất cả các câu trả lời về false
    question.answers.forEach(a => {
      a.isAccepted = false;
    });
    
    // Đánh dấu câu trả lời được chọn là true
    question.answers[answerIndex].isAccepted = true;
    
    res.send({
      success: true,
      data: question.answers[answerIndex],
    });
  },
  
  // API thêm bình luận cho câu trả lời
  'POST /api/questions/:questionId/answers/:answerId/comments': (req: any, res: any) => {
    const questionId = parseInt(req.params.questionId, 10);
    const answerId = parseInt(req.params.answerId, 10);
    const { content } = req.body;
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token || !token.startsWith('mock-token-')) {
      return res.status(401).send({
        success: false,
        message: 'Bạn cần đăng nhập để bình luận',
      });
    }
    
    const userId = parseInt(token.replace('mock-token-', ''), 10);
    
    if (!content) {
      return res.status(400).send({
        success: false,
        message: 'Nội dung bình luận là bắt buộc',
      });
    }
    
    const question = questions.find(q => q.id === questionId);
    
    if (!question || !question.answers) {
      return res.status(404).send({
        success: false,
        message: 'Không tìm thấy câu hỏi hoặc câu trả lời',
      });
    }
    
    const answerIndex = question.answers.findIndex(a => a.id === answerId);
    
    if (answerIndex === -1) {
      return res.status(404).send({
        success: false,
        message: 'Không tìm thấy câu trả lời',
      });
    }
    
    // Lấy thông tin người dùng giả định
    let userName = 'Người dùng';
    let userAvatar = 'https://via.placeholder.com/150';
    
    if (userId === 1) {
      userName = "Sinh Viên 1";
    } else if (userId === 2) {
      userName = "Giảng Viên 1";
    } else if (userId === 3) {
      userName = "Quản Trị Viên";
    }
    
    const newComment: Comment = {
      id: nextCommentId++,
      content,
      user: {
        id: userId,
        name: userName,
        avatar: userAvatar,
      },
      createdAt: new Date().toISOString().split('T')[0],
    };
    
    // Thêm bình luận và cập nhật commentCount
    if (!question.answers[answerIndex].comments) {
      question.answers[answerIndex].comments = [];
    }
    
    question.answers[answerIndex].comments?.push(newComment);
    question.answers[answerIndex].commentCount += 1;
    
    res.send({
      success: true,
      data: newComment,
    });
  },
  
  // API tìm kiếm câu hỏi
  'GET /api/questions/search': (req: any, res: any) => {
    const { query = {} } = parse(req.url || '', true);
    const { keyword, tag } = query;
    
    let result = [...questions];
    
    if (keyword) {
      const searchKeyword = (keyword as string).toLowerCase();
      result = result.filter(q => 
        q.title.toLowerCase().includes(searchKeyword) || 
        q.content.toLowerCase().includes(searchKeyword)
      );
    }
    
    if (tag) {
      result = result.filter(q => q.tags.includes(tag as string));
    }
    
    res.send({
      success: true,
      data: {
        list: result,
        total: result.length,
      },
    });
  }
}; 