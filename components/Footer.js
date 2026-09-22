export default function Footer({ name }) {
  return (
    <footer className="border-t border-ink/10 px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 text-sm text-inkSoft/70 sm:flex-row">
        <p>
          © {new Date().getFullYear()} {name || "Portfolio"}
        </p>
        <a href="/admin" className="hover:text-leaf-dark">
          Admin
        </a>
      </div>
    </footer>
  );
}
