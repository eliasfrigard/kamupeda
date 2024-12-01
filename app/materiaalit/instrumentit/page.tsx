'use client'

import React, { useState, useEffect } from 'react'
import Material from '../material'
import type { Entry } from 'contentful'
import type { MaterialSkeleton } from '@/types'
import { searchMaterialData } from '@/utils/contentful'
import { getContentType } from '@/utils/management'
import { IoFilterSharp } from "react-icons/io5"
import { FaRegTrashAlt } from "react-icons/fa"
import Select from '@/components/Select'
import IconButton from '@/components/IconButton'

export default function Blog() {
  const [query, setQuery] = useState('')
  const [material, setMaterial] = useState<Entry<MaterialSkeleton>[]>([])
  const [debouncedQuery, setDebouncedQuery] = useState(query)
  const [loading, setLoading] = useState(true)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const [keyValues, setKeyValues] = useState([])
  const [modeValues, setModeValues] = useState([])
  const [difficultyValues, setDifficultyValues] = useState([])
  const [instrumentValues, setInstrumentValues] = useState([])
  const [styleValues, setStyleValues] = useState([])
  const [originValues, setOriginValues] = useState([])

  const [filterIsSelected, setFilterIsSelected] = useState(false)
  console.log('🚀 || Blog || filterIsSelected:', filterIsSelected)

  // Filters state
  const [filters, setFilters] = useState({
    key: '',
    mode: '',
    difficulty: '',
    instrument: '',
    style: '',
    origin: '',
    forEnsemble: '',
  })

  useEffect(() => {
    const hasFilter = Object.values(filters).some((filter) => !!filter)
    setFilterIsSelected(hasFilter || !!query)
  }, [filters, query])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getContentType('material')

        const keyField = data.fields.find((field) => field.id === 'key')
        const modeField = data.fields.find((field) => field.id === 'mode')
        const difficultyField = data.fields.find((field) => field.id === 'difficulty')
        const instrumentField = data.fields.find((field) => field.id === 'instrument')

        const styleField = data.fields.find((field) => field.id === 'style')
        const originField = data.fields.find((field) => field.id === 'origin')

        setKeyValues(keyField?.validations[0]?.in)
        setModeValues(modeField?.validations[0]?.in)
        setDifficultyValues(difficultyField?.validations[0]?.in)
        setInstrumentValues(instrumentField?.validations[0]?.in)
        setOriginValues(originField?.validations[0]?.in)
        setStyleValues(styleField?.validations[0]?.in)
      } catch (error) {
        console.error('Error fetching material data:', error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query)
    }, 500)

    return () => clearTimeout(handler)
  }, [query])

  useEffect(() => {
    setLoading(true)
    
    const fetchData = async () => {
      try {
        const data = await searchMaterialData({
          searchQuery: debouncedQuery.trim(),
          filters,
        })
        setMaterial(data)
      } catch (error) {
        console.error('Error fetching material data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [debouncedQuery, filters])

  const handleFilterChange = (filterKey: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: value,
    }))
  }

  const resetSearch = () => {
    setQuery('')
    setFilters({
      key: '',
      mode: '',
      difficulty: '',
      instrument: '',
      style: '',
      origin: '',
      forEnsemble: '',
    })
  }

  return (
    <div className='container mx-auto flex flex-col gap-8 px-6 lg:px-0'>
      <div className='flex flex-col'>
        <div className="relative flex items-center gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Hae materiaalia..."
            className="border text-black p-3 px-4 rounded-md shadow w-full h-12"
          />
          <IconButton 
            icon={<IoFilterSharp />} 
            className='bg-primary-500'
            onClick={() => setFiltersOpen(!filtersOpen)} 
          />
          <IconButton 
            icon={<FaRegTrashAlt />} 
            className='bg-accent-500'
            onClick={() => resetSearch()}
          />
        </div>
        
        {/* Filter options */}

        <div
          className={`grid grid-cols-2 gap-4 bg-accent-800 bg-opacity-80 rounded-md shadow-md transition-all duration-200 ease-in-out ${filtersOpen ? 'max-h-screen opacity-100 mt-4 pt-7 pb-10 px-8' : 'max-h-0 opacity-0 overflow-hidden'}`}
        >
          <Select
            selected={filters.key}
            setSelected={(value) => handleFilterChange('key', value)}
            options={keyValues}
            placeholder='Valitse Perussävel'
          />
          <Select
            selected={filters.mode}
            setSelected={(value) => handleFilterChange('mode', value)}
            options={modeValues}
            placeholder='Valitse Asteikko'
          />
          <Select
            selected={filters.difficulty}
            setSelected={(value) => handleFilterChange('difficulty', value)}
            options={difficultyValues}
            placeholder='Valitse Vaikeustaso'
          />
          <Select
            selected={filters.instrument}
            setSelected={(value) => handleFilterChange('instrument', value)}
            options={instrumentValues}
            placeholder='Valitse Soitin'
          />
          <Select
            selected={filters.style}
            setSelected={(value) => handleFilterChange('style', value)}
            options={styleValues}
            placeholder='Valitse Tyyli'
          />
          <Select
            selected={filters.origin}
            setSelected={(value) => handleFilterChange('origin', value)}
            options={originValues}
            placeholder='Valitse Alkuperämaa'
          />
          <Select
            selected={filters.forEnsemble}
            setSelected={(value) => handleFilterChange('forEnsemble', value)}
            options={['Kyllä', 'Ei']}
            placeholder='Yhteissoittoon'
          />
        </div>
      </div>

      <Material loading={loading} materialWithInfo={material} />
    </div>
  )
}
