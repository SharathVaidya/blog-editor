"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get("/api/blogs").then((res) => setBlogs(res.data));
  }, []);

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Published Blogs</h1>
        {blogs.length === 0 && <p>No blogs found.</p>}

        <div className="grid gap-4">
          {blogs
            .filter((blog) => blog.status === "published")
            .map((blog) => (
              <Link
                key={blog._id}
                href={`/blogs/${blog._id}`}
                className="block bg-white p-4 rounded-lg shadow hover:bg-gray-100 cursor-pointer"
              >
                <h2 className="text-xl font-semibold text-sky-700">{blog.title}</h2>
                <p className="text-sm text-gray-600">Tags: {blog.tags.join(", ")}</p>
                <p className="mt-2 text-gray-800">
                  {blog.content?.replace(/<[^>]*>/g, "").slice(0, 100)}...
                </p>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
