import path from "path";
import fs from "fs";

export default function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).end();
    }

    const filePath = path.join(process.cwd(), "src", "data", "allBlogs.json");

    try {
        const blogsData = JSON.parse(fs.readFileSync(filePath));
        res.status(200).json(blogsData);
    } catch (error) {
        console.error("Error fetching blogs:", error);
        res.status(500).json({ error: "Failed to fetch blogs" });
    }
}

