import React, { useState } from 'react'
import { DisclosureSkeleton } from '@/types'
import Disclosure from './Disclosure'
import TextLayout from './TextLayout'

interface DisclosureGroupProps {
  disclosures: DisclosureSkeleton[]
}

const DisclosureGroup: React.FC<DisclosureGroupProps> = ({ disclosures }) => {
  return (
    <div className='rounded-xl overflow-hidden flex flex-col'>
      {
        disclosures.map((disclosure, i) => {
          return (
            <>
              <Disclosure title={disclosure.fields.title} defaultOpen={false} className="rounded-none" rounded={false}>
                <TextLayout className="" key={disclosure.sys.id} text={disclosure.fields.textContent} />
              </Disclosure>
              {i < disclosures.length - 1 && <hr className='w-full border border-black/5' />}
            </>
          )
        })
      }
    </div>
  );
};

export default DisclosureGroup