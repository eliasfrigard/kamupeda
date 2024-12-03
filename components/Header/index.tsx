'use client'

import DisclosureButtonComponent from './DisclosureButton'
import PopoverItem from './PopoverItem'
import Hamburger from '../Hamburger'
import Link from 'next/link'
import type { NavItem } from '../NavMap'
import { dancingScript } from '@/app/fonts'

import { useState } from 'react'
import {
  Dialog,
  DialogPanel,
  PopoverGroup,
} from '@headlessui/react'
import { PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import { normalizeSlug } from '../../utils/normalizeSlug';

const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
]

export default function Example({
  slug,
  height,
  navMap
} : {
  slug: string
  height: number
  navMap: NavItem[]
}) {
  const isActive = (page: string) => {
    const normalizedPageSlug = normalizeSlug(page)
    return normalizedPageSlug === slug
  }
  isActive('Koti')

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header
      className={`bg-gradient-to-br from-primary-600 to-primary-700 text-white backdrop-blur-lg w-full fixed z-30 shadow-lg lg:bg-opacity-95 duration-100 ${mobileMenuOpen ? 'shadow-none' : 'shadow-lg'}`}
      style={{ height: height + 'px' }}
    >
      <nav aria-label="Global" className="flex mx-auto h-full max-w-7xl items-center justify-between p-6 lg:px-8 tracking-wide">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className={`text-3xl drop-shadow font-mont ${dancingScript.className}`}>kamupeda.fi</span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <Hamburger active={mobileMenuOpen} handleClick={() => setMobileMenuOpen(!mobileMenuOpen)} />
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-10">
          {
            navMap.map((page) => {
              const normalizedPageSlug = normalizeSlug(page.title)

              if (page?.children?.length) {
                return (
                  <PopoverItem key={normalizedPageSlug} title={page.title} pages={page.children} parent={normalizedPageSlug} callsToAction={callsToAction} />
                )
              }

              return (
                <Link
                  key={normalizedPageSlug}
                  href={'/' + normalizedPageSlug}
                  className="text-sm font-medium leading-6"
                >
                  {page.title}
                </Link>
              )
            })
          }
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        </div>
      </nav>

      {/* Mobile menu */}

      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        transition
        className="lg:hidden fixed inset-0 flex w-screen items-center justify-center bg-black/30 transition duration-300 ease-out data-[closed]:opacity-0 z-50"
      >
        <DialogPanel className="px-6 fixed top-[84px] inset-y-0 right-0 z-10 w-full overflow-y-auto bg-primary-800 text-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {
                  navMap.map((page) => {
                    const normalizedPageSlug = normalizeSlug(page.title)

                    if (page?.children?.length) {
                      return (
                        <DisclosureButtonComponent
                          key={normalizedPageSlug}
                          title={page.title}
                          parent={normalizedPageSlug}
                          pages={page.children}
                          textColor="text-white"
                        />
                      )
                    }

                    return (
                      <Link
                        key={normalizedPageSlug}
                        href={normalizedPageSlug}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-accent-500 lg:hover:bg-gray-50"
                      >
                        {page.title}
                      </Link>
                    )
                  })
                }
              </div>
              <div className="py-6">
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
