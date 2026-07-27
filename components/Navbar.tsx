export default function Navbar() {
  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">

        <h1 className="text-2xl font-bold text-blue-600">
          SEF
        </h1>

        <ul className="hidden gap-8 font-medium text-gray-700 md:flex">
          <li className="cursor-pointer hover:text-blue-600">Home</li>
          <li className="cursor-pointer hover:text-blue-600">About</li>
          <li className="cursor-pointer hover:text-blue-600">How it Works</li>
          <li className="cursor-pointer hover:text-blue-600">Contact</li>
        </ul>

        <button className="rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white transition hover:bg-blue-700">
          Login
        </button>

      </div>
    </nav>
  );
}