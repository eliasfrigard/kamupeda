"use client";

import Material from "@/components/Material";
import type { Entry } from "contentful";
import type { MaterialSkeleton } from "@/types";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";

import { FaChevronUp } from "react-icons/fa";

type InstrumentSectionProps = {
  category: string;
  materials: Entry<MaterialSkeleton>[];
};

const InstrumentSection = ({ category, materials }: InstrumentSectionProps) => {
  console.log("🚀 || InstrumentSection || materials:", materials.length);
  return (
    <Disclosure defaultOpen={false}>
      {({ open }) => (
        <>
          <DisclosureButton className='flex flex-col'>
            <div className='w-full flex items-center justify-between py-4 px-2'>
              <div className='flex justify-center items-center gap-3'>
                <h3 className='text-2xl text-primary-700 font-semibold tracking-wide'>
                  {category}
                </h3>
                <div className='h-6 aspect-square shadow rounded-full text-sm flex justify-center items-center bg-gradient-to-r from-accent-500 to-accent-500'>
                  <p>{materials.length}</p>
                </div>
              </div>
              <FaChevronUp
                className={`text-2xl text-primary-700 transition-transform duration-300 ease-in-out transform ${
                  !open ? "rotate-180" : ""
                }`}
              />
            </div>
            <div className='h-[1px] w-full bg-gradient-to-r from-primary-600 to-accent-600 opacity-20 rounded-full' />
          </DisclosureButton>
          <DisclosurePanel
            transition
            className='origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0'
          >
            <Material materialWithInfo={materials} loading={false} />
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
};

export default InstrumentSection;
