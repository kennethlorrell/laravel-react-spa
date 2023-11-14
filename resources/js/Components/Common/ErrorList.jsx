const ErrorList = ({ errors }) => {
  if (!errors.length) {
    return;
  }

  return (
    <div>
      <ul className="mt-3 mb-4 list-inside text-sm text-red-600 list-none text-center">
        {
          errors.map(
            (error, index) => <li key={index}>{error[1][0]}</li>
          )
        }
      </ul>
    </div>
  )
};

export default ErrorList;
