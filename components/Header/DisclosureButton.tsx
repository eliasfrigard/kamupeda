'use client'

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'

import Link from 'next/link'
import { NavItem } from '../NavMap'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { normalizeSlug } from '@/utils/normalizeSlug'

const DisclosureButtonComponent = ({
  title,
  parent,
  pages,
  textColor = 'text-gray-900',
} : {
  title: string
  parent: string
  pages: NavItem[]
  textColor: string
}) => {
  console.log('🚀 || pages:', pages)
  return (
    <Disclosure as="div" className="-mx-3">
      <DisclosureButton className={`group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 hover:bg-accent-500 lg:hover:bg-gray-50 ${textColor}`}>
        {title}
        <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none group-data-[open]:rotate-180" />
      </DisclosureButton>
      <DisclosurePanel
        className="mt-2 space-y-2 origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0"
        transition
      >
        {[...pages].map((item) => (
          <DisclosureButton
            key={item.title}
            as={Link}
            href={`/${parent}/${normalizeSlug(item.title)}`}
            className={`block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 ${textColor} hover:bg-gray-50`}
          >
            {item.title}
          </DisclosureButton>
        ))}
      </DisclosurePanel>
    </Disclosure>
  )
}

export default DisclosureButtonComponent
