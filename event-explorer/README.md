

##  README 

# Event Explorer (Ticketmaster API Demo)

A small demo application built with **Next.js 13 (App Router)** and **Tailwind CSS**.  
The app fetches real event data from the **Ticketmaster Discovery API** and displays it in a user-friendly UI.  

---
## Features
- Fetch events from **Ticketmaster API**.
- **City Dropdown**:  
    Dynamically populated from Ticketmaster API (unique cities extracted from events).
  - User selects a city → events update automatically.
- **Sort Dropdown**: sort events by:
  - Date (ascending)
  - Date (descending)
  - Disability-friendly
- **Event Cards**:
  - Show event name, date, time, venue
  - Dynamic event images from API
  - Click → opens the official Ticketmaster event page
- Responsive layout with Tailwind grid system.
- Environment variables (`.env.local`) for secure API key handling.

## Components
The project is built with reusable React components:

- **Navbar.tsx** → top navigation bar  
- **CityDropdown.tsx** → dropdown to select city (dynamically populated from API)  
- **SortDropdown.tsx** → dropdown to choose sort option (date, disability-friendly)  
- **EventCard.tsx** → reusable card component for displaying event details  

This makes the codebase clean, modular, and easy to extend.

---

## Tech Stack
- [Next.js 13](https://nextjs.org/) (App Router, API routes)
- [Tailwind CSS](https://tailwindcss.com/)
- [Headless UI](https://headlessui.dev/) for custom dropdowns
- [Heroicons](https://heroicons.com/) for icons

---

## Environment Variables
Create a file called `.env.local` in the root of the project:

```env
NEXT_PUBLIC_TM_API_KEY=YOUR_TICKETMASTER_API_KEY
````

---

## How to Run

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run dev server:

   ```bash
   npm run dev
   ```

3. Open in browser:

   ```
   http://localhost:3000
   ```

---

## Project Structure

```
event-explorer/
 ├─ app/
 │   ├─ page.tsx              # Home page
 │   ├─ entertainment/
 │   │   └─ page.tsx          # Entertainment events page
 │   └─ api/
 │       └─ ticketmaster/
 │           └─ route.ts      # API route (proxy to Ticketmaster)
 ├─ components/
 │   ├─ Navbar.tsx
 │   ├─ CityDropdown.tsx
 │   ├─ SortDropdown.tsx
 │   └─ EventCard.tsx
 ├─ lib/
 │   └─ ticketmaster.ts       # API helper function
 ├─ public/
 │   └─ placeholder.jpg
 ├─ .env.local                # API key
 ├─ package.json
 └─ README.md
```

---

## What I Would Improve With More Time

* Add more filters (e.g., category types).
* Add pagination or infinite scroll for events.
* Improve accessibility (keyboard navigation, ARIA attributes).
* Write unit tests for components (`Jest / React Testing Library`).
* Better error handling (e.g., API rate limits, no internet).



