export default function Header() {
  return (
    <header className="border-b border-gray-200/80 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-gray-900 text-sm font-bold text-white shadow-sm">
            FF
          </div>
          <p className="text-lg font-semibold tracking-normal text-gray-950">FreightFlow</p>
        </div>
        <div className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm">
          Guangzhou <span className="text-sky-600">→</span> Jebel Ali
        </div>
      </div>
    </header>
  );
}
