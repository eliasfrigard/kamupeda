"use client";

import React, { useState } from "react";
import useStickyState from "../../hooks/useStickyState";
import { PiMusicNoteSimpleFill } from "react-icons/pi";

import Material from "../Material";
import type { Entry } from "contentful";
import type { MaterialSkeleton } from "@/types";
import { searchMaterialData } from "@/utils/contentful";
import { getContentType } from "@/utils/management";
import { IoFilterSharp } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import Select from "@/components/Select";
import IconButton from "@/components/IconButton";
import Chip from "@/components/Chip";

const Search: React.FC = () => {
  const [query, setQuery] = useState("");
  const [material, setMaterial] = useState<Entry<MaterialSkeleton>[]>([]);

  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useStickyState(false, "filtersOpen");

  const [keyValues, setKeyValues] = useState([]);
  const [modeValues, setModeValues] = useState([]);
  const [timeSignatureValues, setTimeSignatureValues] = useState([]);
  const [difficultyValues, setDifficultyValues] = useState([]);
  const [instrumentValues, setInstrumentValues] = useState([]);
  const [styleValues, setStyleValues] = useState([]);
  const [originValues, setOriginValues] = useState([]);
  const [ensembleValues, setEnsembleValues] = useState([]);

  const [filterIsSelected, setFilterIsSelected] = useState(false);
  console.log("🚀 || Blog || filterIsSelected:", filterIsSelected);

  // Filters state
  const [filters, setFilters] = useState({
    key: "",
    mode: "",
    timeSignature: "",
    difficulty: "",
    instrument: "",
    style: "",
    origin: "",
    ensemble: "",
  });

  React.useEffect(() => {
    const hasFilter = Object.values(filters).some((filter) => !!filter);
    setFilterIsSelected(hasFilter || !!query);
  }, [filters, query]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getContentType("material");

        const keyField = data.fields.find((field) => field.id === "key");
        const modeField = data.fields.find((field) => field.id === "mode");
        const timeSignatureField = data.fields.find(
          (field) => field.id === "timeSignature"
        );
        const difficultyField = data.fields.find(
          (field) => field.id === "difficulty"
        );
        const instrumentField = data.fields.find(
          (field) => field.id === "instrument"
        );

        const styleField = data.fields.find((field) => field.id === "style");
        const originField = data.fields.find((field) => field.id === "origin");
        const ensembleField = data.fields.find(
          (field) => field.id === "ensemble"
        );

        setKeyValues(keyField?.validations[0]?.in);
        setModeValues(modeField?.validations[0]?.in);
        setTimeSignatureValues(timeSignatureField?.validations[0]?.in);
        setDifficultyValues(difficultyField?.validations[0]?.in);
        setInstrumentValues(instrumentField?.validations[0]?.in);
        setOriginValues(originField?.validations[0]?.in);
        setStyleValues(styleField?.validations[0]?.in);
        setEnsembleValues(ensembleField?.validations[0]?.in);
      } catch (error) {
        console.error("Error fetching material data:", error);
      }
    };

    fetchData();
  }, []);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(handler);
  }, [query]);

  React.useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const data = await searchMaterialData({
          searchQuery: debouncedQuery.trim(),
          filters,
        });
        setMaterial(data);
      } catch (error) {
        console.error("Error fetching material data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedQuery, filters]);

  const handleFilterChange = (filterKey: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: value,
    }));
  };

  const resetSearch = () => {
    setQuery("");
    setFilters({
      key: "",
      mode: "",
      timeSignature: "",
      difficulty: "",
      instrument: "",
      style: "",
      origin: "",
      ensemble: "",
    });
  };

  return (
    <div className='container mx-auto flex flex-col gap-6 px-6 lg:px-0'>
      <div className='flex flex-col'>
        <div className='relative flex items-center gap-2'>
          <input
            type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Hae materiaalia...'
            className='w-full h-12 px-5 text-black placeholder-black/50 bg-white rounded-full shadow-inner focus:outline-none focus:ring-2 focus:ring-accent-500 ring-primary-700/10 ring-1 transition-all duration-300'
          />
          <IconButton
            icon={<IoFilterSharp />}
            className='flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-full shadow-lg hover:scale-105 active:scale-95 focus:ring-2 focus:ring-accent-500 transition-transform duration-300'
            onClick={() => setFiltersOpen(!filtersOpen)}
          />
          <IconButton
            icon={<FaRegTrashAlt />}
            className='flex items-center justify-center w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 text-white rounded-full shadow-lg hover:scale-105 active:scale-95 focus:ring-2 focus:ring-accent-500 transition-transform duration-300'
            onClick={() => resetSearch()}
          />
        </div>

        {/* Filter options */}

        <div
          className={`grid lg:grid-cols-3 gap-4 mx-3 bg-opacity-80 transition-all duration-200 ease-in-out ${
            filtersOpen
              ? "max-h-screen opacity-100 mt-6"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <Select
            selected={filters.key}
            setSelected={(value) => handleFilterChange("key", value)}
            options={keyValues}
            placeholder='Perussävel'
          />
          <Select
            selected={filters.mode}
            setSelected={(value) => handleFilterChange("mode", value)}
            options={modeValues}
            placeholder='Asteikko'
          />
          <Select
            selected={filters.timeSignature}
            setSelected={(value) => handleFilterChange("timeSignature", value)}
            options={timeSignatureValues}
            placeholder='Tahtilaji'
          />
          <Select
            selected={filters.difficulty}
            setSelected={(value) => handleFilterChange("difficulty", value)}
            options={difficultyValues}
            placeholder='Vaikeustaso'
          />
          <Select
            selected={filters.instrument}
            setSelected={(value) => handleFilterChange("instrument", value)}
            options={instrumentValues}
            placeholder='Soitin'
          />
          <Select
            selected={filters.style}
            setSelected={(value) => handleFilterChange("style", value)}
            options={styleValues}
            placeholder='Tyyli'
          />
          <Select
            selected={filters.origin}
            setSelected={(value) => handleFilterChange("origin", value)}
            options={originValues}
            placeholder='Alkuperämaa'
          />
          <Select
            selected={filters.ensemble}
            setSelected={(value) => handleFilterChange("ensemble", value)}
            options={ensembleValues}
            placeholder='Yhteissoiton vaikeustaso'
          />
        </div>
      </div>

      {/* Selected Filter Chips */}
      <div className='flex flex-wrap gap-2'>
        {Object.entries(filters)?.map(([key, value]) => {
          if (!value) return null;

          return (
            <Chip key={key} onDelete={() => handleFilterChange(key, "")}>
              {key === "difficulty"
                ? Array.from({ length: parseInt(value) }, (_, i) => (
                    <PiMusicNoteSimpleFill key={i} className='text-xl' />
                  ))
                : value}
            </Chip>
          );
        })}
      </div>

      <Material loading={loading} materialWithInfo={material} />
    </div>
  );
};

export default Search;
