import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

export default function Example({ 
  title,
  children
} : {
  title: string,
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto overflow-hidden w-full divide-y divide-black/5 rounded-xl bg-black/5 text-white">
      <Disclosure as="div" defaultOpen={true}>
        <DisclosureButton className="p-4 group flex w-full items-center justify-between hover:bg-primary-600 bg-primary-500 duration-100">
          <span className="text-sm/6 font-semibold tracking-wide">
            {title}
          </span>
          <ChevronDownIcon className="size-6 fill-white/60 group-data-[hover]:fill-white group-data-[open]:rotate-180" />
        </DisclosureButton>
        <DisclosurePanel className="p-6 text-sm/5 text-black/50">
          {children}
        </DisclosurePanel>
      </Disclosure>
    </div>
  )
}