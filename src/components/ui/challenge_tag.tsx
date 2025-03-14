import React, { useState } from 'react';

const TagSelector = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const availableCategories = ['Business', 'Movie', 'Quiz', 'Problem', 'Enigmas'];

  const handleAddCategory = (category: string) => {
    if (!selectedTags.includes(category)) {
      setSelectedTags([...selectedTags, category]);
    }
    setIsDropdownOpen(false);
  };

  const handleRemoveCategory = (category: string) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== category));
  };

  return (
    <div className="w-full border-1 rounded-lg flex  gap-4 py-[12px] px-[20px]">

         {/* Add Category Button */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="w-fit self-start bg-[#F2F7FE] text-[#35598D] px-4 py-2 rounded-lg hover:bg-blue-600 "
      >
        Add Category
      </button>
      {/* Selected Tags */}
      <div className="flex flex-wrap gap-2  w-[70%]">
        {selectedTags.map((tag) => (
          <div
            key={tag}
            className=" flex items-center bg-blue-100 text-blue-800 rounded-full px-2 text-sm "
          >
            {tag}
            <button
              onClick={() => handleRemoveCategory(tag)}
              className="ml-2 text-blue-800 hover:text-blue-600 "
            >
              ×
            </button>
          </div>
        ))}
      </div>

     

      {/* Dropdown */}
      {isDropdownOpen && (
        <div className="absolute mt-2 bottom-[-20%] bg-white border shadow-lg z-50">
          {availableCategories.map((category) => (
            <div
              key={category}
              onClick={() => handleAddCategory(category)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {category}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagSelector;