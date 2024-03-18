import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <form action="" className="flex flex-col gap-4 w-full max-w-xs">

        <div className="flex flex-col gap-4">
          <label htmlFor="">E-mail</label>
          <input type="email" name="email" className="border-zinc-300 shadow-sm rounded h-10 px-3" />
        </div>

        <div className="flex flex-col gap-4">
          <label htmlFor="">Senha</label>
          <input type="password" name="password" className="border-zinc-300 shadow-sm rounded h-10 px-3" />
        </div>

        <button type="submit" className="bg-emerald-500 rounded font-semibold text-white h-10 hover:bg-emerald-700">Salvar</button>
      </form>
    </main>
  );
}
