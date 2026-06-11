# AVP Millets & Oils

AVP Millets & Oils is a modern, premium e-commerce platform for managing and selling millet products, cold-pressed edible oils, and related agricultural products. The platform features a fully-functional customer-facing storefront and a comprehensive admin management dashboard with inventory, category, and inquiry handling.

## Tech Stack
- **Framework:** Next.js (App Router)
- **Database:** MySQL
- **ORM:** Prisma
- **Styling:** Tailwind CSS (v4)
- **State/Components:** React Context, Lucide React, Shadcn UI

---

## Local Development Setup

To run this application locally, follow the steps below:

### 1. Clone the Repository
```bash
git clone https://github.com/sandhiyasureshm/avp-millets-oils.git
cd avp-millets-oils
```

### 2. Install Dependencies
Make sure you have Node.js (version 18+ recommended) installed.
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory:
```bash
cp .env.example .env
```
Open the `.env` file and configure your local MySQL connection string:
```env
DATABASE_URL="mysql://root:yourpassword@localhost:3306/avp_oils"
JWT_SECRET="your-super-secret-key-change-this-in-production"
```

### 4. Database Setup & Migrations
Ensure your MySQL database server is running and a database named `avp_oils` exists (or Prisma will automatically create it based on your connection string).

Run the Prisma migrations to create the database schema:
```bash
npx prisma migrate dev
```

### 5. Seed the Database
Seed the database with default categories, initial products, and the administrator account:
```bash
npx prisma db seed
```
> **Note:** The default admin credentials created during seeding will be logged to the terminal console (e.g., `admin@avpoils.com` / `admin123`).

### 6. Run the Development Server
Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the storefront, or [http://localhost:3000/admin](http://localhost:3000/admin) to access the Admin Dashboard.

---

## Project Structure
- `/src/app/(public)`: Public storefront routes (Home, About, Products, Contact, Gallery).
- `/src/app/admin`: Admin dashboard routes and authentication pages.
- `/src/components/public`: Storefront specific UI components.
- `/src/components/admin`: Admin specific components and forms.
- `/src/features`: Server Actions and logic divided by modules (Auth, Products, Inquiries, etc.).
- `/prisma`: Database schema and migration tracking.


