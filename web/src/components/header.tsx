import Link from "next/link";
export default function Header() {
  return (
    <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
      <Link
        className="flex items-center gap-2 text-lg font-semibold md:text-base"
        href="#"
      >
        <h1 className="text-3xl font-bold">Tasks manager</h1>
      </Link>
    </header>
  );
}
