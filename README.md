# RxReader - AI Prescription Reader

RxReader is a web application that helps users understand their doctor's prescriptions using AI. It provides plain-English explanations of medicines, dosages, and instructions from uploaded photos.

## Setup Instructions

### 1. Environment Variables
Create a `.env.local` file in the root directory and add the following keys with your values:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
```

### 2. Database Setup
Run the SQL script found in `supabase/schema.sql` in your Supabase SQL editor to create the necessary tables:
- `sessions`: Stores temporary user sessions.
- `results`: Stores AI-processed prescription results.

### 3. Local Development
Install dependencies and start the development server:
```bash
npm install
npm run dev
```
The app will be available at [http://localhost:3000](http://localhost:3000).

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (Auth, Database, Storage)
- **AI**: Google Gemini Pro Vision
