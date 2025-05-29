import { Tag } from "@/services/Tags/typing";
import { parse } from 'url';

export const tags: Tag[] = [
  { id: 1, name: "nodejs", description: "Node.js is a JavaScript runtime built on Chrome's V8 engine" },
  { id: 2, name: "javascript", description: "JavaScript is a programming language that conforms to the ECMAScript specification" },
  { id: 3, name: "restapi", description: "REST (REpresentational State Transfer) is an architectural style for designing networked applications" },
  { id: 4, name: "backend", description: "Backend refers to the server-side of web development" },
  { id: 5, name: "react", description: "React is a JavaScript library for building user interfaces" },
  { id: 6, name: "performance", description: "Performance optimization techniques for applications" },
  { id: 7, name: "frontend", description: "Frontend refers to the client-side of web development" },
  { id: 8, name: "umijs", description: "UmiJS is an extensible enterprise-level React application framework" },
  { id: 9, name: "authentication", description: "Authentication is the process of verifying who a user is" },
  { id: 10, name: "typescript", description: "TypeScript is a superset of JavaScript that adds static types" },
  { id: 11, name: "graphql", description: "GraphQL is a query language for APIs and a runtime for executing those queries with your existing data" },
  { id: 12, name: "docker", description: "Docker is a set of platform as a service products that use OS-level virtualization to deliver software in packages called containers" },
  { id: 13, name: "kubernetes", description: "Kubernetes is an open-source system for automating the deployment, scaling, and management of containerized applications" },
  { id: 14, name: "microservices", description: "Microservices is an architectural style that structures an application as a collection of loosely coupled services" },
];

// Bảng liên kết giữa questions và tags
export const question_tags = [
  { question_id: 1, tag_id: 1 }, // nodejs
  { question_id: 1, tag_id: 2 }, // javascript
  { question_id: 1, tag_id: 3 }, // restapi
  { question_id: 1, tag_id: 4 }, // backend
  
  { question_id: 2, tag_id: 5 }, // react
  { question_id: 2, tag_id: 2 }, // javascript
  { question_id: 2, tag_id: 6 }, // performance
  { question_id: 2, tag_id: 7 }, // frontend
  
  { question_id: 3, tag_id: 8 }, // umijs
  { question_id: 3, tag_id: 9 }, // authentication
  { question_id: 3, tag_id: 5 }, // react
  { question_id: 3, tag_id: 10 }, // typescript
];

// Mặc định export API endpoints
export default {
  // API lấy danh sách tags
  'GET /api/tags': (req: any, res: any) => {
    // Tính toán số lượng câu hỏi cho mỗi tag
    const tagsWithCount = tags.map(tag => {
      const count = question_tags.filter(qt => qt.tag_id === tag.id).length;
      return {...tag, count};
    });
    
    res.send({
      success: true,
      data: tagsWithCount,
    });
  },
  
  // API tìm kiếm tags (đặt trước route có param)
  'GET /api/tags/search': (req: any, res: any) => {
    const { query = {} } = parse(req.url || '', true);
    const { keyword } = query;
    
    let result = [...tags];
    
    if (keyword) {
      const searchKeyword = (keyword as string).toLowerCase();
      result = result.filter(t => 
        t.name.toLowerCase().includes(searchKeyword) || 
        (t.description && t.description.toLowerCase().includes(searchKeyword))
      );
    }
    
    // Tính toán số lượng câu hỏi cho các tags được lọc
    const tagsWithCount = result.map(tag => {
      const count = question_tags.filter(qt => qt.tag_id === tag.id).length;
      return {...tag, count};
    });
    
    res.send({
      success: true,
      data: tagsWithCount,
    });
  },
  
  // API lấy chi tiết một tag (đặt sau route cố định)
  'GET /api/tags/:id': (req: any, res: any) => {
    const id = parseInt(req.params.id, 10);
    const tag = tags.find(t => t.id === id);
    
    if (tag) {
      const count = question_tags.filter(qt => qt.tag_id === id).length;
      res.send({
        success: true,
        data: {...tag, count},
      });
    } else {
      res.status(404).send({
        success: false,
        message: 'Không tìm thấy tag',
      });
    }
  },
};