
# Event Explorer

A **full-stack project** for discovering and browsing events.  
It includes:

- **Backend (EventsApi)** → built with **.NET 9 Web API**  
- **Frontend (event-explorer)** → built with **Next.js 14, TypeScript, TailwindCSS**

---

## Project Structure

```

event-explorer-project/
│── EventsApi/           # Backend (.NET 9 Web API)
│── event-explorer/      # Frontend (Next.js)
│── .gitignore
│── README.md

````

---

## Backend (EventsApi)

### Prerequisites
- [.NET 9 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/9.0)
- Internet access for NuGet packages

### Configuration
Add your Ticketmaster API key to `appsettings.Development.json` inside `EventsApi`:

```json
{
  "Ticketmaster": {
    "ApiKey": "your_api_key_here"
  }
}
````

### Run the API

```bash
cd EventsApi
dotnet restore   # restore dependencies
dotnet build     # build the project
dotnet run       # run the API
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

The frontend communicates directly with the backend (`EventsApi`) and does not require its my API key.

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

````

---
