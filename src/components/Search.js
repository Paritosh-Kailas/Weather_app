import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
          


const Search = ({ onCitySelect }) => {
    const [search, setSearch] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const loadOptions = async (inputValue) => {
        if (!inputValue) {
            return { options: [] };
        }

        setLoading(true);
        try {
            const resp = await fetch(
                `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${inputValue}`,
                {
                    method: "GET",
                    headers: {
                        "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
                        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com"
                    }
                }
            );
            const data = await resp.json();
            return {
                options: data.data.map(city => ({
                    value: `${city.name}, ${city.countryCode}`,
                    label: `${city.name}, ${city.countryCode}`
                })),
                hasMore: false
            };
        } catch (err) {
            setError(err.message);
            return { options: [] };
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (selected) => {
        if (selected && selected.value) {
            setSearch(selected);
            if (onCitySelect) {
                onCitySelect(selected.value);
            }
        }
    };

    return (
        <div className="search-container">
            <AsyncPaginate
                placeholder="Search for a city..."
                loadOptions={loadOptions}
                onChange={handleChange}
                isLoading={loading}
            />
            {error && <p className="search-error" role="alert">Error: {error}</p>}
        </div>
    );
    
};

        


export default Search;