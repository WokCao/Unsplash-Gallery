import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../Css/LoadingSpinner.css';

function LoadingSpinner({ error, isHome }: { error: string | null, isHome: boolean }) {
  // handle if there is no error, show the loading spinner
  // besides, if errors occur, show the error UI

  // this is used for when infiniteScroll gets error when fetching data (network, limit requests,...),
  // the error is shown instead of loading spinner (avoid confusion) & all fetched images are shown above
  return (
    !error ? (
      <div className="loading-spinner">
        <div className="spinner"></div><span className='ms-2'>Loading...</span>
      </div>
    ) : (
      <div className="text-center text-red-500 font-bold">
        {isHome ? <FontAwesomeIcon icon={faCircleExclamation} /> : null}
        <p>Error: {error}</p>
        <p>Please try again later.</p>
      </div>
    )
  );
}

export default LoadingSpinner;