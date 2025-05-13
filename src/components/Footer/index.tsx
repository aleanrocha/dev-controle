import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="px-4 h-20 flex items-center justify-center border-t border-zinc-600 text-center text-zinc-400 mt-12">
      <p>
        Desenvolvido por{' '}
        <Link
          href={'https://www.linkedin.com/in/aleanrocha'}
          target="_blank"
          className="text-blue-400 font-bold"
        >
          Alean Rocha
        </Link>{' '}
        - <span className="font-bold text-zinc-300">2025</span>
      </p>
    </footer>
  )
}
