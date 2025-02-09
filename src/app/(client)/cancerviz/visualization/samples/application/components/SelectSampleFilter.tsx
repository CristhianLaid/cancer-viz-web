
interface FilterOption {
  id: number;
  name: string;
}

interface SelectSampleFilterProps {
  filters: {
    countries: FilterOption[];
    cancerTypes: FilterOption[];
    dataSources: FilterOption[];
    constructionProtocols: FilterOption[];
    sampleTypes: FilterOption[];
  };
  selectedFilters: {
    country: string;
    cancerType: string;
    dataSource: string;
    constructionProtocol: string;
    sampleType: string;
  };
  onFilterChange: (filterName: string, value: string) => void;
  isLoading: boolean;
  error: string | null;
}

export const SelectSampleFilter: React.FC<SelectSampleFilterProps> = ({
  filters,
  selectedFilters,
  onFilterChange,
  isLoading,
  error,
}) => {
  if (isLoading) return <p>Cargando filtros...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-4">
      <label className="block">
        <span>País:</span>
        <select
          value={selectedFilters.country}
          onChange={(e) => onFilterChange("country", e.target.value)}
          className="w-full border rounded p-2"
        >
          <option value="">Selecciona un país</option>
          {filters.countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span>Tipo de cáncer:</span>
        <select
          value={selectedFilters.cancerType}
          onChange={(e) => onFilterChange("cancerType", e.target.value)}
          className="w-full border rounded p-2"
        >
          <option value="">Selecciona un tipo de cáncer</option>
          {filters.cancerTypes.map((cancerType) => (
            <option key={cancerType.id} value={cancerType.id}>
              {cancerType.name}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span>Fuente de datos:</span>
        <select
          value={selectedFilters.dataSource}
          onChange={(e) => onFilterChange("dataSource", e.target.value)}
          className="w-full border rounded p-2"
        >
          <option value="">Selecciona una fuente de datos</option>
          {filters.dataSources.map((dataSource) => (
            <option key={dataSource.id} value={dataSource.id}>
              {dataSource.name}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span>Protocolo de construcción:</span>
        <select
          value={selectedFilters.constructionProtocol}
          onChange={(e) => onFilterChange("constructionProtocol", e.target.value)}
          className="w-full border rounded p-2"
        >
          <option value="">Selecciona un protocolo</option>
          {filters.constructionProtocols.map((protocol) => (
            <option key={protocol.id} value={protocol.id}>
              {protocol.name}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span>Tipo de muestra:</span>
        <select
          value={selectedFilters.sampleType}
          onChange={(e) => onFilterChange("sampleType", e.target.value)}
          className="w-full border rounded p-2"
        >
          <option value="">Selecciona un tipo de muestra</option>
          {filters.sampleTypes.map((sampleType) => (
            <option key={sampleType.id} value={sampleType.id}>
              {sampleType.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};
