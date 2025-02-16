"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import useStickyState from "../../hooks/useStickyState";
import { PiMusicNoteSimpleFill } from "react-icons/pi";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";

import type { Entry } from "contentful";
import type { MaterialSkeleton } from "@/types";

import Chip from "@/components/Chip";
import Select from "@/components/Select";
import Material from "@/components/Material";
import IconButton from "@/components/IconButton";
import GridListSelector from "@/components/GridListSelector";

import { getContentType } from "@/utils/management";
import { searchMaterialData } from "@/utils/contentful";

import { IoFilterSharp } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";

const Search: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const queryFromUrl = searchParams.get("search") || "";
  const filtersFromUrl = {
    key: searchParams.get("key") || "",
    mode: searchParams.get("mode") || "",
    timeSignature: searchParams.get("timeSignature") || "",
    difficulty: searchParams.get("difficulty") || "",
    instrument: searchParams.get("instrument") || "",
    style: searchParams.get("style") || "",
    origin: searchParams.get("origin") || "",
    ensemble: searchParams.get("ensemble") || "",
  };

  const [query, setQuery] = useState(queryFromUrl);
  const [filters, setFilters] = useState(filtersFromUrl);

  const [material, setMaterial] = useState<Entry<MaterialSkeleton>[]>([]);

  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [loading, setLoading] = useState(true);

  const [keyValues, setKeyValues] = useState<(string | number)[]>([]);
  const [modeValues, setModeValues] = useState<(string | number)[]>([]);
  const [timeSignatureValues, setTimeSignatureValues] = useState<
    (string | number)[]
  >([]);
  const [difficultyValues, setDifficultyValues] = useState<(string | number)[]>(
    []
  );
  const [instrumentValues, setInstrumentValues] = useState<(string | number)[]>(
    []
  );
  const [styleValues, setStyleValues] = useState<(string | number)[]>([]);
  const [originValues, setOriginValues] = useState<(string | number)[]>([]);
  const [ensembleValues, setEnsembleValues] = useState<(string | number)[]>([]);

  const [layout, setLayout] = useStickyState("grid", "layout");
  const [order, setOrder] = useStickyState("fields.title", "order");

  const [filterIsSelected, setFilterIsSelected] = useState(false);
  console.log("🚀 || Blog || filterIsSelected:", filterIsSelected);

  React.useEffect(() => {
    const hasFilter = Object.values(filters).some((filter) => !!filter);
    setFilterIsSelected(hasFilter || !!query);
  }, [filters, query]);

  React.useEffect(() => {
    const params = new URLSearchParams();

    if (order) params.set("order", order);
    if (query) params.set("search", query);

    if (filters.key) params.set("key", filters.key);
    if (filters.mode) params.set("mode", filters.mode);
    if (filters.timeSignature)
      params.set("timeSignature", filters.timeSignature);
    if (filters.difficulty) params.set("difficulty", filters.difficulty);
    if (filters.instrument) params.set("instrument", filters.instrument);
    if (filters.style) params.set("style", filters.style);
    if (filters.origin) params.set("origin", filters.origin);
    if (filters.ensemble) params.set("ensemble", filters.ensemble);

    // Using replace so that we don't create a new history entry
    router.replace(`/materiaalit/haku?${params.toString()}`);
  }, [query, filters, order, router]);

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
          sort: order,
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
  }, [debouncedQuery, filters, order]);

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
    <div className='container mx-auto flex flex-col gap-6 px-6 md:px-0'>
      <Disclosure defaultOpen={true}>
        <div className='flex flex-col'>
          <div className='relative flex items-center gap-2'>
            <input
              type='text'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Hae materiaalia...'
              className='w-full h-12 px-5 text-black placeholder-black/50 bg-white rounded-full shadow-inner focus:outline-none focus:ring-2 focus:ring-accent-500 ring-primary-700/10 ring-1 transition-all duration-300'
            />
            <DisclosureButton>
              <IconButton
                icon={<IoFilterSharp />}
                className='flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 text-white rounded-full shadow-lg hover:scale-105 active:scale-95 focus:ring-2 focus:ring-accent-500 transition-transform duration-200'
                onClick={() => console.log("Filter clicked")}
              />
            </DisclosureButton>
            <IconButton
              icon={<FaRegTrashAlt />}
              className='flex items-center justify-center w-12 h-12 bg-gradient-to-br from-accent-400 to-accent-600 text-white rounded-full shadow-lg hover:scale-105 active:scale-95 focus:ring-2 focus:ring-accent-500 transition-transform duration-200'
              onClick={() => resetSearch()}
            />
          </div>
          <DisclosurePanel
            transition
            className="grid lg:grid-cols-3 gap-4 lg:mx-3 mt-6 origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0"
          >
            {[
              { key: "key", options: keyValues, placeholder: "Perussävel" },
              { key: "mode", options: modeValues, placeholder: "Asteikko" },
              { key: "timeSignature", options: timeSignatureValues, placeholder: "Tahtilaji" },
              { key: "difficulty", options: difficultyValues, placeholder: "Vaikeustaso" },
              { key: "instrument", options: instrumentValues, placeholder: "Soitin" },
              { key: "style", options: styleValues, placeholder: "Tyyli" },
              { key: "origin", options: originValues, placeholder: "Alkuperämaa" },
              { key: "ensemble", options: ensembleValues, placeholder: "Yhteissoiton vaikeustaso" },
            ].map(({ key, options, placeholder }) => (
              <Select
                key={key}
                colorOnSelected
                selected={filters[key]}
                setSelected={(value) => handleFilterChange(key, value)}
                options={options}
                placeholder={placeholder}
              />
            ))}
          </DisclosurePanel>
        </div>
      </Disclosure>

      {/* Selected Filter Chips */}
      <div className='w-full flex flex-col lg:flex-row gap-6 justify-between'>
        {filterIsSelected ? (
          <div className='flex gap-2 justify-center items-center'>
            <Chip
              onDelete={() => setQuery("")}
              className='from-primary-500 to-primary-700'
            >
              {query}
            </Chip>

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

            <IconButton
              icon={<FaRegTrashAlt />}
              className='flex items-center justify-center w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 text-white rounded-full shadow-lg hover:scale-110 active:scale-95 focus:ring-2 focus:ring-accent-500 transition-transform duration-200'
              onClick={() => resetSearch()}
            />
          </div>
        ) : (
          <div className='hidden lg:block min-w-[1rem]' />
        )}

        <div className='flex gap-2 justify-between lg:min-w-[450px]'>
          <div className='flex w-full lg:max-w-[350px] gap-2 border-r border-primary-700/20 pr-2'>
            <Select
              className='w-full'
              selected={order}
              setSelected={(order) => setOrder(order)}
              options={[
                { label: "Otsikko A-Ö", value: "fields.title" },
                { label: "Otsikko Ö-A", value: "-fields.title" },
                { label: "Vaikeustaso", value: "fields.difficulty" },
                { label: "Luontiaika (uusin ensin)", value: "-sys.createdAt" },
                { label: "Luontiaika (vanhin ensin)", value: "sys.createdAt" },
              ]}
            />
          </div>

          <GridListSelector
            selected={layout}
            onSelect={(item) => setLayout(item)}
          />
        </div>
      </div>

      <Material layout={layout} loading={loading} materialWithInfo={material} />
    </div>
  );
};

export default Search;
