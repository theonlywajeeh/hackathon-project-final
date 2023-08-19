import path from "path";
import fs from "fs";

export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const { author } = req.query;
  const filePath = path.join(process.cwd(), "src", "data", "allBlogs.json");

  try {
    const blogsData = JSON.parse(fs.readFileSync(filePath));
    const blogsByAuthor = blogsData.filter((blog) => blog.name === author);
    res.status(200).json(blogsByAuthor);
  } catch (error) {
    console.error("Error fetching blogs by author:", error);
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
}