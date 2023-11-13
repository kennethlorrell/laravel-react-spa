import PaginationLinks from '@/Components/Posts/PaginationLinks.jsx';

const Pagination = ({ meta, handlePageChange }) => {
  return (
    <div className="mt-4">
      <nav role="navigation" aria-label="Pagination Navigation" className="flex items-center justify-between">
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700 leading-5">
              Showing&nbsp;
              <span>
                <span className="font-medium">
                  { meta.from }
                </span>
                  &nbsp;to&nbsp;
                <span className="font-medium">
                  { meta.to }
                </span>
              </span>
              &nbsp;of&nbsp;
              <span className="font-medium">
                { meta.total }
              </span>
              &nbsp;results&nbsp;
            </p>
          </div>

          <div>
            <span className="relative z-0 inline-flex shadow-sm rounded-md">
              <PaginationLinks
                links={meta.links}
                handlePageChange={handlePageChange}
              />
            </span>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Pagination;
