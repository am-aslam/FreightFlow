import CalculatorForm from "@/components/CalculatorForm";
import Header from "@/components/Header";
import HeroVisual from "@/components/HeroVisual";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white text-gray-900">
      <Header />
      <section className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 py-6 sm:px-6 md:py-10 lg:min-h-[calc(100vh-73px)] lg:grid-cols-2 lg:items-start lg:gap-10 lg:px-8 xl:gap-14">
        <HeroVisual />
        <CalculatorForm />
      </section>
    </main>
  );
}
