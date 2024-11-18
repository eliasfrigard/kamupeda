'use client'

import React, { useState, useEffect } from 'react'
import Material from './material'
import { searchMaterialData } from '@/utils/contentful'
import { getContentType } from '@/utils/management'
import { IoFilterSharp } from "react-icons/io5"
import Select from '@/components/Select'

const materialInfo = (m) => ({
  id: m.sys.id,
  title: m.fields.title,
  difficulty: parseInt(m.fields.difficulty),
  instrument: m.fields.instrument,
  key: m.fields.key,
  mode: m.fields.mode,
  style: m.fields.style,
  origin: m.fields.origin,
  forEnsemble: m.fields.forEnsemble,
})

export default function Blog() {
  const [query, setQuery] = useState('')
  const [material, setMaterial] = useState([])
  const [debouncedQuery, setDebouncedQuery] = useState(query)
  const [loading, setLoading] = useState(true)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const [keyValues, setKeyValues] = useState([])
  const [modeValues, setModeValues] = useState([])
  const [difficultyValues, setDifficultyValues] = useState([])
  const [instrumentValues, setInstrumentValues] = useState([])
  const [styleValues, setStyleValues] = useState([])
  const [originValues, setOriginValues] = useState([])

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
    const fetchData = async () => {
      try {
        const data = await getContentType('material')
        console.log('🚀 || fetchData || data:', data.fields)

        const keyField = data.fields.find((field) => field.id === 'key')
        const modeField = data.fields.find((field) => field.id === 'mode')
        const difficultyField = data.fields.find((field) => field.id === 'difficulty')
        const instrumentField = data.fields.find((field) => field.id === 'instrument')

        const styleField = data.fields.find((field) => field.id === 'style')
        const originField = data.fields.find((field) => field.id === 'origin')

        setKeyValues(keyField.validations[0].in)
        setModeValues(modeField.validations[0].in)
        setDifficultyValues(difficultyField.validations[0].in)
        setInstrumentValues(instrumentField.validations[0].in)
        setOriginValues(originField.validations[0].in)
        setStyleValues(styleField.validations[0].in)
      } catch (error) {
        console.error('Error fetching material data:', error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query)
    }, 300)

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
        setMaterial(data.map(materialInfo))
      } catch (error) {
        console.error('Error fetching material data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [debouncedQuery, filters])

  const handleFilterChange = (filterKey, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: value,
    }))
  }

  return (
    <div className='container mx-auto flex flex-col gap-8 px-6 lg:px-0'>
      <div className='flex flex-col'>
        <div className="relative flex items-center gap-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for material..."
            className="border p-2 rounded-md w-full h-12"
          />
          <div 
            onClick={() => setFiltersOpen(!filtersOpen)} 
            className="h-12 aspect-square rounded-md border text-black bg-blue-500 flex justify-center items-center"
          >
            <IoFilterSharp className="text-2xl" />
          </div>
        </div>
        
        {/* Filter options */}
        <div
          className={`transition-all duration-200 ease-in-out ${filtersOpen ? 'max-h-screen opacity-100 mt-6' : 'max-h-0 opacity-0'}`}
        >
          <div className="bg-gray-100 shadow-md rounded-md gap-3 p-6 grid grid-cols-2">
            {/* Filters */}
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
      </div>

      <Material loading={loading} materialWithInfo={material} />
    </div>
  )
}
