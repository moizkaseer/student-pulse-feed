# SeeuConnect - Final Project Proposal

## 1. Project Overview

### Project Title
**SeeuConnect** - Campus Event & Opportunity Discovery Platform

### Project Description
SeeuConnect is a modern, user-friendly web application designed to help students discover, share, and engage with campus events, opportunities, and announcements. The platform serves as a centralized hub where students can submit new events, vote on interesting opportunities, and stay informed about campus activities through an intuitive interface.

### Problem Statement
Students often struggle to stay informed about campus events, opportunities, and announcements due to fragmented communication channels. Information is scattered across multiple platforms, making it difficult to discover relevant activities and opportunities. There is a need for a unified platform that allows students to:
- Easily discover campus events and opportunities
- Submit and share new events with the community
- Express interest through voting mechanisms
- Receive timely updates about campus activities

### Solution
SeeuConnect provides a single, centralized platform where students can:
- Browse events, opportunities, and announcements in one place
- Submit new content through an intuitive form
- Filter and search content by category and keywords
- Vote on events to show interest and help surface popular content
- Subscribe to weekly email digests for campus updates

---

## 2. Objectives

### Primary Objectives
1. **Centralized Information Hub**: Create a single platform for all campus-related events, opportunities, and announcements
2. **User Engagement**: Enable students to actively participate by submitting content and voting
3. **Easy Discovery**: Provide robust filtering and search capabilities to help students find relevant content
4. **Community Building**: Foster a sense of community through shared participation and engagement

### Secondary Objectives
1. **Email Notifications**: Implement a subscription system for weekly digest emails
2. **Responsive Design**: Ensure the platform works seamlessly across desktop and mobile devices
3. **Modern UI/UX**: Provide an intuitive, visually appealing interface using modern design principles

---

## 3. Technical Specifications

### Technology Stack

#### Frontend
- **Framework**: React 18.3.1
- **Language**: TypeScript 5.5.3
- **Build Tool**: Vite 5.4.1
- **Styling**: Tailwind CSS 3.4.11
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **HTTP Client**: Axios 1.9.0
- **Routing**: React Router DOM 6.26.2
- **Form Handling**: React Hook Form 7.53.0
- **Notifications**: Sonner (Toast notifications)
- **State Management**: React Hooks (useState, useEffect)

#### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 5.1.0
- **Database**: JSON Server 1.0.0-beta.3 (REST API)
- **Email Service**: Nodemailer 6.10.1
- **Development**: Nodemon for auto-reload

### Architecture
- **Frontend-Backend Separation**: Clear separation between React frontend and Express backend
- **RESTful API**: Backend exposes REST endpoints for CRUD operations
- **JSON-based Storage**: Using JSON Server for rapid prototyping and data persistence
- **CORS Enabled**: Cross-origin resource sharing configured for development

---

## 4. Features & Functionality

### Core Features

#### 1. Event Discovery
- **Grid Layout**: Responsive card-based grid displaying events, opportunities, and announcements
- **Category Filtering**: Filter content by:
  - All items
  - Events
  - Opportunities
  - Announcements
- **Search Functionality**: Full-text search across:
  - Event titles
  - Descriptions
  - Tags

#### 2. Event Submission
- **Submission Modal**: User-friendly form for submitting new content
- **Form Fields**:
  - Title (required)
  - Location
  - Category (Event/Opportunity/Announcement)
  - Date and Time
  - Description
  - Tags (comma-separated)
- **Validation**: Client-side form validation
- **Success Feedback**: Toast notifications for successful submissions

#### 3. Voting System
- **Vote Button**: Upvote functionality on each event card
- **Vote Count Display**: Shows number of interested users
- **Visual Feedback**: Color-coded vote button when user has voted
- **Local State Management**: Vote state managed per card

#### 4. Event Details
- **Detail Modal**: Click on any card to view full event details
- **Information Display**:
  - Full title and description
  - Category badge
  - Date and time
  - Tags
  - Vote count
- **Delete Functionality**: Ability to delete events (with confirmation dialog)

#### 5. Email Subscription
- **Subscribe Button**: Floating action button for easy access
- **Email Collection**: Simple form to collect user email addresses
- **Weekly Digest**: Backend endpoint ready for sending weekly email updates
- **User Management**: Store subscribed users in database

#### 6. User Interface
- **Responsive Design**: Mobile-first approach with breakpoints for:
  - Mobile (< 640px)
  - Tablet (640px - 1024px)
  - Desktop (> 1024px)
- **Dark Mode Support**: Theme switching capability (via next-themes)
- **Modern UI Components**: Using shadcn/ui component library
- **Animations**: Smooth transitions and hover effects
- **Accessibility**: ARIA labels and keyboard navigation support

### Additional Features
- **Hover Cards**: Preview event details on hover
- **Notifications Dropdown**: Placeholder for future notification system
- **Header Navigation**: Sticky header with logo and navigation links

---

## 5. Database Schema

### User Submissions (`userSubmits`)
```json
{
  "id": "string (unique identifier)",
  "title": "string (required)",
  "location": "string",
  "category": "string (Event/Opportunity/Announcement)",
  "date": "string (YYYY-MM-DD)",
  "time": "string (HH:MM)",
  "description": "string (required)",
  "tags": "array of strings or comma-separated string",
  "votes": "number (default: 0)"
}
```

### Users (`users`)
```json
{
  "id": "string (unique identifier)",
  "email": "string (required, unique)"
}
```

---

## 6. API Endpoints

### JSON Server Endpoints (Port 3001)
- `GET /userSubmits` - Retrieve all submissions
- `POST /userSubmits` - Create new submission
- `DELETE /userSubmits/:id` - Delete a submission
- `GET /users` - Retrieve all subscribed users
- `POST /users` - Subscribe a new user

### Express Server Endpoints (Port 3000)
- `GET /` - Health check
- `GET /users` - Get all user emails
- `POST /sendEmails` - Send weekly digest to all subscribers

---

## 7. User Interface Design

### Design Principles
- **Clean & Modern**: Minimalist design with focus on content
- **Campus Theme**: Purple color scheme (`campus-purple`, `campus-lightPurple`)
- **Card-based Layout**: Easy-to-scan card components
- **Visual Hierarchy**: Clear distinction between different content types
- **Consistent Spacing**: Proper use of whitespace and padding

### Color Coding
- **Events**: Purple badge (`bg-purple-500`)
- **Opportunities**: Blue badge (`bg-blue-500`)
- **Announcements**: Amber badge (`bg-amber-500`)

### Component Structure
```
Header (Sticky)
├── Logo & Branding
├── Navigation Links
└── Action Buttons (Submit, Notifications)

Main Content
├── Hero Section (Title & Description)
├── Search Bar
├── Filter Tabs
└── Event Grid
    └── Event Cards
        ├── Category Badge
        ├── Vote Button
        ├── Title & Description
        ├── Date & Location
        └── Tags

Footer
└── Copyright & Subscribe Info

Modals
├── Submit Modal
├── Event Details Modal
└── Subscribe Modal
```

---

## 8. Implementation Timeline

### Phase 1: Foundation (Completed)
- ✅ Project setup with Vite + React + TypeScript
- ✅ UI component library integration (shadcn/ui)
- ✅ Basic routing and layout structure
- ✅ Backend setup with Express and JSON Server

### Phase 2: Core Features (Completed)
- ✅ Event card component with voting
- ✅ Event submission form
- ✅ Filtering and search functionality
- ✅ Event details modal
- ✅ Delete functionality

### Phase 3: Enhanced Features (Completed)
- ✅ Email subscription system
- ✅ Responsive design implementation
- ✅ Toast notifications
- ✅ Hover card previews

### Phase 4: Future Enhancements (Proposed)
- [ ] User authentication and profiles
- [ ] Comment system on events
- [ ] Event editing functionality
- [ ] Advanced filtering (by date, location, tags)
- [ ] Event calendar view
- [ ] Push notifications
- [ ] Admin dashboard for content moderation
- [ ] Analytics and reporting

---

## 9. Testing Strategy

### Manual Testing
- Form validation and submission
- Filter and search functionality
- Voting system
- Modal interactions
- Responsive design across devices
- Email subscription flow

### Future Testing (Proposed)
- Unit tests for components
- Integration tests for API endpoints
- End-to-end testing with Playwright/Cypress
- Performance testing
- Accessibility testing

---

## 10. Deployment Plan

### Development Environment
- Frontend: `npm run dev` (Vite dev server)
- Backend: `npm run dev` (Nodemon with Express)
- JSON Server: `npm start` (Port 3001)

### Production Deployment (Proposed)
- **Frontend**: Vercel, Netlify, or GitHub Pages
- **Backend**: Heroku, Railway, or AWS
- **Database**: Migrate from JSON Server to PostgreSQL or MongoDB
- **Email Service**: Configure production SMTP settings

---

## 11. Security Considerations

### Current Implementation
- CORS configuration for API access
- Input validation on form submissions
- Client-side sanitization

### Future Security Enhancements (Proposed)
- Input sanitization on backend
- Rate limiting for API endpoints
- User authentication and authorization
- HTTPS enforcement
- SQL injection prevention (when migrating to SQL database)
- XSS protection
- CSRF tokens for form submissions

---

## 12. Challenges & Solutions

### Challenges Encountered
1. **Data Normalization**: Tags stored as both strings and arrays
   - **Solution**: Implemented normalization logic in data fetching

2. **Category Mapping**: Inconsistent category naming
   - **Solution**: Created category mapping object for consistent filtering

3. **Email Service Configuration**: Gmail SMTP setup complexity
   - **Solution**: Used app-specific password and configured Nodemailer

### Future Challenges (Anticipated)
- Scalability with large number of events
- Real-time updates without page refresh
- User authentication and authorization
- Content moderation and spam prevention

---

## 13. Learning Outcomes

### Technical Skills Developed
- React and TypeScript development
- RESTful API design and implementation
- Modern UI component libraries (shadcn/ui)
- Form handling and validation
- State management with React Hooks
- Responsive web design
- Email service integration
- JSON-based database management

### Soft Skills Developed
- Problem-solving and debugging
- Project planning and organization
- User experience design considerations
- Code organization and maintainability

---

## 14. Conclusion

SeeuConnect successfully addresses the need for a centralized campus event discovery platform. The application provides an intuitive interface for students to discover, share, and engage with campus activities. With a modern tech stack, responsive design, and core features implemented, the platform is ready for deployment and future enhancements.

The project demonstrates proficiency in full-stack web development, modern React patterns, and user-centered design. Future iterations can expand functionality with user authentication, advanced features, and improved scalability.

---

## 15. References & Resources

### Technologies Used
- React Documentation: https://react.dev
- TypeScript Documentation: https://www.typescriptlang.org
- Tailwind CSS: https://tailwindcss.com
- shadcn/ui: https://ui.shadcn.com
- Express.js: https://expressjs.com
- JSON Server: https://github.com/typicode/json-server
- Nodemailer: https://nodemailer.com

### Project Repository
- GitHub: [Repository URL to be added]

---

**Document Version**: 1.0  
**Last Updated**: December 2024  
**Author**: [Your Name]  
**Institution**: [Your Institution]

