const SortButton = ({ newField, oldField, direction, handleOrderChange }) => {
  let iconClasses = 'fa-sort';

  if (newField === oldField) {
    if (direction === 'asc') {
      iconClasses = 'fa-sort-up';
    } else {
      iconClasses = 'fa-sort-down';
    }
  }

  return (
    <button
      onClick={() => handleOrderChange(newField)}
      type="button"
      className="column-sort"
    >
      <i className={`fa-solid ${iconClasses}`}></i>
    </button>
  );
};

export default SortButton;
