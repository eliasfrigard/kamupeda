"use client";

import DisclosureButtonComponent from "./DisclosureButton";
import PopoverItem from "./PopoverItem";
import Hamburger from "../Hamburger";
import Link from "next/link";
import type { NavItem } from "../NavMap";
import { dancingScript } from "@/app/fonts";

import { useState } from "react";
import { Dialog, DialogPanel, PopoverGroup } from "@headlessui/react";
import { normalizeSlug } from "../../utils/normalizeSlug";
import Divider from "../Divider";
import { copyright, creator } from "@/utils/texts";
import { usePathname } from "next/navigation";

const materialCallsToAction = [
  {
    name: "Lataa Kamutaito 1",
    href: "https://assets.ctfassets.net/nqeymplwbzvw/5kedhcDhw5FiOuhwx2YzXf/4d37715f2c09eed8d1e2d09dfd75860e/KAMUTAITO_I_pdf.pdf",
  },
];

export default function Example({
  height,
  navMap,
}: {
  height: number;
  navMap: NavItem[];
}) {
  const currentPath = usePathname();

  const isActive = (page: string) => {
    const normalizedPageSlug = normalizeSlug(page);
    return currentPath.includes(normalizedPageSlug);
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className={`bg-gradient-to-r from-primary-700 to-primary-800 lg:from-primary-600/95 lg:to-primary-800/95 text-white backdrop-blur-lg w-full fixed z-30 shadow-lg lg:bg-opacity-90 duration-100 ${
        mobileMenuOpen ? "shadow-none" : "shadow-lg"
      }`}
      style={{ height: height + "px" }}
    >
      <nav
        aria-label='Global'
        className='flex mx-auto h-full max-w-7xl items-center justify-between p-6 lg:px-8 tracking-wide'
      >
        <div className='flex lg:flex-1'>
          <Link href='/' className='-m-1.5 p-1.5'>
            <span
              className={`text-3xl drop-shadow text-secondary-400 font-mont ${dancingScript.className}`}
            >
              kamupeda.fi
            </span>
          </Link>
        </div>
        <div className='flex lg:hidden'>
          <Hamburger
            active={mobileMenuOpen}
            handleClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          />
        </div>
        <PopoverGroup className='hidden lg:flex lg:gap-x-7'>
          {navMap?.map((page) => {
            const normalizedPageSlug = normalizeSlug(page.title);
            const activePath = isActive(page.title);

            if (page?.children?.length) {
              return (
                <PopoverItem
                  key={normalizedPageSlug}
                  title={page.title}
                  pages={page.children}
                  parent={normalizedPageSlug}
                  callsToAction={
                    normalizedPageSlug === "materiaalit"
                      ? materialCallsToAction
                      : undefined
                  }
                />
              );
            }

            return (
              <Link
                key={normalizedPageSlug}
                href={"/" + normalizedPageSlug}
                className={`text-sm font-medium leading-6 ${
                  activePath
                    ? "text-accent-500 font-semibold"
                    : "text-secondary-400"
                } hover:text-accent-500 duration-100`}
              >
                {page.title}
              </Link>
            );
          })}
        </PopoverGroup>
        <div className='hidden lg:flex lg:flex-1 lg:justify-end'></div>
      </nav>

      {/* Mobile menu */}

      <Dialog
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        transition
        className='lg:hidden fixed inset-0 flex w-screen items-center justify-center  transition duration-300 ease-out data-[closed]:opacity-0 z-50'
      >
        <DialogPanel className='px-6 fixed top-[84px] inset-y-0 right-0 z-10 w-full overflow-y-auto bg-gradient-to-r from-primary-700 to-primary-800 text-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
          <div className='mt-3 flow-root'>
            <div className='space-y-2 pb-6 pt-3'>
              {navMap?.map((page) => {
                const normalizedPageSlug = normalizeSlug(page.title);

                if (page?.children?.length) {
                  return (
                    <DisclosureButtonComponent
                      key={normalizedPageSlug}
                      title={page.title}
                      parent={normalizedPageSlug}
                      pages={page.children}
                      textColor='text-white'
                      handleOnClick={() => setMobileMenuOpen(false)}
                    />
                  );
                }

                return (
                  <Link
                    onClick={() => setMobileMenuOpen(false)}
                    key={normalizedPageSlug}
                    href={normalizedPageSlug}
                    className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-accent-500 lg:hover:bg-gray-50'
                  >
                    {page.title}
                  </Link>
                );
              })}
            </div>
            <Divider />

            <div className='flex flex-col gap-2 py-4 opacity-60'>
              <p className='text-sm font-semibold'>{copyright()}</p>
              <p className='text-xs font-medium'>{creator}</p>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
