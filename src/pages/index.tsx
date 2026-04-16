import PageHead from "@/components/commons/PageHead";



export default function Home() {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black"
    >
      <PageHead/>
      <div className="flex w-fit justify-center bg-slate-800 rounded-full px-6 py-1.5">
        <p className="text-sm text-white font-sans">Hello Next</p>
      </div> 
     
    </div>
  );
}
