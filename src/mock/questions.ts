import { Question } from '@/services/Questions/typing';
import { Answer } from '@/services/Answers/typing';
import { Comment } from '@/services/Comments/typing';
import { Tag } from '@/services/Tags/typing';
import users from './users';
import { tags, question_tags } from './tags';
import { Vote } from '@/services/Votes/typing';
import { parse } from 'url';


// Dữ liệu mẫu cho questions
const questions: Question[] = [
  {
    id: 1,
    user_id: 1,
    title: "Làm thế nào để tạo một REST API với Node.js?",
    content: "Tôi đang học về phát triển web và muốn tạo một REST API đơn giản bằng Node.js. Có thể cho tôi hướng dẫn chi tiết về cách thực hiện không?",
    created_at: "2023-10-01",
    updated_at: "2023-10-01",
    views: 120,
    upvotes: 15,
    downvotes: 0,
    user: users[2],
    tags: [tags[0], tags[1], tags[2], tags[3]],
    answer_count: 2
  },
  {
    id: 2,
    user_id: 2,
    title: "Cách tối ưu hóa hiệu suất ứng dụng React",
    content: "Ứng dụng React của tôi đang chạy khá chậm khi xử lý một lượng lớn dữ liệu. Tôi đã thử sử dụng React.memo và useCallback nhưng vẫn chưa đạt được hiệu quả như mong đợi. Có ai có kinh nghiệm tối ưu hóa React có thể chia sẻ một số kỹ thuật không?",
    created_at: "2023-10-05",
    updated_at: "2023-10-05",
    views: 200,
    upvotes: 20,
    downvotes: 0,
    user: users[1],
    tags: [tags[4], tags[1], tags[5], tags[6]],
    answer_count: 1
  },
  {
    id: 3,
    user_id: 1,
    title: "Cách xử lý authentication trong ứng dụng UmiJS",
    content: "Tôi đang xây dựng một ứng dụng với UmiJS và cần triển khai hệ thống xác thực người dùng. Tôi đã thử một vài cách nhưng vẫn gặp vấn đề với việc lưu trữ token và bảo vệ các route. Ai có kinh nghiệm với UmiJS có thể chia sẻ cách tiếp cận tốt nhất?",
    created_at: "2023-10-10",
    updated_at: "2023-10-10",
    views: 150,
    upvotes: 8,
    downvotes: 0,
    user: users[0],
    tags: [tags[7], tags[8], tags[4], tags[9]],
    answer_count: 0
  },
];

// Dữ liệu mẫu cho answers
const answers: Answer[] = [
  {
    id: 1,
    question_id: 1,
    user_id: 2,
    content: "Để tạo một REST API với Node.js, bạn có thể sử dụng Express.js - một framework phổ biến và dễ sử dụng. Đây là các bước cơ bản:\n\n1. Cài đặt Node.js và npm\n2. Tạo thư mục dự án và khởi tạo package.json: `npm init -y`\n3. Cài đặt Express: `npm install express`\n4. Tạo file index.js với nội dung sau:\n\n```javascript\nconst express = require('express');\nconst app = express();\nconst port = 3000;\n\napp.use(express.json());\n\napp.get('/api/items', (req, res) => {\n  res.json([{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }]);\n});\n\napp.post('/api/items', (req, res) => {\n  const newItem = req.body;\n  // Xử lý lưu dữ liệu vào database\n  res.status(201).json(newItem);\n});\n\napp.listen(port, () => {\n  console.log(`API running at http://localhost:${port}`);\n});\n```\n\n5. Chạy server: `node index.js`\n\nĐể API chuyên nghiệp hơn, bạn nên thêm các middleware như cors, helmet để bảo mật, và mongoose hoặc sequelize để kết nối database.",
    created_at: "2023-10-02",
    updated_at: "2023-10-02",
    upvotes: 7,
    downvotes: 0,
    is_accepted: true,
    user: users[1],
    comment_count: 2
  },
  {
    id: 2,
    question_id: 1,
    user_id: 3,
    content: "Ngoài Express.js mà giảng viên đã đề cập, bạn cũng có thể thử NestJS - một framework Node.js hiện đại được xây dựng trên Express và sử dụng TypeScript.\n\nNestJS cung cấp kiến trúc ứng dụng module, dependency injection và nhiều tính năng cao cấp khác. Nó rất phù hợp cho các API lớn và phức tạp.\n\nĐây là một ví dụ đơn giản với NestJS:\n\n```typescript\n// items.controller.ts\nimport { Controller, Get, Post, Body } from '@nestjs/common';\n\n@Controller('items')\nexport class ItemsController {\n  @Get()\n  findAll() {\n    return [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];\n  }\n\n  @Post()\n  create(@Body() createItemDto) {\n    return createItemDto;\n  }\n}\n```\n\nNestJS có learning curve cao hơn Express nhưng lại mang lại cấu trúc và tính bảo trì tốt hơn cho dự án lớn.",
    created_at: "2023-10-03",
    updated_at: "2023-10-03",
    upvotes: 5,
    downvotes: 0,
    is_accepted: false,
    user: users[2],
    comment_count: 1
  },
  {
    id: 3,
    question_id: 2,
    user_id: 3,
    content: "Tối ưu hóa hiệu suất React là một chủ đề rộng lớn, nhưng đây là một số kỹ thuật phổ biến:\n\n1. **Code-splitting với React.lazy và Suspense**: Chia nhỏ bundle để tải theo nhu cầu\n2. **Virtualization**: Sử dụng thư viện như react-window hoặc react-virtualized để render một số lượng lớn mục mà không ảnh hưởng đến hiệu suất\n3. **useMemo cho tính toán phức tạp**: Tránh tính toán lại những giá trị phức tạp mỗi lần render\n4. **Debounce và throttle cho các sự kiện thường xuyên**: Như scroll, resize, input search\n5. **Web Workers**: Di chuyển xử lý nặng ra khỏi main thread\n6. **Profiling**: Sử dụng React Profiler và Chrome Performance tab để tìm bottleneck\n\nNếu bạn đề cập cụ thể hơn về vấn đề, tôi có thể cho lời khuyên chi tiết hơn.",
    created_at: "2023-10-06",
    updated_at: "2023-10-06",
    upvotes: 12,
    downvotes: 0,
    is_accepted: true,
    user: users[2],
    comment_count: 0
  }
];

// Dữ liệu mẫu cho comments
const comments: Comment[] = [
  {
    id: 1,
    user_id: 1,
    content: "Rất hữu ích, cảm ơn thầy!",
    created_at: "2023-10-02",
    answer_id: 1,
    user: users[0]
  },
  {
    id: 2,
    user_id: 3,
    content: "Bạn có thể thêm dotenv để quản lý biến môi trường nữa nhé",
    created_at: "2023-10-03",
    answer_id: 1,
    user: users[2]
  },
  {
    id: 3,
    user_id: 1,
    content: "NestJS có vẻ phức tạp hơn cho người mới bắt đầu, nhưng cảm ơn về gợi ý này!",
    created_at: "2023-10-04",
    answer_id: 2,
    user: users[0]
  }
];

// Dữ liệu mẫu cho votes
const votes: Vote[] = [
  // Votes cho question 1
  { id: 1, user_id: 2, vote_type: 1, question_id: 1 },
  { id: 2, user_id: 3, vote_type: 1, question_id: 1 },
  // ... thêm votes khác
  
  // Votes cho answer 1
  { id: 10, user_id: 1, vote_type: 1, answer_id: 1 },
  { id: 11, user_id: 3, vote_type: 1, answer_id: 1 },
  // ... thêm votes khác
];

// Biến đếm cho ID mới
let nextQuestionId = questions.length + 1;
let nextAnswerId = answers.length + 1;
let nextCommentId = comments.length + 1;
let nextVoteId = votes.length + 1;

export default {
  // API lấy danh sách câu hỏi
  'GET /api/questions': (req: any, res: any) => {
    const { query = {} } = parse(req.url || '', true);
    const { sort, filter, page = '1', pageSize = '10' } = query;
    
    let result = [...questions].map(question => {      // Đảm bảo mỗi câu hỏi có đầy đủ thông tin user và tags
      const questionWithRelations = {
        ...question,
        user: users.find(u => u.id === question.user_id),
        tags: tags.filter(t => question_tags.some(qt => qt.question_id === question.id && qt.tag_id === t.id))
          .map(t => {
            // Calculate the count for each tag
            const count = question_tags.filter(qt => qt.tag_id === t.id).length;
            return { ...t, count };
          })
      };
      return questionWithRelations;
    });
    
    // Sắp xếp câu hỏi
    if (sort === 'newest') {
      // Sắp xếp theo ngày tạo mới nhất (gần đây nhất lên đầu)
      result.sort((a, b) => {
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();
        return dateB - dateA; // Sắp xếp giảm dần theo thời gian
      });
    } else if (sort === 'popular') {
      result.sort((a, b) => ((b.upvotes - b.downvotes) - (a.upvotes - a.downvotes)));
    }
    
    // Lọc câu hỏi
    if (filter === 'no answer') {
      result = result.filter(q => q.answer_count === 0);
    } else if (filter === 'answered') {
      result = result.filter(q => (q.answer_count ?? 0) > 0);
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
    console.log("API request for question ID:", id); // Log để debug
    
    const question = questions.find(q => q.id === id);
    
    if (question) {
      // Tăng số lượt xem khi truy cập chi tiết
      const updatedQuestion = { ...question, views: question.views + 1 };
      const index = questions.findIndex(q => q.id === id);
      questions[index] = updatedQuestion;
      
      // Lấy thêm thông tin liên quan
      const questionAnswers = answers.filter(a => a.question_id === id).map(answer => {
        // Thêm thông tin người dùng và comment cho mỗi câu trả lời
        return {
          ...answer,
          user: users.find(u => u.id === answer.user_id),
          comments: comments.filter(c => c.answer_id === answer.id).map(comment => {
            return {
              ...comment,
              user: users.find(u => u.id === comment.user_id)
            };
          })
        };
      });
        const questionWithRelations = {
        ...updatedQuestion,
        user: users.find(u => u.id === updatedQuestion.user_id),
        tags: tags.filter(t => question_tags.some(qt => qt.question_id === id && qt.tag_id === t.id))
          .map(t => {
            // Calculate the count for each tag
            const count = question_tags.filter(qt => qt.tag_id === t.id).length;
            return { ...t, count };
          }),
        answers: questionAnswers
      };
      
      res.send({
        success: true,
        data: questionWithRelations,
      });
    } else {
      console.log("Question not found with ID:", id); // Log để debug
      res.status(404).send({
        success: false,
        message: 'Không tìm thấy câu hỏi',
      });
    }
  },
  
  // API tạo câu hỏi mới
  'POST /api/questions': (req: any, res: any) => {
    const { title, content, tags: tagNames } = req.body;
    const token = req.headers.authorization?.split(' ')[1];
    
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
    
    const user = users.find(u => u.id === userId);
    if (!user) {
      return res.status(401).send({
        success: false,
        message: 'Người dùng không hợp lệ',
      });
    }
    
    // Tạo câu hỏi mới
    const now = new Date().toISOString();
    const newQuestion: Question = {
      id: nextQuestionId++,
      user_id: userId,
      title,
      content,
      created_at: now,
      updated_at: now,
      views: 0,
      upvotes: 0,
      downvotes: 0,
      answer_count: 0,
      user: user
    };
    
    questions.push(newQuestion);
      // Xử lý tags
    const questionTags: Tag[] = [];
    if (tagNames && tagNames.length > 0) {      tagNames.forEach((tagName: string) => {
        // Tìm tag đã tồn tại hoặc tạo mới
        let tag = tags.find(t => t.name === tagName);
        let tagToUse: Tag;
        
        if (!tag) {
          tagToUse = {
            id: tags.length + 1,
            name: tagName,
            count: 1
          };
          tags.push(tagToUse);
        } else {
          // Cập nhật count nếu tag đã tồn tại
          const tagCount = question_tags.filter(qt => qt.tag_id === tag.id).length + 1;
          tagToUse = { ...tag, count: tagCount };
          // Update the tag in the tags array
          const tagIndex = tags.findIndex(t => t.id === tag.id);
          if (tagIndex !== -1) {
            tags[tagIndex] = tagToUse;
          }
        }
        
        // Thêm liên kết question_tag
        question_tags.push({
          question_id: newQuestion.id,
          tag_id: tagToUse.id
        });
        
        questionTags.push(tagToUse);
      });
    }
    
    const responseQuestion = {
      ...newQuestion,
      tags: questionTags
    };
    
    res.send({
      success: true,
      data: responseQuestion,
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
    
    const userId = parseInt(token.replace('mock-token-', ''), 10);
    const question = questions.find(q => q.id === id);
    
    if (!question) {
      return res.status(404).send({
        success: false,
        message: 'Không tìm thấy câu hỏi',
      });
    }
    
    // Kiểm tra xem người dùng đã bình chọn câu hỏi này chưa
    const existingVote = votes.find(v => v.user_id === userId && v.question_id === id);
    
    // Cập nhật số lượt bình chọn
    if (existingVote) {
      // Nếu đã vote rồi, và vote type giống nhau thì xóa vote
      if ((direction === 'up' && existingVote.vote_type === 1) || 
          (direction === 'down' && existingVote.vote_type === -1)) {
            
        // Xóa vote khỏi danh sách
        const voteIndex = votes.findIndex(v => v.id === existingVote.id);
        votes.splice(voteIndex, 1);
        
        // Cập nhật lại số upvote/downvote
        if (direction === 'up') {
          question.upvotes -= 1;
        } else {
          question.downvotes -= 1;
        }
      } else {
        // Nếu đổi hướng vote
        existingVote.vote_type = direction === 'up' ? 1 : -1;
        
        if (direction === 'up') {
          question.upvotes += 1;
          question.downvotes -= 1;
        } else {
          question.upvotes -= 1;
          question.downvotes += 1;
        }
      }
    } else {
      // Thêm vote mới
      const newVote: Vote = {
        id: nextVoteId++,
        user_id: userId,
        vote_type: direction === 'up' ? 1 : -1,
        question_id: id
      };
      
      votes.push(newVote);
      
      // Cập nhật số vote
      if (direction === 'up') {
        question.upvotes += 1;
      } else {
        question.downvotes += 1;
      }
    }
    
    const index = questions.findIndex(q => q.id === id);
    questions[index] = question;
    
    const responseQuestion = {
      ...question,
      user: users.find(u => u.id === question.user_id),
      tags: tags.filter(t => question_tags.some(qt => qt.question_id === id && qt.tag_id === t.id))
    };
    
    res.send({
      success: true,
      data: responseQuestion,
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
    const user = users.find(u => u.id === userId);
    
    if (!question || !user) {
      return res.status(404).send({
        success: false,
        message: 'Không tìm thấy câu hỏi hoặc người dùng',
      });
    }
    
    // Tạo câu trả lời mới
    const now = new Date().toISOString();
    const newAnswer: Answer = {
      id: nextAnswerId++,
      question_id: questionId,
      user_id: userId,
      content,
      created_at: now,
      updated_at: now,
      upvotes: 0,
      downvotes: 0,
      is_accepted: false,
      comment_count: 0,
      user: user,
      comments: []
    };
    
    answers.push(newAnswer);
    
    // Cập nhật số lượng câu trả lời của câu hỏi
    const questionIndex = questions.findIndex(q => q.id === questionId);
    questions[questionIndex].answer_count = (questions[questionIndex].answer_count || 0) + 1;
    
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
    
    const userId = parseInt(token.replace('mock-token-', ''), 10);
    const answer = answers.find(a => a.id === answerId && a.question_id === questionId);
    
    if (!answer) {
      return res.status(404).send({
        success: false,
        message: 'Không tìm thấy câu trả lời',
      });
    }
    
    // Kiểm tra xem người dùng đã bình chọn câu trả lời này chưa
    const existingVote = votes.find(v => v.user_id === userId && v.answer_id === answerId);
    
    // Cập nhật số lượt bình chọn
    if (existingVote) {
      // Tương tự như xử lý vote cho câu hỏi
      if ((direction === 'up' && existingVote.vote_type === 1) || 
          (direction === 'down' && existingVote.vote_type === -1)) {
        
        const voteIndex = votes.findIndex(v => v.id === existingVote.id);
        votes.splice(voteIndex, 1);
        
        if (direction === 'up') {
          answer.upvotes -= 1;
        } else {
          answer.downvotes -= 1;
        }
      } else {
        existingVote.vote_type = direction === 'up' ? 1 : -1;
        
        if (direction === 'up') {
          answer.upvotes += 1;
          answer.downvotes -= 1;
        } else {
          answer.upvotes -= 1;
          answer.downvotes += 1;
        }
      }
    } else {
      // Thêm vote mới
      const newVote: Vote = {
        id: nextVoteId++,
        user_id: userId,
        vote_type: direction === 'up' ? 1 : -1,
        answer_id: answerId
      };
      
      votes.push(newVote);
      
      if (direction === 'up') {
        answer.upvotes += 1;
      } else {
        answer.downvotes += 1;
      }
    }
    
    const answerIndex = answers.findIndex(a => a.id === answerId);
    answers[answerIndex] = answer;
    
    const responseAnswer = {
      ...answer,
      user: users.find(u => u.id === answer.user_id),
      comments: comments.filter(c => c.answer_id === answer.id).map(comment => ({
        ...comment,
        user: users.find(u => u.id === comment.user_id)
      }))
    };
    
    res.send({
      success: true,
      data: responseAnswer,
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
    
    if (!question) {
      return res.status(404).send({
        success: false,
        message: 'Không tìm thấy câu hỏi',
      });
    }
    
    // Kiểm tra xem người dùng có phải là người đặt câu hỏi không
    if (question.user_id !== userId) {
      return res.status(403).send({
        success: false,
        message: 'Chỉ người đặt câu hỏi mới có thể chấp nhận câu trả lời',
      });
    }
    
    const answer = answers.find(a => a.id === answerId && a.question_id === questionId);
    
    if (!answer) {
      return res.status(404).send({
        success: false,
        message: 'Không tìm thấy câu trả lời',
      });
    }
    
    // Reset tất cả các câu trả lời của câu hỏi này về false
    answers.forEach(a => {
      if (a.question_id === questionId) {
        a.is_accepted = false;
      }
    });
    
    // Đánh dấu câu trả lời được chọn là true
    const answerIndex = answers.findIndex(a => a.id === answerId);
    answers[answerIndex].is_accepted = true;
    
    const responseAnswer = {
      ...answers[answerIndex],
      user: users.find(u => u.id === answers[answerIndex].user_id),
      comments: comments.filter(c => c.answer_id === answerId).map(comment => ({
        ...comment,
        user: users.find(u => u.id === comment.user_id)
      }))
    };
    
    res.send({
      success: true,
      data: responseAnswer,
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
    
    const answer = answers.find(a => a.id === answerId && a.question_id === questionId);
    const user = users.find(u => u.id === userId);
    
    if (!answer || !user) {
      return res.status(404).send({
        success: false,
        message: 'Không tìm thấy câu trả lời hoặc người dùng',
      });
    }
    
    // Tạo bình luận mới
    const now = new Date().toISOString();
    const newComment: Comment = {
      id: nextCommentId++,
      user_id: userId,
      content,
      created_at: now,
      answer_id: answerId,
      user: user
    };
    
    comments.push(newComment);
    
    // Cập nhật số lượng bình luận của câu trả lời
    const answerIndex = answers.findIndex(a => a.id === answerId);
    answers[answerIndex].comment_count = (answers[answerIndex].comment_count || 0) + 1;
    
    res.send({
      success: true,
      data: newComment,
    });
  },
  
  // API tìm kiếm câu hỏi
  'GET /api/questions/search': (req: any, res: any) => {
    const { query = {} } = parse(req.url || '', true);
    const { keyword, tag } = query;
      let result = [...questions].map(question => {
      return {
        ...question,
        user: users.find(u => u.id === question.user_id),
        tags: tags.filter(t => question_tags.some(qt => qt.question_id === question.id && qt.tag_id === t.id))
          .map(t => {
            // Calculate the count for each tag
            const count = question_tags.filter(qt => qt.tag_id === t.id).length;
            return { ...t, count };
          })
      };
    });
    
    if (keyword) {
      const searchKeyword = (keyword as string).toLowerCase();
      result = result.filter(q => 
        q.title.toLowerCase().includes(searchKeyword) || 
        q.content.toLowerCase().includes(searchKeyword)
      );
    }
    
    if (tag) {
      result = result.filter(q => 
        q.tags?.some(t => t.name.toLowerCase() === (tag as string).toLowerCase())
      );
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