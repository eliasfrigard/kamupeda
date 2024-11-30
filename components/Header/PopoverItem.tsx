'use client'; // Client Component

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Asset } from 'contentful';

import {
  Popover,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import type { NavItem } from '../NavMap';
import { normalizeSlug } from '../../utils/normalizeSlug';

export type PageChild = {
  icon: Asset | undefined
  title: string
  description: string
}

export type CallToAction = {
  name: string
  href: string
}

// Helper function to transform `NavItem` to `PageChild`
const pagesToItems = (pages: NavItem[]): PageChild[] => {
  return pages.map((page) => ({
    icon: undefined, // Update this logic to fetch icons if necessary
    title: page.title,
    description: '', // Placeholder or fetched description
  }));
};

const DisclosureButtonComponent = ({
  title,
  pages,
  parent,
  callsToAction,
}: {
  title: string
  pages: NavItem[]
  parent: string
  callsToAction: CallToAction[]
}) => {
  const [items, setItems] = useState<PageChild[]>([])

  useEffect(() => {
    // Simulate fetching or transforming data
    const loadItems = async () => {
      const transformedItems = pagesToItems(pages);
      setItems(transformedItems);
    };

    loadItems();
  }, [pages]);

  return (
    <Popover className="relative">
      <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 -mr-3">
        {title}
        <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
      </PopoverButton>

      <PopoverPanel
        className="absolute -left-16 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5"
      >
        <div className="p-4">
          {items.map((page) => (
            <div
              key={page.title}
              className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
            >
              <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                {page.icon?.fields?.file?.url && (
                  <Image
                    src={`https:${page.icon.fields.file.url}`}
                    alt="call to action" // TODO: Use icon text.
                    width={44}
                    height={44}
                  />
                )}
              </div>
              <div className="flex-auto">
                <Link href={`/${parent}/${normalizeSlug(page.title)}`} className="block font-semibold text-gray-900">
                  {page.title}
                  <span className="absolute inset-0" />
                </Link>
                <p className="mt-1 text-gray-600">{page.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
          {callsToAction.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </PopoverPanel>
    </Popover>
  );
};

export default DisclosureButtonComponent;
