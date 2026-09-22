# Agri-Portfolio

A researcher portfolio site (Next.js + Tailwind + Framer Motion) with a database-backed
admin panel (Supabase) so your client can edit content instantly — no code, no redeploys.

- **Public site:** hero, about, research interests, publications, projects, career
  timeline, skills, and a working contact form.
- **Admin panel:** `/admin` — sign in, then edit every section from `/admin/dashboard`.
  Edits save straight to the database and show up on the live site immediately.

---

## 1. Create the Supabase project (free tier is enough)

1. Go to [supabase.com](https://supabase.com) → New project. Save the database password
   somewhere safe.
2. Once it's ready, open **SQL Editor → New query**, paste the entire contents of
   `supabase/schema.sql`, and click **Run**. This creates all tables, security rules,
   a public media storage bucket, and a couple of starter rows.
3. Create the admin login: **Authentication → Users → Add user**. Enter the client's
   email and a password. This is the *only* account that can log into `/admin` — there's
   no public sign-up, by design.
4. Grab your API keys: **Project Settings → API** → copy the **Project URL** and the
   **anon public** key (not the service_role key — that one never goes in this app).

## 2. Configure the project locally

```bash
cp .env.example .env.local
```

Paste your Project URL and anon key into `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

Then install and run:

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` for the site and `http://localhost:3000/admin` to log in
and add real content (the site ships with placeholder text so you can see the layout
before you fill anything in).

## 3. Customize before handoff

- Replace placeholder colors/fonts in `tailwind.config.js` and `app/layout.js` if the
  client wants a different palette (currently a botanical green/marigold/coral theme).
- Add the client's real content through `/admin` rather than editing the seed data in
  `schema.sql` — that's the whole point of the admin panel.
- The favicon and metadata title/description live in `app/layout.js`.

## 4. Deploy

### Vercel (recommended — zero config for Next.js)

1. Push this project to a GitHub repo.
2. [vercel.com](https://vercel.com) → New Project → import the repo.
3. Add the two environment variables from `.env.local` in the Vercel project settings
   (**Settings → Environment Variables**).
4. Deploy. Then in **Settings → Domains**, add the client's domain and follow Vercel's
   DNS instructions (usually an A record or CNAME at their domain registrar).

### Netlify

1. Push this project to a GitHub repo.
2. [netlify.com](https://app.netlify.com) → Add new site → Import an existing project.
3. Netlify will detect `netlify.toml` (build command `npm run build`, Next.js plugin
   included). Add the same two environment variables under **Site configuration →
   Environment variables**.
4. Deploy, then add the client's domain under **Domain management**.

Either host works well — pick whichever the client already has an account with.

## 5. Handing off to the client

Give the client:
- The site's admin URL: `https://their-domain.com/admin`
- The email/password you created in step 1.3 (suggest they change the password once —
  they can do that from the Supabase dashboard under Authentication, or you can add a
  "change password" flow later if they want it self-serve).

They can then update their bio, publications, projects, timeline, skills, and photos any
time, from any device, with no redeploy and no code.

## Project structure

```
app/
  page.js                 Public homepage (fetches all content server-side)
  admin/page.js            Admin login
  admin/dashboard/page.js  Admin dashboard (tabs for each content type)
components/                Public site sections (Hero, About, Publications, ...)
components/admin/          Reusable admin form building blocks
lib/                       Supabase client, data fetchers, auth guard, upload helper
supabase/schema.sql         Full database schema + security rules — run this once
```
