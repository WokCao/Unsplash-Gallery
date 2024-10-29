import { useEffect, useState } from 'react'
import axios from 'axios';
import Photo from '../Interface/photo-interface';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingSpinner from './LoadingSpinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons/faTriangleExclamation';
import '../Css/ShowAuthor.css';

function HomePage() {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(true);

    const fetchMoreData = () => {
        setCurrentPage(currentPage + 1);
        fetchData(currentPage + 1);
    };

    const fetchData = async (page: number) => {
        setError(null);
        try {
            const response = await axios.get('https://api.unsplash.com/photos', {
                params: {
                    page,
                    per_page: 15
                },
                headers: {
                    Authorization: `Client-ID ${import.meta.env.VITE_REACT_APP_UNSPLASH_ACCESS_KEY}`
                }
            });
            if (response.data.length > 0) {
                setPhotos([...photos, ...response.data]);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error(error);
            setError(`Failed to fetch more photos (${error})`);
        }
    };

    useEffect(() => {
        fetchData(currentPage);
    }, []);


    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold text-center mb-4">Unsplash Photos</h1>
            <InfiniteScroll
                dataLength={photos.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<LoadingSpinner error={error} isHome={true} />}
            >
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 px-8">
                    {photos.map((photo) => (
                        <div key={photo.id} className="h-full relative">
                            <Link to={`/Unsplash-Gallery/details/${photo.id}`}>
                                <img
                                    src={photo.urls.small}
                                    alt={photo.alt_description}
                                    className="object-cover h-full w-full rounded-lg window"
                                />

                                <img
                                    src={photo.urls.small}
                                    alt={photo.alt_description}
                                    className="object-cover h-full w-full rounded-t-lg mobile hidden"
                                />

                                {photo.user && (
                                    <div>
                                        <div
                                            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 rounded-lg opacity-0 ease-in-out transition duration-200 window"
                                        >
                                            <span className="text-white text-lg font-bold">{photo.user.username}</span>
                                        </div>

                                        <div
                                            className="bg-black bg-opacity-50 p-4 rounded-b-lg opacity-100 ease-in-out mobile hidden"
                                        >
                                            <span className="text-white text-lg font-bold">{photo.user.username}</span>
                                        </div>
                                    </div>
                                )}
                            </Link>
                        </div>
                    ))}
                </div>
            </InfiniteScroll>

            {!hasMore ?
                (<div className='text-center font-bold mt-5 text-xl text-stone-400'><FontAwesomeIcon className='me-1' icon={faTriangleExclamation} />No more images</div>) : null}
        </div>
    );
}

export default HomePage;
