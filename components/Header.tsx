import { Link } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <header className="fixed top-0">
      <nav>
        <Link>
          <Image
            src={"/Logo.png"}
            alt="Logo"
            width={100}
            height={100}
            className="h-9 w-auto rounded-md"
          />
        </Link>
      </nav>
    </header>
  )
}

export default Header