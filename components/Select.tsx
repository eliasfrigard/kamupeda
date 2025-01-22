"use client";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

export default function Select({
  options,
  selected,
  setSelected,
  placeholder = "Select an option",
  className,
}: {
  options: string[];
  selected: string;
  setSelected: (value: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className={`relative ${className}`}>
        {/* Button */}
        <ListboxButton className='relative w-full h-10 cursor-pointer rounded-lg bg-white py-2 pl-1 pr-10 text-left text-black shadow ring-1 ring-black/10 focus:outline-none focus:ring-2 focus:ring-primary-400 sm:text-sm transition-transform duration-200 active:scale-100'>
          <span className='flex items-center'>
            {selected ? (
              <span className='ml-3 block truncate'>{selected}</span>
            ) : (
              <span className='ml-3 block truncate opacity-50'>
                {placeholder}
              </span>
            )}
          </span>
          <span className='pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2'>
            <ChevronUpDownIcon
              aria-hidden='true'
              className='size-5 text-white/60 group-hover:text-white transition-colors'
            />
          </span>
        </ListboxButton>

        {/* Options */}
        <ListboxOptions className='absolute mt-2 w-full max-h-56 overflow-auto rounded-lg bg-white py-1 text-base text-black shadow-lg ring-1 ring-primary-500 focus:outline-none sm:text-sm z-50'>
          {options?.map((option) => (
            <ListboxOption
              key={option}
              value={option}
              className='group relative cursor-pointer select-none py-2 pl-4 pr-9 hover:bg-primary-500 focus:bg-primary-500 transition-colors ease-in-out hover:text-white'
            >
              <div className='flex items-center'>
                <span className='ml-3 block truncate font-normal group-data-[selected]:font-semibold'>
                  {option}
                </span>
              </div>
              <span className='absolute inset-y-0 right-0 flex items-center pr-4 text-transparent group-data-[selected]:text-primary-500 group-data-[focus]:text-white'>
                <CheckIcon aria-hidden='true' className='size-5' />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
