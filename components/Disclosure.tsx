import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

export default function Example({
  title,
  children,
  defaultOpen = true,
  className = '',
  rounded = true
} : {
  title: string,
  children: React.ReactNode
  defaultOpen?: boolean
  className?: string
  rounded?: boolean
}) {
  return (
    <div className={`mx-auto overflow-hidden w-full divide-y divide-black/5 bg-primary-500/5 text-white shadow ${className} ${rounded ? 'rounded-xl' : 'rounded-none'}`}>
      <Disclosure as="div" defaultOpen={defaultOpen}>
        <DisclosureButton className="p-4 group flex w-full items-center justify-between bg-gradient-to-br from-primary-500 to-primary-700 hover:bg-primary-600 duration-100">
          <span className="text-sm/6 font-semibold tracking-wide">
            {title}
          </span>
          <ChevronDownIcon className="size-6 fill-white/60 group-data-[hover]:fill-white group-data-[open]:rotate-180" />
        </DisclosureButton>
        <DisclosurePanel
          transition
          className="p-6 text-sm/5 text-black/50 origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0"
        >
          {children}
        </DisclosurePanel>
      </Disclosure>
    </div>
  )
}