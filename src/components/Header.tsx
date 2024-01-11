import Link from "next/link";

export const Header = () => {
  return (
    <header className="bg-cyan-100 px-6 py-4 text-gray-700">
      <nav className="mx-auto max-w-5xl">
        <ul className="flex flex-row gap-6">
          <li className="text-4xl">
            <Link href="/">Главная</Link>
          </li>
          <li className="text-4xl">
            <Link href="/job/add">Разместить</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
