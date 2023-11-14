const PaginationLinks = ({ links = [], handlePageChange }) => links.map((link) => (
  <button
    key={link.label}
    className='relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 leading-5 hover:text-gray-500 focus:z-10 focus:outline-none focus:ring ring-gray-300 focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 first:rounded-l-md last:rounded-r-md'
    onClick={() => handlePageChange(link.url)}
    dangerouslySetInnerHTML={{ __html: link.label }}
  />
));

export default PaginationLinks;
