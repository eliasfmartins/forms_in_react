'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from 'zod'

const createUserFormSchema = z.object({
  email: z.string().nonempty('O e-mail é obrigatório').email('faltou o @ e o dominio fera'),
  password: z.string().min(6, 'pelomenos 6 caracteres ne meu nobre')

})
// schema nada mais e doque uma representacao de uma estrutura de dados
// os dados que eu recebo sao um obj literamente 2 campos por isso z.object
//  coloquei os 2 capos q eu espero q meu obj tenha um email q recebe 
//  e uma senha q tbm deve receber uma string
// dps do meu campo eu posso passar a propriedade noneempty que quer dizer que nao pode ficar vazio("aqui a msg pro usuario")

// dentro do hook useform vc passa um obj com resolver: zodResolver 
// pegando o formState. errors tenho acesso a todos os erros do form agora basta exibilos
// desetruturando nmovamente pego erro por erro


type CreateUserFormData = z.infer<typeof createUserFormSchema>
export default function Home() {
  const [output, setOutput] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema)
  })

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
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div className="flex flex-col gap-4">
          <label htmlFor="">Senha</label>
          <input type="password" className="border-zinc-400 shadow-sm rounded h-10 px-3 bg-zinc-800 text-white" {...register('password')} />
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        <button type="submit" className="bg-emerald-500 rounded font-semibold text-white h-10 hover:bg-emerald-700">Salvar</button>
      </form>
      <pre>
        {output}
      </pre>
    </main>
  );
}
