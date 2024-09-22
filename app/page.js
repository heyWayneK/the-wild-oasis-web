import Image from "next/image";
import Link from "next/link";
import Navigation from "./_components/Navigation";
import bgImage from "@/public/bg.png";

export default function Home() {
  return (
    <main className="mt-24">
      <Image
        src={bgImage}
        fill
        quality={80}
        placeholder="blur"
        className="object-cover object-top"
        alt="Mountains and forests with two cabins"
      />

      <div className="relative text-center z-10">
        <h1 className="text-8xl text-primary-50 mb-10 tracking-tight font-normal">
          Welcome to paradise.
        </h1>
        <Link
          href="/cabins"
          className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
        >
          Explore luxury cabins
        </Link>
      </div>
    </main>
  );
}
