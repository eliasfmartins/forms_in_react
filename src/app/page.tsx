'use client'
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Home() {
  const [output, setOutput] = useState('')
  const { register, handleSubmit } = useForm()

  function createUser(data: any) {
    console.log(data)
    setOutput(JSON.stringify(data, null, 2))
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-10">
      <form action="" className="flex flex-col gap-4 w-full max-w-xs" onSubmit={handleSubmit(createUser)}>

        <div className="flex flex-col gap-4">
          <label htmlFor="">E-mail</label>
          <input type="email" className="border-zinc-400 shadow-sm rounded h-10 px-3 bg-zinc-800 text-white"{...register('email')} />
        </div>

        <div className="flex flex-col gap-4">
          <label htmlFor="">Senha</label>
          <input type="password" className="border-zinc-400 shadow-sm rounded h-10 px-3 bg-zinc-800 text-white" {...register('password')} />
        </div>

        <button type="submit" className="bg-emerald-500 rounded font-semibold text-white h-10 hover:bg-emerald-700">Salvar</button>
      </form>
      <pre>
        {output}
      </pre>
    </main>
  );
}
