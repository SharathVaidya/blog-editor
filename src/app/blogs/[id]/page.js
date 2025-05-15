"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function BlogDetail({ params }) {
  const { id } = params;
  const router = useRouter();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`/api/blogs/${id}`).then((res) => setBlog(res.data));
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/blogs/${id}`);
      alert("Blog deleted!");
      router.push("/blogs");
    } catch (error) {
      alert("Failed to delete blog");
    }
  };

  const handleEdit = () => {
    router.push(`/?edit=${id}`);
  };

  if (!blog) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen px-6 py-10 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-sky-700">{blog.title}</h1>
      <p className="text-sm text-gray-500 mb-4">Tags: {blog.tags.join(", ")}</p>
      <p className="text-lg text-gray-800 whitespace-pre-line mb-6">{blog.content}</p>

      <div className="flex gap-4">
        <button
          onClick={handleEdit}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
