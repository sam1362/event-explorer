

# Event Explorer

A **full-stack project** for discovering and browsing events.

---

## Project Overview

* **API used:** [Ticketmaster Discovery API](https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/)
* **What I built:**

  * A .NET 9 backend (`EventsApi`) that fetches events from Ticketmaster securely (API key kept on server).
  * A Next.js 14 frontend (`event-explorer`) that displays events with city filtering, sorting, and event cards.
* **Future improvements (with more time):**

  * Add more event categories beyond entertainment.
  * Add more filters (by category, date, price, etc.).
  * Debounce for search.
  * Apply Pagination or Infinite Scroll.
  * Add search by date and keyword.
  * Write more unit tests for both frontend and backend.

---

## Project Structure

```
event-explorer-project/
│── EventsApi/           # Backend (.NET 9 Web API)
│── event-explorer/      # Frontend (Next.js)
│── .gitignore
│── README.md
```

---

## Backend (EventsApi)

### Prerequisites

* [.NET 9 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/9.0)
* Internet access for NuGet packages

### Configuration

Add your Ticketmaster API key to `appsettings.Development.json` inside `EventsApi`:

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
`https://localhost:5001`

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

👌 عالی، گرفتم چی می‌خوای.
تو الان دو دسته تست داری:

* **Backend (xUnit)** → ‌دو فایل:

  * `EventsControllerTests` (تست مثبت)
  * `EventsControllerNegativeTests` (تست منفی)

* **Frontend (Jest + React Testing Library)** → دو فایل:

  * `CategoryCard.test` (تست مثبت)
  * `NegativeCategoryCard.test` (تست منفی)

من باید اینارو توی بخش **Testing** توضیح بدم با اصطلاحات درست (Positive test / Negative test).

---

## Testing

Both frontend and backend include automated unit tests, covering **positive** (expected behavior) and **negative** (handling incorrect input) scenarios.

### Backend (xUnit)

```bash
cd EventsApi
dotnet test
````

* **EventsControllerTests** → Positive tests

  * Ensures `/api/events` returns an **Ok** response with data.
  * Ensures `/api/events?city=Oslo` returns an **Ok** response with filtered results.

* **EventsControllerNegativeTests** → Negative tests

  * Verifies the API responds safely to invalid or unexpected input (e.g., when the city parameter is invalid or missing).

---

### Frontend (Jest + React Testing Library)

```bash
cd event-explorer
npm run test
```

* **CategoryCard.test** → Positive tests

  * Confirms the component renders correctly with given props (title + image).
  * Confirms clicking the card triggers navigation via `router.push()`.

* **NegativeCategoryCard.test** → Negative tests

  * Verifies the component behaves gracefully when props are missing or invalid (e.g., no image or empty title).

```
---

## Author

* Samaneh ([@sam1362](https://github.com/sam1362))

---

## License

This project is open-source and free to use. Contributions are welcome!


