# BudgetLog

A budget tracking and accounting platform aimed at businesses and casual users.

```
nextjs: v14.2.8
react: v18.3.1
trpc: v11.0.0
styling: Tailwind CSS
entry point: src/app/page.tsx
styling guide: Airbnb - https://github.com/airbnb/javascript
package installer/runtime: bun
```

## Development

You can follow the active development of BudgetLog either on [GitHub](https://github.com/trueNebula/BudgetLog), on [Plane](https://app.plane.so/truenebula/projects/05121f97-6c34-4fbe-b762-f2a5c9ba3e91/views/78f1646b-fa3e-4385-a7bd-05c70644e61e/) or (if you're lucky), [online](https://buget-log.vercel.app/).

Feel free to create pull requests on Github if you want to contribute.

## Installation

First, install the required packages:

```bash
npm i
# or
bun install
```

You will need to have a PostgreSQL server running. Once this is done, run the needed migrations:

```bash
npx drizzle-kit migrate
# or
bun drizzle-kit migrate
```

Copy the example environment file (`.env.example`) and rename it to `.env`. Fill in the `DATABASE_URL` variable with the URL to your PostgreSQL database.

Follow the [NextAuth tutorial](https://next-auth.js.org/providers/google) in order to set up the Google OAuth variables. You will need these in order to properly run the project locally.

Feel free to customize the other variables to your liking, according to the given comments.

Then run the development server:

```bash
npm run dev
# or
bun dev
```

The local project will be available at [localhost:3000](locahost:3000) in your browser.

## Database Changes

This project uses [Drizzle ORM](https://orm.drizzle.team/) and [PostgreSQL](https://www.postgresql.org/). The database schema is available at `src/server/db/schema.ts`. Any modifications made to it will have to be transpiled into a migration.

Once modified, run:

```bash
npx drizzle-kit generate --name <migration name>
npx drizzle-kit migrate
# or
bun drizzle-kit generate --name <migration name>
bun drizzle-kit migrate
```

This will bring any changes made to the schema file into your database.
