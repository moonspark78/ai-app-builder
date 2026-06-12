import Link from 'next/link'
import Image from 'next/image'


const Header = () => {
  return (
    <header className="fixed top-0 left-0 z-50 h-16 border-b border-white/6 bg-white/7 backdrop-blur-md">
      <nav className="mx-auto flex h-full max-w-7xl items-center justify-between px-4">
        <Link href="/">
          <Image
            src={"/logo.png"}
            alt="Logo"
            width={100}
            height={100}
            className="h-9 w-auto rounded-md"
          />
        </Link>

        <div className="flex items-center gap-5">
          <Link
            href={"projects"}
            
          >
            Projects
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header