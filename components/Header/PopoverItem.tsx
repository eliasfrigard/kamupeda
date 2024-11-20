'use client'

import Image from 'next/image'

import {
  Popover,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/react'

import { ChevronDownIcon } from '@heroicons/react/20/solid'

type PageChild = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any,
  title: string,
  description: string,
}

const DisclosureButtonComponent = ({
  title,
  pages,
  callsToAction
} : {
  title: string,
  pages: PageChild[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callsToAction: any[]
}) => {
  return (
    <Popover className="relative">
      <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
        {title}
        <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
      </PopoverButton>

      <PopoverPanel
        transition
        className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="p-4">
          {pages.map((page) => (
            <div
              key={page.title}
              className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
            >
              <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                {
                  page.icon?.fields.file.url && (
                    <Image src={`https:${page.icon.fields.file.url}`} alt={page.icon.fields.title} width={44} height={44} />
                  )
                }
                {/* <page.icon aria-hidden="true" className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" /> */}
              </div>
              <div className="flex-auto">
                <a href={page.title} className="block font-semibold text-gray-900">
                  {page.title}
                  <span className="absolute inset-0" />
                </a>
                <p className="mt-1 text-gray-600">{page.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
          {callsToAction.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
            >
              {/* <item.icon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" /> */}
              {item.name}
            </a>
          ))}
        </div>
      </PopoverPanel>
    </Popover>
  )
}

export default DisclosureButtonComponent
