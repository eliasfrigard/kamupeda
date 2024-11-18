'use client';

import React, { useState, useEffect } from 'react';
import Material from './material';
import { searchMaterialData } from '@/utils/contentful';

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
});

export default function Blog() {
  const [query, setQuery] = useState('')
  const [material, setMaterial] = useState([])
  const [debouncedQuery, setDebouncedQuery] = useState(query)
  const [loading, setLoading] = useState(true)

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
        const data = await searchMaterialData(debouncedQuery.trim())
        setMaterial(data.map(materialInfo))

      } catch (error) {
        console.error('Error fetching material data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [debouncedQuery])

  return (
    <div className='container mx-auto flex flex-col gap-8'>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for material..."
        className="border p-2 rounded-md w-full"
      />

      <Material loading={loading} materialWithInfo={material} />
    </div>
  );
}
