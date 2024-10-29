import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Photo from '../Interface/photo-interface';
import LoadingSpinner from './LoadingSpinner';

function DetailsPage() {
    const { id } = useParams();
    const [photo, setPhoto] = useState<Photo>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get(`https://api.unsplash.com/photos/${id}`, {
                    headers: {
                        Authorization: `Client-ID ${import.meta.env.VITE_REACT_APP_UNSPLASH_ACCESS_KEY}`
                    }
                });
                setPhoto(response.data);
            } catch (error) {
                console.error(error);
                setError(`Failed to fetch photo details (${error})`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);

    return (
        <div className='flex justify-center'>
            {isLoading || error ? (
                <LoadingSpinner error={error} isHome={false} />
            ) : photo && (
                <div className="photo-details flex flex-col gap-4 bg-gray-100 rounded-md p-4 shadow-md">
                    <img
                        className="rounded-lg object-cover h-auto w-full"
                        src={photo.urls.regular}
                        alt={photo.alt_description}
                    />
                    <div>
                        <h2 className="text-2xl font-bold">{photo.title || 'Unknown Title'}</h2>
                        <div className="flex justify-between items-center mt-2">
                            <span className="font-bold text-lg w-2/5">ID:</span>
                            <span>{photo.id}</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                            <span className="font-bold text-lg w-2/5">Author:</span>
                            <span>{photo.user.username}</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                            <span className="font-bold text-lg w-2/5">Description:</span>
                            <span>{photo.alt_description || 'Updating...'}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DetailsPage;