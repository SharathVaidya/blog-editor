import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get("/api/blogs").then((res) => setBlogs(res.data));
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>All Blogs</h1>
      {blogs.length === 0 && <p>No blogs found.</p>}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {blogs.map((blog) => (
          <li key={blog._id} style={{ marginBottom: 20, borderBottom: "1px solid #ccc", paddingBottom: 10 }}>
            <Link href={`/blogs/${blog._id}`}>
              <a style={{ fontSize: 20, color: "#0ea5e9", cursor: "pointer" }}>{blog.title}</a>
            </Link>
            <p style={{ color: blog.status === "published" ? "green" : "orange" }}>
              Status: {blog.status}
            </p>
            <p>{blog.content.replace(/<[^>]*>?/gm, '').slice(0, 150)}...</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
