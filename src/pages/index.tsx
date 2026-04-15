import PageHead from "@/components/commons/PageHead";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function Home() {
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black`}
    >
      <PageHead/>
      <div className="flex w-fit justify-center bg-slate-800 rounded-full px-6 py-1.5">
        <p className="text-sm text-white">Hello Next</p>
      </div> 
     
    </div>
  );
}
