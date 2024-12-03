'use client'

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'

import { NavItem } from '../NavMap'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const DisclosureButtonComponent = ({
  pages,
  textColor = 'text-gray-900',
} : {
  pages: NavItem[]
  textColor: string
}) => {
  return (
    <Disclosure as="div" className="-mx-3">
      <DisclosureButton className={`group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 hover:bg-accent-500 lg:hover:bg-gray-50 ${textColor}`}>
        Product
        <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none group-data-[open]:rotate-180" />
      </DisclosureButton>
      <DisclosurePanel
        className="mt-2 space-y-2 origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0"
        transition
      >
        {[...pages].map((item) => (
          <DisclosureButton
            key={item.href}
            as="a"
            href={item.href}
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
