"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";

import Image from "next/image";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import Link from "next/link";
import Divider from "../Divider";
import { NavItem } from "../NavMap";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { normalizeSlug } from "@/utils/normalizeSlug";
import { FaArrowRight } from "react-icons/fa";

import { pagesToItems } from "./PopoverItem";
import type { PageChild } from "./PopoverItem";

const DisclosureButtonComponent = ({
  title,
  parent,
  pages,
  textColor = "text-gray-900",
  handleOnClick,
}: {
  title: string;
  parent: string;
  pages: NavItem[];
  textColor: string;
  handleOnClick?: () => void;
}) => {
  const [items, setItems] = useState<PageChild[]>([]);

  const pathname = usePathname();

  useEffect(() => {
    const loadItems = async () => {
      const transformedItems = pagesToItems(pages);
      setItems(transformedItems);
    };

    loadItems();
  }, [pages]);

  return (
    <Disclosure as='div' className='-mx-3'>
      <DisclosureButton
        className={`group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 hover:bg-accent-500 lg:hover:bg-gray-50 ${textColor}`}
      >
        {title}
        <ChevronDownIcon
          aria-hidden='true'
          className='h-5 w-5 flex-none group-data-[open]:rotate-180'
        />
      </DisclosureButton>
      <DisclosurePanel
        className='mt-2 space-y-2 origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0'
        transition
      >
        {[...items]?.map((item) => (
          <DisclosureButton
            onClick={handleOnClick}
            key={item.title}
            as={Link}
            href={`/${parent}/${normalizeSlug(item.title)}`}
            className={`flex items-center gap-3 text-accent-500 rounded-lg py-1.5 pl-4 pr-3 text-sm font-semibold leading-7 ${textColor} hover:bg-accent-500`}
          >
            {item.icon ? (
              <Image
                src={item.icon}
                alt={item.icon} // TODO: Use icon text
                width={30}
                height={30}
              />
            ) : (
              <FaArrowRight className='text-xs inline-block' />
            )}
            {item.title}
          </DisclosureButton>
        ))}
        <div className='w-full px-4'>
          <Divider />
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default DisclosureButtonComponent;
