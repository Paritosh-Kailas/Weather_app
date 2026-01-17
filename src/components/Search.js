import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
          


const Search = () => {
    const [search, setSearch] = useState(null);
    const [Error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const loadOptions = (inputValue) => {
        if (!inputValue) return Promise.resolve({ options: [] });
        setLoading(true);
        return fetch(
            `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${inputValue}`,
            {
                method: "GET",
                headers: {
                    "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
                    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com"
                }
            }
        )
        .then(response => response.json())
        .then(data => {
            return data.data.map(city => ({
                value: city.id,
                label: `${city.name}, ${city.countryCode}`
               
            }));
        })
        .catch(err => {
            setError(err.message);
            return { options: [] }; // fallback
        })
        .finally(() => setLoading(false));
    };



    return (
        <AsyncPaginate
            placeholder="Search for a city..."
            loadOptions={loadOptions}
            onChange={setSearch}
        />
    );
    
};

        


export default Search;