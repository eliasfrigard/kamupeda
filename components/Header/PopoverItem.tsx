"use client"; // Client Component

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

import { ChevronDownIcon } from "@heroicons/react/20/solid";
import type { NavItem } from "../NavMap";
import { normalizeSlug } from "../../utils/normalizeSlug";

export type PageChild = {
  icon: string;
  title: string;
  description: string;
};

export type CallToAction = {
  name: string;
  href: string;
};

// Helper function to transform `NavItem` to `PageChild`
const pagesToItems = (pages: NavItem[]): PageChild[] => {
  return pages?.map((page) => ({
    icon: page.icon, // Update this logic to fetch icons if necessary
    title: page.title,
    description: "", // Placeholder or fetched description
  }));
};

const DisclosureButtonComponent = ({
  title,
  pages,
  parent,
  callsToAction = [],
}: {
  title: string;
  pages: NavItem[];
  parent: string;
  callsToAction?: CallToAction[];
}) => {
  const [items, setItems] = useState<PageChild[]>([]);

  const hasCallToAction = callsToAction.length > 0;
  const hasOneCallToAction = callsToAction.length === 1;

  useEffect(() => {
    const loadItems = async () => {
      const transformedItems = pagesToItems(pages);
      setItems(transformedItems);
    };

    loadItems();
  }, [pages]);

  return (
    <Popover className='relative'>
      {({ close }) => (
        <>
          <PopoverButton className='flex items-center gap-x-1 text-sm font-medium leading-6 -mr-3 outline-none'>
            {title}
            <ChevronDownIcon
              aria-hidden='true'
              className='h-5 w-5 flex-none text-gray-400'
            />
          </PopoverButton>
          <PopoverPanel
            transition
            className='absolute -left-16 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5 flex origin-top flex-col transition duration-150 ease-out data-[closed]:scale-95 data-[closed]:opacity-0'
          >
            <div className='p-4'>
              {items?.map((page) => (
                <div
                  key={page.title}
                  className='group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-accent-500 duration-150 text-gray-900 hover:text-white'
                >
                  <div className='flex h-11 w-11 flex-none items-center justify-center rounded-lg'>
                    {page.icon && (
                      <Image
                        src={page.icon}
                        alt={page.icon} // TODO: Use icon text
                        width={44}
                        height={44}
                      />
                    )}
                  </div>
                  <div className='flex-auto'>
                    <Link
                      onClick={() => close()}
                      href={`/${parent}/${normalizeSlug(page.title)}`}
                      className='block font-medium'
                    >
                      {page.title}
                      <span className='absolute inset-0' />
                    </Link>
                    <p className='mt-1 text-gray-600'>{page.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div
              className={`grid ${
                hasCallToAction && hasOneCallToAction
                  ? "grid-cols-1"
                  : "grid-cols-2"
              } divide-x divide-gray-900/5 bg-gray-50`}
            >
              {callsToAction &&
                callsToAction?.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => close()}
                    className='flex items-center justify-center gap-x-2.5 p-3 text-sm font-medium leading-6 text-gray-900 hover:bg-accent-500 hover:text-white duration-100'
                  >
                    {item.name}
                  </Link>
                ))}
            </div>
          </PopoverPanel>
        </>
      )}
    </Popover>
  );
};

export default DisclosureButtonComponent;
