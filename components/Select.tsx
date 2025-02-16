"use client";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { PiMusicNoteSimpleFill } from "react-icons/pi";

export type SelectOption = { label: string; value: string };

export default function Select({
  options,
  selected,
  setSelected,
  placeholder = "Select an option",
  className,
  colorOnSelected,
}: {
  options: SelectOption[] | (string | number)[];
  selected: string;
  setSelected: (value: string) => void;
  placeholder?: string;
  className?: string;
  colorOnSelected?: boolean;
}) {
  const normalizedOptions: SelectOption[] = options.map((option) =>
    typeof option === "string" || typeof option === "number"
      ? { label: option, value: option }
      : option
  );

  const selectedLabel = normalizedOptions.find(
    (option) => option.value === selected
  )?.label;

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className={`relative ${className}`}>
        {/* Button */}
        <ListboxButton
          className={`relative w-full h-10 cursor-pointer rounded-lg py-2 pl-1 pr-10 text-left shadow ring-1 ring-primary-700/10 focus:outline-none focus:ring-2 focus:ring-accent-500 sm:text-sm transition-transform duration-150 active:scale-100 ${
            selected && colorOnSelected
              ? "bg-accent-500 text-white font-bold"
              : "bg-white text-black"
          }`}
        >
          <span className='flex items-center'>
            {selected ? (
              <span className='ml-3 block truncate'>{selectedLabel}</span>
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

        <ListboxOptions className='absolute mt-2 w-full max-h-56 overflow-auto rounded-lg bg-white py-1 text-base text-black shadow-lg ring-1 ring-primary-700/10 focus:outline-none sm:text-sm z-50'>
          {normalizedOptions?.map((option) => (
            <ListboxOption
              key={option.label}
              value={option.value}
              className='group relative cursor-pointer select-none py-2 pl-4 pr-9 hover:bg-primary-500 focus:bg-primary-500 transition-colors ease-in-out hover:text-white'
            >
              <div className='flex items-center'>
                {placeholder === "Vaikeustaso" ? (
                  <span className='truncate py-1 font-normal group-data-[selected]:font-semibold flex'>
                    {Array.from({ length: parseInt(option.value) }, (_, i) => (
                      <PiMusicNoteSimpleFill
                        key={i}
                        className='text-accent-500 text-xl'
                      />
                    ))}
                  </span>
                ) : (
                  <span className='py-1 block truncate font-normal group-data-[selected]:font-semibold'>
                    {option.label}
                  </span>
                )}
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
