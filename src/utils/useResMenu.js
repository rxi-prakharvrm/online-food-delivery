import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useOnlineStatus from './useOnlineStatus';

const useResMenu = () => {
    const [resInfo, setResInfo] = useState(null);
    const { resId } = useParams();

    const onlineStatus = useOnlineStatus();
    
    const fetchMenu = async () => {
        try {
            const response = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.7040592&lng=77.10249019999999&restaurantId=${resId}`);
            const jsonData = await response.json();
            setResInfo(jsonData.data);
        } catch (error) {
            console.error("Error fetching menu:", error);
        }
    };
    
    useEffect(() => {
        fetchMenu();
    }, [resId]);
    
    if(onlineStatus === false) return <h1 className="offline-status-msg">Looks like you're offline!</h1>
    return ({resInfo});
}

export default useResMenu;