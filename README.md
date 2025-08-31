

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
  * Create more pages to show additional event types.
  * Make the search bar on the home page fully functional.
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

## Testing

### Backend

```bash
cd EventsApi
dotnet test
```

### Frontend

```bash
cd event-explorer
npm run test
```

---

## Author

* Samaneh ([@sam1362](https://github.com/sam1362))

---

## License

This project is open-source and free to use. Contributions are welcome!


