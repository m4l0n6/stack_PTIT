import request from "umi-request";

request.get("/questions", {
  params: {
    page: 1,
    pageSize: 10,
    sort: "created_at",
    filter: "all",
  },
}).then((response) => {
  console.log("Questions:", response);
}).catch((error) => {
  console.error("Error fetching questions:", error);
});