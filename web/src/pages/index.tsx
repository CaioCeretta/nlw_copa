
import Image from 'next/image';
import appPreviewImg from '../assets/aplicacao-trilha-ignite.png';
import logoImg from '../assets/logo.svg';
import usersAvatarExample from '../assets/users-avatar-example.png';
import IconCheckImages from '../assets/icon-check.svg';
import { api } from '../lib/axios';
import { FormEvent, useState } from 'react';


interface IHomeProps {
   pollCount: number;
   guessCount: number;
   userCount: number;
}

export default function Home(props: IHomeProps) {
   const [poolTitle, setPoolTitle] = useState('')

   
   async function createPoll(event: FormEvent) {
      event.preventDefault();

      try {
         const response = await api.post('polls', {
            title: poolTitle
         })

         const { code } = response.data

         await navigator.clipboard.writeText(code)

         alert('Bolão criado com sucesso, o código foi copiado para a área de transferência')

         setPoolTitle('');

      } catch(e) {
         console.log(e);
         alert('Falha ao criar o bolão, tente novamente')
         setPoolTitle('');
      }
   }
   
   return (
      <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 items-center">
         <main>
            <Image src={logoImg} alt="NLW Copa" />

            <h1 className="mt-14 text-white font-bold text-5xl leading-tight">Crie seu próprio bolão da copa e compartilhe entre amigos!</h1>

            <div className='mt-10 flex items-center gap-2'>
               <Image src={usersAvatarExample} alt="Avatares usuários" />

               <strong className='text-gray-100 text-xl '>
                  <span className='text-ignite-500'> {props.userCount} </span> pessoas já estão usando
               </strong>
            </div>

            <form action="" onSubmit={createPoll} className='mt-10 flex gap-2'>
               <input
                  className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100"
                  type="text"
                  required
                  placeholder="Qual o nome do seu bolão"
                  onChange={event => setPoolTitle(event.target.value)}
                  value={poolTitle}
               />

               <button
                  className="bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700"
                  type="submit">
                  Criar meu bolão
               </button>
            </form>

            <p className='mt-5 text-sm text-gray-300 leading-relaxed'>Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas</p>

            <div className="mt-10 pt-10 border-5 border-t border-gray-600 flex items-center justify-between text-gray-100">
               <div className='flex items-center gap-6'>
                  <Image src={IconCheckImages} alt="" />
                  <div className='flex flex-col'>
                     <span className='font-bold text-2xl'>+{props.pollCount}</span>
                     <span>Bolões criados</span>
                  </div>
               </div>

               <div className="w-px h-14 bg-gray-600"></div>

               <div className='flex items-center gap-6'>
                  <Image src={IconCheckImages} alt="" />
                  <div  className='flex flex-col'>
                     <span className='font-bold text-2xl'>+{props.guessCount}</span>
                     <span>Bolões criados</span>
                  </div>
               </div>
            </div>
         </main>

         <Image src={appPreviewImg}
            quality={100}
            alt="Dois celulares exibindo uma prévia da aplicação móvel do nlw copa" />
      </div>
   )
}


export const getServerSideProps = async () => {


   const [pollCountResponse, guessCountResponse, userCountResponse] = await Promise.all([
      api.get('polls/count'),
      api.get('guesses/count'),
      api.get('users/count')
   ])

   return {
      props: {
         pollCount: pollCountResponse.data.count,
         guessCount: guessCountResponse.data.count,
         userCount: userCountResponse.data.count
      }
   }
 }
