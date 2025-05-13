import Image from 'next/image'
import hero from '@/assets/hero.svg'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center gap-6 p-8 flex-1 h-[calc(100vh-192px)]">
      <h1 className="text-2xl font-bold uppercase text-center">
        Gerencie seu negócio
      </h1>
      <p className="text-zinc-400 text-center">
        Chega de bagunça! Deixe o{' '}
        <span className="text-blue-400 font-bold">Dev Controle</span> cuidar dos
        seus clientes.
      </p>
      <Image src={hero} alt="Image Hero" className="w-sm lg:max-w-xl" />
    </main>
  )
}
