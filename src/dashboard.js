import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";


export default function Dashboard() {
  const {data: session} = useSession();
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [allblogs, setAllBlogs] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/getBlogs");
      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const fetchallBlogs = async () => {
    try {
      const response = await fetch("/api/getAllBlogs");
      if (response.ok) {
        const data = await response.json();
        setAllBlogs(data);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };


  useEffect(() => {
    fetchBlogs();
  }, []);
  useEffect(() => {
    fetchallBlogs();
  }, []);



  const publishBlog = async () => {
    if (!blogTitle || !blogContent) {
      console.error("Blog title and content are required.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/saveBlog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: blogTitle, content: blogContent }),
      });

      if (response.ok) {
        setBlogTitle("");
        setBlogContent("");
        fetchBlogs(); 
      } else {
        console.error("Failed to publish blog");
      }
    } catch (error) {
      console.error("Error publishing blog:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section>
      {!session ? (
        
        <ul className="bg-red">
        {allblogs.map((allBlog, index) => (
          <li key={index} className="my-4 p-4 w-[90%] ml-[60px] bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-bold">{allBlog.title}</h3>
            <p className="mt-2">{allBlog.content}</p>
            </li>
           
          
        ))}
      </ul>
      ) : ( <div>
      <div className="container mx-auto my-12 max-w-screen-xl shadow-2xl p-4 shadow-black/[0.2] bg-gray-100 rounded">
        <h1 className="text-2xl font-bold">DASHBOARD</h1>
        <div className="py-12">
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Blog Title
            </label>
            <input
              value={blogTitle}
              onChange={(e) => setBlogTitle(e.target.value)}
              type="text"
              id="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-0 block w-full p-2.5"
              placeholder="Enter Blog Title"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="content"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Blog Description
            </label>
            <textarea
              value={blogContent}
              onChange={(e) => setBlogContent(e.target.value)}
              type="text"
              id="content"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-0 block w-full p-2.5"
              placeholder="What's on your mind."
            />
          </div>
          <button
            onClick={publishBlog}
            type="button"
            className={`block mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Publishing..." : "Publish Blog"}
          </button>
        </div>
        <h2 className="text-2xl font-bold">My Blogs</h2>
        <ul className="bg-red">
          {blogs.map((blog, index) => (
            <li key={index} className="my-4 p-4 bg-white shadow-md rounded-lg">
              <h3 className="text-xl font-bold">{blog.title}</h3>
              <p className="mt-2">{blog.content}</p>
              </li>
             
            
          ))}
        </ul>
       
      </div>
      </div>)}
     
    </section>
  );
}
