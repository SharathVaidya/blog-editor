// // "use client";
// // import { useState, useEffect } from "react";

// // export default function BlogEditor() {
// //   const [title, setTitle] = useState("");
// //   const [content, setContent] = useState("");
// //   const [tags, setTags] = useState("");
// //   const [autoSaved, setAutoSaved] = useState(false);
// //   let timeoutId = null;

// //   // Auto-save after 5 seconds of no typing
// //   useEffect(() => {
// //     setAutoSaved(false);
// //     if (timeoutId) clearTimeout(timeoutId);
// //     timeoutId = setTimeout(() => {
// //       if (title || content || tags) {
// //         console.log("Auto-saving draft...");
// //         setAutoSaved(true);
// //       }
// //     }, 5000);
// //     return () => clearTimeout(timeoutId);
// //   }, [title, content, tags]);

// //   const saveDraft = () => {
// //     alert("Draft saved!");
// //   };

// //   const publish = () => {
// //     alert("Blog published!");
// //   };

// //   return (
// //     <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "Arial, sans-serif" }}>
// //       <h1 style={{ textAlign: "center" }}>Blog Editor</h1>
// //       <input
// //         type="text"
// //         placeholder="Enter blog title..."
// //         value={title}
// //         onChange={(e) => setTitle(e.target.value)}
// //         style={{ width: "100%", padding: "8px", marginBottom: "12px", fontSize: "16px" }}
// //       />
// //       <textarea
// //         placeholder="Write your content here..."
// //         value={content}
// //         onChange={(e) => setContent(e.target.value)}
// //         rows={8}
// //         style={{ width: "100%", padding: "8px", marginBottom: "12px", fontSize: "16px" }}
// //       />
// //       <input
// //         type="text"
// //         placeholder="Tags (comma-separated)"
// //         value={tags}
// //         onChange={(e) => setTags(e.target.value)}
// //         style={{ width: "100%", padding: "8px", marginBottom: "20px", fontSize: "16px" }}
// //       />
// //       <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
// //         <button onClick={saveDraft} style={{ padding: "10px 20px", fontSize: "16px" }}>
// //           Save Draft
// //         </button>
// //         <button
// //           onClick={publish}
// //           style={{
// //             padding: "10px 20px",
// //             backgroundColor: "#0ea5e9",
// //             color: "white",
// //             border: "none",
// //             fontSize: "16px",
// //             cursor: "pointer",
// //           }}
// //         >
// //           Publish
// //         </button>
// //       </div>
// //       {autoSaved && (
// //         <p style={{ color: "green", marginTop: "15px", fontStyle: "italic" }}>
// //           Draft auto-saved!
// //         </p>
// //       )}
// //     </div>
// //   );
// // }

// "use client";

// import dynamic from "next/dynamic";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import "react-quill/dist/quill.snow.css";

// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// export default function BlogEditor() {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [tags, setTags] = useState("");
//   const [typingTimeout, setTypingTimeout] = useState(null);

//   const autoSaveDraft = async () => {
//     try {
//       await axios.post("/api/blogs/save-draft", {
//         title,
//         content,
//         tags: tags.split(",").map((t) => t.trim()),
//       });
//       toast.success("Draft auto-saved");
//     } catch {
//       toast.error("Auto-save failed");
//     }
//   };

//   useEffect(() => {
//     if (typingTimeout) clearTimeout(typingTimeout);
//     const timeout = setTimeout(() => {
//       if (title || content || tags) autoSaveDraft();
//     }, 5000);
//     setTypingTimeout(timeout);
//     return () => clearTimeout(timeout);
//   }, [title, content, tags]);

//   const handleSaveDraft = () => autoSaveDraft();

//   const handlePublish = async () => {
//     try {
//       await axios.post("/api/blogs/publish", {
//         title,
//         content,
//         tags: tags.split(",").map((t) => t.trim()),
//       });
//       toast.success("Blog published");
//     } catch {
//       toast.error("Publishing failed");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white py-10 px-6">
//       <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
//         <h1 className="text-3xl font-bold mb-6 text-sky-700 text-center">Blog Editor</h1>
//         <input
//           type="text"
//           placeholder="Enter blog title..."
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-sky-300"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <ReactQuill value={content} onChange={setContent} className="mb-4 bg-white" />
//         <input
//           type="text"
//           placeholder="Tags (comma-separated)"
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-sky-300"
//           value={tags}
//           onChange={(e) => setTags(e.target.value)}
//         />
//         <div className="flex justify-end gap-4">
//           <button
//             onClick={handleSaveDraft}
//             className="px-5 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition"
//           >
//             Save Draft
//           </button>
//           <button
//             onClick={handlePublish}
//             className="px-5 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition"
//           >
//             Publish
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function BlogEditor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);

  const autoSaveDraft = async () => {
    try {
      await axios.post("/api/blogs/save-draft", {
        title,
        content,
        tags: tags.split(",").map((t) => t.trim()),
      });
      toast.success("Draft auto-saved");
    } catch {
      toast.error("Auto-save failed");
    }
  };

  useEffect(() => {
    if (typingTimeout) clearTimeout(typingTimeout);
    const timeout = setTimeout(() => {
      if (title || content || tags) autoSaveDraft();
    }, 5000);
    setTypingTimeout(timeout);
    return () => clearTimeout(timeout);
  }, [title, content, tags]);

  const handleSaveDraft = () => autoSaveDraft();

  const handlePublish = async () => {
    try {
      await axios.post("/api/blogs/publish", {
        title,
        content,
        tags: tags.split(",").map((t) => t.trim()),
      });
      toast.success("Blog published");
    } catch {
      toast.error("Publishing failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-sky-700 text-center">Blog Editor</h1>

        <input
          type="text"
          placeholder="Enter blog title..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your blog here..."
          rows={10}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
        />

        <input
          type="text"
          placeholder="Tags (comma-separated)"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-6"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <div className="flex justify-end gap-4">
          <button
            onClick={handleSaveDraft}
            className="px-5 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500"
          >
            Save Draft
          </button>
          <button
            onClick={handlePublish}
            className="px-5 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}


// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useSearchParams, useRouter } from "next/navigation";

// export default function BlogEditor() {
//   const [blogId, setBlogId] = useState(null);
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [tags, setTags] = useState("");
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   // Detect ?edit=<id>
//   useEffect(() => {
//     const id = searchParams.get("edit");
//     if (id) {
//       setBlogId(id);
//       axios.get(`/api/blogs/${id}`).then((res) => {
//         const blog = res.data;
//         setTitle(blog.title);
//         setContent(blog.content);
//         setTags(blog.tags.join(", "));
//       });
//     }
//   }, []);

//   const handleSaveDraft = async () => {
//     try {
//       const payload = {
//         title,
//         content,
//         tags: tags.split(",").map((t) => t.trim()),
//       };
//       if (blogId) {
//         // update
//         await axios.put(`/api/blogs/${blogId}`, payload);
//         alert("Draft updated!");
//       } else {
//         // create new
//         await axios.post("/api/blogs/save-draft", payload);
//         alert("Draft saved!");
//       }
//       router.push("/blogs");
//     } catch {
//       alert("Failed to save blog");
//     }
//   };


//   const handlePublish = async () => {
//     try {
//       const payload = {
//         title,
//         content,
//         tags: tags.split(",").map((t) => t.trim()),
//       };
//       if (blogId) {
//         await axios.put(`/api/blogs/${blogId}`, {
//           ...payload,
//           status: "published",
//         });
//         alert("Blog updated & published!");
//       } else {
//         await axios.post("/api/blogs/publish", payload);
//         alert("Blog published!");
//       }
//       router.push("/blogs");
//     } catch {
//       alert("Failed to publish blog");
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-4">
//         {blogId ? "Edit Blog" : "New Blog"}
//       </h1>
//       <input
//         type="text"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="Title"
//         className="w-full border p-2 mb-4"
//       />
//       <textarea
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//         placeholder="Content"
//         rows={10}
//         className="w-full border p-2 mb-4"
//       />
//       <input
//         type="text"
//         value={tags}
//         onChange={(e) => setTags(e.target.value)}
//         placeholder="Tags (comma separated)"
//         className="w-full border p-2 mb-4"
//       />
//       <div className="flex gap-4">
//         <button
//           onClick={handleSaveDraft}
//           className="px-4 py-2 bg-yellow-500 text-white rounded"
//         >
//           {blogId ? "Update Draft" : "Save Draft"}
//         </button>
//         <button
//           onClick={handlePublish}
//           className="px-4 py-2 bg-blue-600 text-white rounded"
//         >
//           {blogId ? "Update & Publish" : "Publish"}
//         </button>
//       </div>
//     </div>
//   );
// }
