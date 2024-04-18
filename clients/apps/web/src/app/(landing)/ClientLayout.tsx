'use client'

import LogoIcon from '@/components/Brand/LogoIcon'
import LogoType from '@/components/Brand/LogoType'
import { StarOutlineOutlined } from '@mui/icons-material'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Button from 'polarkit/components/ui/atoms/button'
import { PropsWithChildren } from 'react'
import { AnimatedSeparator } from './page'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex w-full flex-col items-center dark:bg-gray-50 dark:text-gray-950">
      <div className="flex h-fit w-full max-w-[100vw] flex-row justify-stretch md:max-w-7xl">
        <AnimatedSeparator orientation="vertical" whileInView={false} />
        <div className="flex w-full flex-grow flex-col">
          <LandingPageTopbar />
          <AnimatedSeparator />
          {children}
          <LandingPageFooter />
        </div>
        <AnimatedSeparator orientation="vertical" whileInView={false} />
      </div>
    </div>
  )
}

const LandingPageTopbar = () => {
  return (
    <div className="flex flex-row items-center justify-between px-8 py-6">
      <LogoType width={80} />
      <div className="flex flex-row items-center gap-x-6">
        <Link href="https://github.com/polarsource/polar" target="_blank">
          <Button
            className="rounded-lg bg-blue-50 px-3 py-4"
            variant="secondary"
          >
            <div className="flex flex-row items-center gap-x-2">
              <StarOutlineOutlined fontSize="small" />
              <span>Star on GitHub</span>
            </div>
          </Button>
        </Link>
        <Link href="/login" className="text-blue-500 hover:text-blue-400">
          Login
        </Link>
      </div>
    </div>
  )
}

const LandingPageFooter = () => {
  return (
    <motion.div
      className="relative flex flex-col justify-between gap-6 bg-blue-500 px-6 py-6 text-white md:flex-row md:items-center md:px-12"
      initial="initial"
      variants={{ initial: { opacity: 0 }, animate: { opacity: 1 } }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      whileInView="animate"
      viewport={{ once: true }}
    >
      <LogoIcon className="-ml-2 h-10 w-10 text-white md:hidden" />
      <ul className="flex flex-row items-center gap-4">
        <li>
          <Link href="https://docs.polar.sh/faq">FAQ</Link>
        </li>
        <li>
          <Link href="https://docs.polar.sh">Docs</Link>
        </li>
        <li>
          <Link href="/polarsource">Blog</Link>
        </li>
        <li>
          <Link href="/careers">Careers</Link>
        </li>
        <li>
          <Link href="/legal/terms" target="_blank">
            Terms
          </Link>
        </li>
        <li>
          <Link href="/legal/privacy" target="_blank">
            Privacy
          </Link>
        </li>
      </ul>
      <LogoIcon className="absolute left-1/2 top-1/2 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 text-white md:block" />
      <div>© Polar Software Inc {new Date().getFullYear()}</div>
    </motion.div>
  )
}