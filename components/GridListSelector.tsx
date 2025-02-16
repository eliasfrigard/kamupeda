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
        className={`bg-gradient-to-br duration-200 ${
          selected === "grid"
            ? "from-primary-400 to-primary-600"
            : "from-accent-400 to-accent-600 opacity-60 hover:opacity-100"
        }`}
      />
      <IconButton
        icon={<FaList />}
        onClick={() => onSelect("list")}
        className={`bg-gradient-to-br duration-200 ${
          selected === "list"
            ? "from-primary-400 to-primary-600"
            : "from-accent-400 to-accent-600 opacity-60 hover:opacity-100"
        }`}
      />
    </div>
  );
};

export default GridListSelector;
