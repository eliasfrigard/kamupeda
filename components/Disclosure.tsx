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
    <div className="mx-auto overflow-hidden w-full divide-y divide-black/5 rounded-xl bg-black/5">
      <Disclosure as="div" defaultOpen={true}>
        <DisclosureButton className="p-6 group flex w-full items-center justify-between hover:bg-gray-300 bg-gray-100 duration-200">
          <span className="text-sm/6 font-semibold tracking-wide text-black group-data-[hover]:text-black/80">
            {title}
          </span>
          <ChevronDownIcon className="size-5 fill-black/60 group-data-[hover]:fill-black/50 group-data-[open]:rotate-180" />
        </DisclosureButton>
        <DisclosurePanel className="p-6 text-sm/5 text-black/50">
          {children}
        </DisclosurePanel>
      </Disclosure>
    </div>
  )
}