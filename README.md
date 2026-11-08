# E-Learning Hub

E-Learning Hub is a learning management dashboard for institutions to manage learners, activities, progress, and completion reports.

Administrators can:

- View dashboard statistics based on the local data service.
- Add and remove learners.
- Search learners by name, email, or cohort.
- Create and remove learning activities.
- View reports for learner progress and activity completion.

Learners can:

- View their assigned activities.
- Complete activities.
- Track their progress and completion rate.
- Update their name, email address, and password.

## Technology

- React 19
- TypeScript
- Vite
- JSON Server for local REST API data
- ESLint

The application uses [`db.json`](./db.json) as its local data store. The frontend reads learners, activities, users, and completions from JSON Server at `http://localhost:3001`.

## Requirements

- Node.js 18 or newer
- npm

## Local setup

1. Clone the repository and open the project directory:

   ```bash
   git clone <repository-url>
   cd e-learning-hub
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start JSON Server in one terminal:

   ```bash
   npm run server
   ```

   This starts the API at `http://localhost:3001` and watches [`db.json`](./db.json).

4. Start the Vite development server in a second terminal:

   ```bash
   npm run dev
   ```

5. Open the URL shown by Vite, usually `http://localhost:5173`.

Run both the API and frontend servers during development so that live learner, activity, user, and completion data is available.

## Demo accounts

These accounts are included in `db.json`:

| Role | Email | Password |
|---|---|---|
| Admin | `admin@learninghub.org` | `admin123` |
| Learner | `learner@learninghub.org` | `learner123` |

When JSON Server is unavailable, the application can still be opened with the demo accounts, but changes and live reports cannot be synchronized with `db.json`.

## Available scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run server` | Start JSON Server on port 3001 |
| `npm run build` | Type-check and create a production build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build |

## Data and development notes

- Edit [`db.json`](./db.json) to change the seeded local data.
- JSON Server writes create, update, and delete operations back to `db.json`.
- The frontend expects the API at `http://localhost:3001`.
- Do not use real passwords or sensitive personal data in the local seed file.
