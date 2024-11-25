'use client'

import DisclosureButtonComponent from './DisclosureButton'
import PopoverItem from './PopoverItem'
import Link from 'next/link'
import { navMap } from '../NavMap'

import { useState } from 'react'
import {
  Dialog,
  DialogPanel,
  PopoverGroup,
} from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import { normalizeSlug } from '../../utils/normalizeSlug';

const products = [
  { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
  { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
  { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
  { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
  { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
]
const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
]

export default function Example({ 
  slug,
  height
} : { 
  slug: string
  height: number
}) {
  const isActive = (page: string) => {
    const normalizedPageSlug = normalizeSlug(page)
    return normalizedPageSlug === slug
  }
  isActive('Koti')

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header
      className={`bg-primary-800 text-white backdrop-blur-lg w-full fixed z-20 shadow-lg bg-opacity-95`}
      style={{ height: height + 'px' }}
    >
        <nav aria-label="Global" className="mx-auto h-full flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="text-2xl font-mont">KamuPeda</span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
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
                  className="text-sm font-semibold leading-6"
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

      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/1024px-Tailwind_CSS_Logo.svg.png?20230715030042"
                className="h-8 w-auto"
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <DisclosureButtonComponent products={products} callsToAction={callsToAction} />
                {
                  navMap.map((page) => {
                    const normalizedPageSlug = normalizeSlug(page.title)

                    return (
                      <Link
                        key={normalizedPageSlug}
                        href={normalizedPageSlug}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
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
