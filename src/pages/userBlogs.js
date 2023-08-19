import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function UserBlogs() {
  const router = useRouter();
  const { user } = router.query;
  const [blogsByUser, setBlogsByUser] = useState([]);

  useEffect(() => {
    const fetchBlogsByUser = async () => {
      if (user) {
        try {
          const response = await fetch(`/src/data/blog.json=${user}`);
          if (response.ok) {
            const data = await response.json();
            setBlogsByUser(data);
          } else {
            console.error("Failed to fetch blogs by user");
          }
        } catch (error) {
          console.error("Error fetching blogs by user:", error);
        }
      }
    };

    fetchBlogsByUser();
  }, [user]);

  return (
    <div>
      <h2 className="text-2xl font-bold">{user}'s Blogs</h2>
      <ul>
        {blogsByUser.map((blog, index) => (
          <li key={index}>
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
