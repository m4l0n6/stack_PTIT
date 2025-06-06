import { Question } from '@/services/Questions/typing';
import { Answer } from '@/services/Answers/typing';
import { Comment } from '@/services/Comments/typing';

import { tags, question_tags } from './tags';
import { Vote } from '@/services/Votes/typing';
import { parse } from 'url';

import {users} from "./users";
import answers from './answers';
import comments from './comments';
import votes from './votes';

// Dữ liệu mẫu cho questions
const questions: Question[] = [
  {
    id: 1,
    user_id: 4,
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

// Biến đếm cho ID mới
let nextQuestionId = questions.length + 1;
let nextAnswerId = answers.length + 1;
let nextCommentId = comments.length + 1;
let nextVoteId = votes.length + 1;

export default {
  // API lấy câu hỏi theo tag (đặt trước search để tránh conflict)
  'GET /api/questions/tagged': (req: any, res: any) => {
    const { query = {} } = parse(req.url || '', true);
    const { tag, sort, filter, page = '1', pageSize = '10' } = query;
    
    if (!tag) {
      return res.status(400).send({
        success: false,
        message: 'Tên tag là bắt buộc',
      });
    }
    
    // Tìm tag theo tên
    const targetTag = tags.find(t => t.name.toLowerCase() === (tag as string).toLowerCase());
    
    if (!targetTag) {
      return res.send({
        success: true,
        data: {
          questions: [],
          total: 0,
          page: 1,
          pageSize: 10,
        },
      });
    }
    
    // Lấy tất cả question_id có tag này
    const questionIds = question_tags
      .filter(qt => qt.tag_id === targetTag.id)
      .map(qt => qt.question_id);
    
    // Lấy các câu hỏi tương ứng
    let result = questions
      .filter(q => questionIds.includes(q.id))
      .map(question => {
        return {
          ...question,
          user: users.find(u => u.id === question.user_id),
          tags: tags.filter(t => question_tags.some(qt => qt.question_id === question.id && qt.tag_id === t.id))
            .map(t => {
              const count = question_tags.filter(qt => qt.tag_id === t.id).length;
              return { ...t, count };
            })
        };
      });
    
    // Sắp xếp câu hỏi
    if (sort === 'newest') {
      result.sort((a, b) => {
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();
        return dateB - dateA;
      });
    } else if (sort === 'popular') {
      result.sort((a, b) => ((b.upvotes - b.downvotes) - (a.upvotes - a.downvotes)));
    } else if (sort === 'votes') {
      result.sort((a, b) => (b.upvotes - a.upvotes));
    } else if (sort === 'unanswered') {
      result = result.filter(q => q.answer_count === 0);
    }
    
    // Lọc câu hỏi
    if (filter === 'no answer') {
      result = result.filter(q => q.answer_count === 0);
    } else if (filter === 'answered') {
      result = result.filter(q => (q.answer_count ?? 0) > 0);
    } else if (filter === 'accepted') {
      const acceptedQuestionIds = answers
        .filter(a => a.is_accepted)
        .map(a => a.question_id);
      result = result.filter(q => acceptedQuestionIds.includes(q.id));
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
        questions: paginatedResult,
        total: result.length,
        page: pageNumber,
        pageSize: pageSizeNumber,
      },
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
  },
  
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
    
    // Kiểm tra vai trò - chỉ cho phép student và teacher đặt câu hỏi
    if (user.role === 'admin') {
      return res.status(403).send({
        success: false,
        message: 'Quản trị viên không có quyền đặt câu hỏi',
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
      answer_count: 0
    };
    
    questions.push(newQuestion);
    
    // Xử lý tags
    if (tagNames && Array.isArray(tagNames)) {
      // Xử lý tags...
    }
    
    res.send({
      success: true,
      data: {
        ...newQuestion,
        user,
        tags: tagNames || []
      }
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
    
    // Kiểm tra vai trò - chỉ cho phép student và teacher trả lời
    if (user.role === 'admin') {
      return res.status(403).send({
        success: false,
        message: 'Quản trị viên không có quyền trả lời câu hỏi',
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
    
    // Kiểm tra vai trò - chỉ cho phép student và teacher bình luận
    if (user.role === 'admin') {
      return res.status(403).send({
        success: false,
        message: 'Quản trị viên không có quyền bình luận câu trả lời',
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
      data: {
        ...newComment,
        user
      }
    });
  }
};