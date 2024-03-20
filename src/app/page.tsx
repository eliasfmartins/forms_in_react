'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from 'zod'

const createUserFormSchema = z.object({
  name: z.string().nonempty('O nome é obrigatório').transform(name => {
    return name.trim().split(' ').map(word => {
      return word[0].toLocaleUpperCase().concat(word.substring(1))
    }).join()
  }),
  email: z.string().nonempty('O e-mail é obrigatório').email('faltou o @ e o dominio fera').toLowerCase()
    //  refine e uma forma de fazer verificacoes que n estao incluias no zod
    .refine(email => {
      return email.endsWith('biscoito.com')
    }, 'o email precisa ser o meu e.e'),
  password: z.string().min(6, 'pelomenos 6 caracteres ne meu nobre'),
  techs: z.array(z.object({
    title: z.string().min(1, 'nao pode ficar vazio'),
    knowledge: z.number().min(1).max(100)
  }))

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
  const { register, control, handleSubmit, formState: { errors } } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema)
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'techs',
  })
  function addNewTech() {
    append({ title: '', knowledge: 0 })
  }


  function createUser(data: any) {
    console.log(data)
    setOutput(JSON.stringify(data, null, 2))
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-10">
      <form action="" className="flex flex-col gap-4 w-full max-w-xs" onSubmit={handleSubmit(createUser)}>

        <div className="flex flex-col gap-4">
          <label htmlFor="">Nome</label>
          <input type="text" className="border-zinc-400 shadow-sm rounded h-10 px-3 bg-zinc-800 text-white"{...register('name')} />
          {errors.name && <span>{errors.name.message}</span>}
        </div>

        <div className="flex flex-col gap-4">
          <label htmlFor="">E-mail</label>
          <input type="email" className="border-zinc-400 shadow-sm rounded h-10 px-3 bg-zinc-800 text-white"{...register('email')} />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div className="flex flex-col gap-4">
          <label htmlFor="" className="flex items-center justify-between">Tecnologias</label>
          <button onClick={addNewTech} className="">Adicionar</button>
          {
            fields.map((field, index) => {
              return (
                <div key={field.id}>
                  <input type="text"
                    className="border-zinc-400 shadow-sm rounded h-10 px-3 bg-zinc-800 text-white"
                    {...register(`techs.${index}.title`)} />

                  <input type="number"
                    className="border-zinc-400 shadow-sm rounded h-10 px-3 bg-zinc-800 text-white"
                    {...register(`techs.${index}.knowledge`)} />
                </div>
              )
            })
          }
        </div>
        <button type="submit" className="bg-emerald-500 rounded font-semibold text-white h-10 hover:bg-emerald-700">Salvar</button>
      </form>
      <pre>
        {output}
      </pre>
    </main >
  );
}
