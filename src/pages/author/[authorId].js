import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function AuthorBlogs() {
  const router = useRouter();
  const author = router.query.authorId;
  const [blogsByAuthor, setBlogsByAuthor] = useState([]);

  useEffect(() => {
    if (author) {
      fetch(`/api/getBlogsByUser?author=${author}`)
        .then((response) => response.json())
        .then((data) => {
          setBlogsByAuthor(data);
        })
        .catch((error) => {
          console.error("Error fetching blogs by author:", error);
        });
    }
  }, [author]);

  return (
    <div className="max-w-screen-xl mx-auto py-12">
      <h2 className="text-2xl font-bold">{author} Blogs</h2>
      <ul>
        {blogsByAuthor.map((blog, index) => (
          <li
            key={index}
            className="my-4 p-4 bg-white shadow-md rounded-lg"
          >
            <h3 className="text-xl font-bold">{blog.title}</h3>
            <p className="mt-2">{blog.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
