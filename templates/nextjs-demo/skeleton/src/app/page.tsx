import { withBasePath } from "@/lib/utils";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] overflow-y-hidden h-full">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start z-1">
        <div className="">
          <h1 className="text-5xl">${{ values.componentName }}</h1>
        </div>
        <ul className="list-inside text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
            <li className="mb-2 tracking-[-.01em]">
            Use the power of the Scaffolder with{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
              VeeCode Platform
            </code>
            .
            </li>
            <li className="tracking-[-.01em]">
            And create standardized projects efficiently.
            </li>
        </ul>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-neutral-300 dark:bg-slate-800 text-neutral-700 dark:text-neutral-50 gap-2 hover:bg-neutral-600 hover:text-white dark:hover:bg-black dark:hover:text-white font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto cursor-pointer"
            href="https://platform.vee.codes/en/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={withBasePath("/assets/veecode.png")}
              alt="Vercel logomark"
              width={20}
              height={20}
              unoptimized
            />
            Visit our site
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://docs.platform.vee.codes/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <Image
        aria-hidden
        src={withBasePath("/assets/bg.svg")}
        alt="bg"
        width={16}
        height={16}
        className="absolute w-[100vw] bottom-0 left-0 opacity-60 z-0"
        unoptimized
      />
    </div>
  );
}
