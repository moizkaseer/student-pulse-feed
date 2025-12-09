# SeeuConnect

A modern campus event and opportunity discovery platform built with React and TypeScript. SeeuConnect helps students discover, share, and engage with campus events, opportunities, and announcements in one centralized location.

![SeeuConnect](https://img.shields.io/badge/React-18.3.1-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue) ![Vite](https://img.shields.io/badge/Vite-5.4.1-purple) ![Express](https://img.shields.io/badge/Express-5.1.0-green)

## ✨ Features

- 🎯 **Event Discovery** - Browse events, opportunities, and announcements in a beautiful card-based grid layout
- 🔍 **Smart Search** - Full-text search across titles, descriptions, and tags
- 🏷️ **Category Filtering** - Filter content by Events, Opportunities, or Announcements
- 📝 **Event Submission** - Easy-to-use form for submitting new campus events
- 👍 **Voting System** - Vote on events to show interest and help surface popular content
- 📧 **Email Subscription** - Subscribe to weekly digest emails for campus updates
- 📱 **Responsive Design** - Fully responsive design that works on desktop, tablet, and mobile
- 🎨 **Modern UI** - Beautiful, intuitive interface built with shadcn/ui components
- 🌙 **Dark Mode Ready** - Theme switching support (via next-themes)

## 🚀 Tech Stack

### Frontend
- **React 18.3.1** - UI library
- **TypeScript 5.5.3** - Type safety
- **Vite 5.4.1** - Build tool and dev server
- **Tailwind CSS 3.4.11** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **React Router DOM 6.26.2** - Client-side routing
- **Axios 1.9.0** - HTTP client
- **Sonner** - Toast notifications
- **Lucide React** - Icon library

### Backend
- **Express.js 5.1.0** - Web framework
- **JSON Server 1.0.0** - REST API mock server
- **Nodemailer 6.10.1** - Email service
- **Node.js** - Runtime environment

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn** or **bun** package manager
- **Git** (for cloning the repository)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd student-pulse-feed
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   # or
   yarn install
   # or
   bun install
   ```

## 🎮 Usage

### Development Mode

1. **Start the JSON Server** (Terminal 1)
   ```bash
   cd backend
   npm start
   ```
   This will start JSON Server on `http://localhost:3001`

2. **Start the Express Server** (Terminal 2 - Optional, for email functionality)
   ```bash
   cd backend
   npm run dev
   ```
   This will start Express server on `http://localhost:3000`

3. **Start the Frontend Dev Server** (Terminal 3)
   ```bash
   npm run dev
   ```
   This will start Vite dev server (usually on `http://localhost:5173`)

4. **Open your browser**
   Navigate to the URL shown in the terminal (typically `http://localhost:5173`)

### Production Build

1. **Build the frontend**
   ```bash
   npm run build
   ```

2. **Preview the production build**
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
student-pulse-feed/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── EventCard.tsx   # Event card component
│   │   ├── EventDetailsModal.tsx
│   │   ├── FilterTabs.tsx
│   │   ├── Header.tsx
│   │   └── SubmitModal.tsx
│   ├── pages/              # Page components
│   │   └── Index.tsx       # Main page
│   ├── hooks/              # Custom React hooks
│   └── ...
├── backend/
│   ├── src/
│   │   └── index.js        # Express server
│   └── db.json             # JSON Server database
├── public/                 # Static assets
├── package.json
└── README.md
```

## 🔌 API Endpoints

### JSON Server (Port 3001)
- `GET /userSubmits` - Get all event submissions
- `POST /userSubmits` - Create a new submission
- `DELETE /userSubmits/:id` - Delete a submission
- `GET /users` - Get all subscribed users
- `POST /users` - Subscribe a new user

### Express Server (Port 3000)
- `GET /` - Health check
- `GET /users` - Get all user emails
- `POST /sendEmails` - Send weekly digest to subscribers

## 🎨 Key Components

### EventCard
Displays event information in a card format with voting functionality and hover previews.

### SubmitModal
Modal form for submitting new events, opportunities, or announcements.

### FilterTabs
Toggle group for filtering content by category (All, Events, Opportunities, Announcements).

### EventDetailsModal
Detailed view of an event with full information and delete functionality.

## 🔧 Configuration

### Email Service Setup

To enable email functionality, configure your email credentials in `backend/src/index.js`:

```javascript
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "your-email@gmail.com",
        pass: "your-app-password", // Use app-specific password
    },
});
```

**Note**: For Gmail, you'll need to generate an app-specific password.

## 🧪 Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend
- `npm start` - Start JSON Server
- `npm run dev` - Start Express server with nodemon

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👤 Author

[Your Name]

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com) for the amazing component library
- [Radix UI](https://www.radix-ui.com) for accessible component primitives
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework
- [Lucide](https://lucide.dev) for beautiful icons

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

Made with ❤️ for the campus community
