const CategoryFilter = ({ categories, handleCategorySelect }) => {
  return (
    <select
      className="my-4 w-full sm:mt-0 sm:w-1/4 rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      onChange={(e) => handleCategorySelect(e)}
    >
      <option value="">- All categories -</option>
      {
        categories.map((category) => (
          <option
            key={category.id}
            value={category.id}
          >
            {category.name}
          </option>
        ))
      }
    </select>
  );
};

export default CategoryFilter;
