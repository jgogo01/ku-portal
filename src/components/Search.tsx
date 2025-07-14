interface SearchBarProps {
    searchTerm: string;
    onSearchChange: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
    return (
        <>
            <div className="mb-8">
                <div className="relative">
                    <input
                        type="text"
                        className="w-full px-4 py-3 pl-12 text-gray-900 bg-white/80 backdrop-blur-sm border-0 rounded-full shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none transition-all placeholder-gray-500"
                        placeholder="ค้นหา..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                    <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>
        </>
    );
};

export default SearchBar;
