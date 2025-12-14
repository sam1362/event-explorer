
# Event Explorer

A **full-stack project** for discovering and browsing events.

---

## Project Overview

* **API used:** [Ticketmaster Discovery API](https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/)
* **What I built:**
  * A .NET 9 backend (`EventsApi`) that fetches events from Ticketmaster securely (API key kept on server).
  * A Next.js 14 frontend (`event-explorer`) that displays events with city filtering, sorting, and event cards.


---

## Project Structure

```
event-explorer-project/
├── event-explorer/       # Frontend (Next.js)
├── EventsApi/            # Backend (.NET 9 Web API)
├── EventsApiTest/        # Backend tests (xUnit)
├── EventsApi.sln         # Solution file
└── README.md
```

---

## Backend (EventsApi)

### Prerequisites

* [.NET 9 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/9.0)
* Internet access for NuGet packages

### Configuration

To enable event data fetching from Ticketmaster, make sure the backend is properly configured:

1. Open `EventsApi/appsettings.Development.json`.
2. Add your **Ticketmaster API key** under the `Ticketmaster` section:

```json
{
  "Ticketmaster": {
    "ApiKey": "your_api_key_here"
  }
}
```

### Run the API

```bash
cd EventsApi
dotnet run
```

By default, the API runs on:
`https://localhost:5080`

Example endpoints:

* `GET /api/events` → returns all events
* `GET /api/events?city=Oslo` → returns events filtered by city

---

## Frontend (event-explorer)

### Prerequisites

* [Node.js (LTS)](https://nodejs.org/en) (v18+ recommended)
* npm or yarn

### Install dependencies

```bash
cd event-explorer
npm install
```

### Run development server

```bash
npm run dev
```

The app will be available at:
`http://localhost:3000`

The frontend communicates directly with the backend (`EventsApi`) and does not require its own API key.  
Currently only the **Entertainment page** is functional (city dropdown + sorting). Other pages are under construction.

---

## 🧪 Testing

Both frontend and backend include automated unit tests, covering **expected behavior** and **handling incorrect input** scenarios.

### Backend (xUnit)

```bash
cd EventsApiTest
dotnet test
```

* **EventsControllerTests** → Happy tests  
  * Ensures `/api/events` returns an **Ok** response with data.  
  * Ensures `/api/events?city=Oslo` returns an **Ok** response with filtered results.

* **EventsControllerNegativeTests** → EdgeCase tests  
  * Verifies the API responds safely to invalid or unexpected input (e.g., when the city parameter is invalid or missing).

---

### Frontend (Jest + React Testing Library)

```bash
cd event-explorer
npm test
```

> If needed, install testing dependencies first:

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

* **CategoryCard.test** → Happy tests  
  * Confirms the component renders correctly with given props (title + image).  
  * Confirms clicking the card triggers navigation via `router.push()`.

* **NegativeCategoryCard.test** → EdgeCase tests  
  * Verifies the component behaves gracefully when props are missing or invalid (e.g., no image or empty title).

---
* **Future improvements (with more time):**
  * Add more event categories beyond entertainment.
  * Add more filters (by category, date, price, etc.).
  * Debounce for search.
  * Add search by date and keyword.
  * Write more unit tests for both frontend and backend.

## 👩‍💻 Author

* Samaneh ([@sam1362](https://github.com/sam1362))

---

## 📄 License

This project is open-source and free to use. Contributions are welcome!

---
