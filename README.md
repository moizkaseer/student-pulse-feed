## SEEUConnect – Campus Events & Opportunities Portal

SEEUConnect is a React + TypeScript single‑page application that helps students **discover, share, and track campus events and opportunities**.  
It is built as the frontend for a Spring Boot backend that stores event data in a relational database.

The app is designed to be a small but realistic full‑stack project to demonstrate:

- **Modern frontend stack**: Vite, React, TypeScript, Tailwind CSS, shadcn/ui components.
- **Java backend integration**: Spring Boot REST API, JPA entity for events.
- **Practical UX features**: filtering, searching, submission modal, and toast notifications.

---

## Features

- **Home page (`Index.tsx`)**
  - Displays a grid of events fetched from the Java backend (`GET /api/events`).
  - **Filter tabs** for `All`, `Events`, `Opportunities`, and `Announcements`.
  - **Search bar** to search by title, description, or tags.
  - Responsive layout with a clean, modern UI.

- **Event submission (`SubmitModal.tsx`)**
  - Modal dialog that lets students submit new items to SEEUConnect.
  - Form fields: title, location (frontend‑only), category, date, time, description, tags.
  - On submit:
    - Validates required fields (title, location, category, description).
    - Builds a payload that matches the Java `Event` entity.
    - Sends a POST request to the Spring Boot API (`POST http://localhost:9091/api/events`).
    - Shows clear success or error messages using `sonner` toasts.
    - Refreshes the event list on success.

- **Events list (`EventCard.tsx`, `FilterTabs.tsx`, `Header.tsx`)**
  - Each event is rendered as an `EventCard`.
  - `FilterTabs` lets the user switch between categories.
  - `Header` provides branding and a **Submit** button that opens the submission modal.

- **Newsletter subscribe modal**
  - Floating “Subscribe” button in the bottom‑right corner.
  - Opens a small modal where users can enter their email.
  - Sends the email to a (separate) backend endpoint (`POST http://localhost:5056/api/users`).
  - Handles errors like missing email and backend failures with toasts.

---

## Frontend Tech Stack

- **React 18** with **TypeScript**
- **Vite** as the build tool and dev server
- **Tailwind CSS** for styling + custom campus color palette
- **shadcn/ui** (Radix UI + Tailwind) for reusable UI components (`button`, `input`, `dialog`, `tabs`, `select`, etc.)
- **Axios** and `fetch` for HTTP requests
- **React Router DOM** for routing (used in `Header` with `Link`)
- **sonner** for toast notifications

All dependencies are defined in `package.json`.

---

## Backend Overview (Java / Spring Boot)

> Note: The backend lives in a separate project (e.g. `server`), but this frontend is built specifically for it.

- **Main entity: `Event`**

  ```java
  @Entity
  @Data
  public class Event {
      @Id
      @GeneratedValue(strategy = GenerationType.IDENTITY)
      private Long id;

      private String title;

      @Column(length = 1000)
      private String description;

      private String category;

      private Integer votes = 0;

      private LocalDateTime createdAt = LocalDateTime.now();
  }
  ```

- **Controller: `EventController`**

  - Base route: `@RequestMapping("/api/events")`
  - `GET /api/events` – returns all events.
  - `POST /api/events` – creates a new event.
  - CORS: `@CrossOrigin(origins = "http://localhost:8001")` to allow calls from the frontend.

The frontend’s submit modal sends a payload that matches this model (`title`, `description`, `category`, `votes`).

---

## How to Run the Project

### 1. Start the Java backend (Spring Boot)

1. Open the backend project (where `EventController` and `Event` live).
2. Make sure it is configured to run on **port 9091** (or update the frontend URL accordingly).
3. Run the Spring Boot app (from your IDE or with Maven/Gradle).

You should be able to open:

- `http://localhost:9091/api/events` in the browser and see the JSON list of events.

### 2. Start the React frontend

In `d:/java/myseeu-connect/client`:

```bash
npm install
npm run dev
```

By default Vite runs on `http://localhost:5173` (or whichever port it prints in the terminal).

> If your backend CORS is restricted to `http://localhost:8001`, either run Vite on that port or update `@CrossOrigin` in `EventController` to match the actual frontend URL.

---

## How the Data Flow Works

1. **Frontend load**
   - `Index.tsx` calls `axios.get("http://localhost:9091/api/events")` inside `useEffect` to fetch all events.
   - The data is stored in the `submissions` state and rendered as cards.

2. **Filtering and searching**
   - The `filteredData` array is computed on the client side.
   - Filtering uses a simple mapping between tab names (`events`, `opportunities`, `announcements`) and the `category` field stored in the backend.
   - Searching checks title, description, and tags.

3. **Submitting a new event**
   - User clicks **Submit** in the header → opens `SubmitModal`.
   - User fills in the form and clicks **Submit**.
   - The app validates the input and sends a POST request to the backend.
   - On success:
     - A success toast is shown.
     - The modal closes.
     - The event list is refreshed by calling the `fetchSubmissions` function again.

4. **Newsletter subscription**
   - The floating Subscribe button opens a small modal.
   - The user enters an email.
   - The app sends a `POST` request to `http://localhost:5056/api/users`.
   - The user sees success or error messages via toasts.

---


