
# Blog Editor Application

A modern **full-stack blog management application** featuring:

* **Rich blog creation and editing** with draft & publish workflows
* **User-friendly UI** built with Next.js and Tailwind CSS
* **Backend REST API** using Express.js & MongoDB with Mongoose ORM
* Real-time **toast notifications** for better UX (`react-hot-toast`)
* Support for **editing**, **deleting**, and **viewing** published blogs

---

## Features

* **Create blog drafts** and auto-save functionality
* **Publish blogs** with status management
* **Edit existing blogs** with pre-filled data in the editor
* **Delete blogs** from the detail view
* **View list of published blogs**
* Responsive design optimized for desktop and mobile
* Clean and accessible UI with Tailwind CSS
* RESTful API with secure environment config

---

## Technology Stack

| Layer         | Technology                           |
| ------------- | ------------------------------------ |
| Frontend      | Next.js 13 (React 18+), Tailwind CSS |
| Backend       | Node.js, Express.js                  |
| Database      | MongoDB Atlas or local MongoDB       |
| ORM           | Mongoose                             |
| Notifications | react-hot-toast                      |
| Environment   | dotenv                               |

---

## Project Structure

```plaintext
blog-backend/
├── models/           # Mongoose schema and models
│   └── Blog.js
├── routes/           # Express route handlers
│   └── blogRoutes.js
├── server.js         # Entry point for backend server
├── .env              # Environment variables for sensitive info
└── package.json      # Backend dependencies

blog-frontend/
├── src/
│   └── app/
│       ├── page.js               # Blog Editor UI
│       ├── blogs/
│       │   ├── page.js           # Blog listing page
│       │   └── [id]/page.js     # Blog detail & edit page
│       └── layout.js             # Global layout & toast notifications
├── package.json                # Frontend dependencies
├── tailwind.config.js          # Tailwind CSS config
└── postcss.config.js           # PostCSS config
```

---

## Getting Started

### Prerequisites

* Node.js v16 or higher
* MongoDB Atlas account or locally running MongoDB
* npm or yarn package manager

---

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd blog-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file at the root with:

   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. Start the backend server:

   ```bash
   node server.js
   ```

5. API endpoints will be available at `http://localhost:5000/api/blogs`

---

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd blog-frontend
   ```

2. Install dependencies (**use `--legacy-peer-deps` if you encounter peer dependency conflicts**):

   ```bash
   npm install --legacy-peer-deps
   ```

3. Run the frontend development server:

   ```bash
   npm run dev
   ```

4. Open your browser at `http://localhost:3000` to access the blog editor

---

## Usage Guide

* **Create and Edit Blogs**
  Use the home page `/` for creating new blogs or editing existing ones by passing query parameters.

* **Saving Drafts**
  Drafts auto-save every few seconds or manually via the “Save Draft” button.

* **Publishing Blogs**
  Publish your blog posts with the “Publish” button; published posts become visible on the blogs listing.

* **Browsing Blogs**
  Visit `/blogs` to see all published blogs and click on any to view full content.

* **Managing Blogs**
  On blog detail pages, use the **Edit** and **Delete** buttons to modify or remove posts.

---

## Additional Notes

* **React-Quill Usage:**
  If you want rich text editing, install `react-quill` and add it to the editor page. Be aware of React version compatibility.

* **Toast Notifications:**
  Toasts provide user feedback on actions like saving or publishing. Ensure `react-hot-toast` is installed and `<Toaster />` is placed in your layout.

* **Environment Variables:**
  Keep sensitive data like DB connection strings in `.env` files and never commit them to version control.

* **Styling:**
  Tailwind CSS powers the UI for fast and responsive design, fully customizable via `tailwind.config.js`.

---

## Troubleshooting

* **MongoDB connection errors:**
  Verify your `MONGODB_URI` is correct and `.env` is properly configured.

* **Peer dependency warnings:**
  Use `npm install --legacy-peer-deps` to bypass incompatible package peer dependencies during install.

* **Frontend blank page or errors:**
  Check the browser console and ensure all required packages are installed and imported correctly.

---

## Contributing

Contributions and bug reports are welcome! Feel free to fork the repo and submit pull requests.

---

## License

This project is licensed under the MIT License.

---

