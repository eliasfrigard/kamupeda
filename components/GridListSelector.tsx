import React from "react";

import { FaList } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";
import IconButton from "@/components/IconButton";

interface GridListSelectorProps {
  selected: "grid" | "list";
  onSelect: (value: "grid" | "list") => void;
}

const GridListSelector: React.FC<GridListSelectorProps> = ({
  selected,
  onSelect,
}) => {
  return (
    <div className='text-white flex gap-1 pr-1'>
      <IconButton
        icon={<IoGrid />}
        onClick={() => onSelect("grid")}
        className={`${
          selected === "grid" ? "bg-accent-500" : "bg-primary-500"
        }`}
      ></IconButton>
      <IconButton
        icon={<FaList />}
        onClick={() => onSelect("list")}
        className={`${
          selected === "list" ? "bg-accent-500" : "bg-primary-500"
        }`}
      ></IconButton>
    </div>
  );
};

export default GridListSelector;
