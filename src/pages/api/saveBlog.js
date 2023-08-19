import fs from "fs";
import path from "path";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).end();
    }

    const filePath = path.join(process.cwd(), "src", "data", "blogs.json");

    try {
        const { title, content } = req.body;
        const blogsData = JSON.parse(fs.readFileSync(filePath));
        const blog = { title, content };
        blogsData.push(blog);
        await fs.promises.writeFile(filePath, JSON.stringify(blogsData, null, 2));
        res.status(201).json({ message: "Blog published successfully" });
    } catch (error) {
        console.error("Error saving blog:", error);
        res.status(500).json({ error: "Failed to publish blog" });
    }
}