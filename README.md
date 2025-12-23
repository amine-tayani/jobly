# Jobly - Job Board application

## Tech Stack

- **Frontend**: React with TanStack Start (full-stack React framework)
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **UI Components**: shadcn/ui with Tailwind CSS
- **Form Management**: React Hook Form with Zod validation
- **State Management**: TanStack Query
- **Rich Text Editor**: Tiptap WYSIWYG editor

## Features

- 📋 **Job Listings**: Display all open positions with filtering by department
- 📝 **Job Applications**: Apply to specific jobs or submit spontaneous applications
- 📊 **Dashboard**: View metrics for jobs and applications
- 📄 **Job Details**: Detailed job descriptions with application forms


## Prerequisites

- I'm using Node v24.11.0
- Docker for running the postgres database
- I'm using pnpm as my package manager for this project

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/amine-tayani/jobly.git
cd jobly
```

### 2. Install dependencies

```bash
npm install
# or
pnpm install
```

### 3. Set up environment variables

I'm runing the postgres database using docker with the following command:

```bash
docker run -d \
  --name joblydb \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=yourpassword \
  -e POSTGRES_DB=joblydb \
  -p 5432:5432 \
  postgres
  ```  

And start the database container with:

```bash
docker start joblydb
```

Create a `.env.local` file in the root directory:

```env
DATABASE_URL="postgresql://postgres:<yourpassword>@localhost:5432/joblydb"
```

### 4. Set up the database

```bash
# Push the schema to the database
pnpm db push

# Seed the database with sample data
pnpm run db:seed

```

### 5. Run the development server

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

## Available Scripts

```bash
# Development
npm run dev                 # Start development server

# Database
pnpm db push            # Push schema changes to database
npm run db:seed            # Seed database with sample data
pnpm db studio          # Open Drizzle Studio (database GUI)

## Database Schema

Look into the `src/lib/db/schema` folder for the database schema.

## Contact

For questions or support, reach out to amine.tayani@gmail.com