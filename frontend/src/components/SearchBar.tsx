import { useState } from 'react';

type SearchBarProps = {
    onSearch: (city: string) => void;
    loading: boolean;
};

export const SearchBar = ({ onSearch, loading }: SearchBarProps) => {
    const [city, setCity] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (city.trim()) {
            onSearch(city.trim());
            setCity('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="d-flex" role="search">
            <input
                type="search"
                className="form-control me-2"
                placeholder="Buscar ciudad..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button className="btn btn-outline-light" disabled={loading}>
                {loading ? 'Buscando...' : 'Buscar'}
            </button>
        </form>
    );
};
