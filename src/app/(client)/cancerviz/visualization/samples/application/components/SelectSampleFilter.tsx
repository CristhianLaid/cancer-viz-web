import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/shadcn/select';

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
      <div className="flex flex-col lg:flex-row lg:flex-wrap lg:gap-4">
        {/* País */}
        <div className="flex-1 min-w-[200px] lg:max-w-[300px]">
          <label className="block mb-2">País:</label>
          <Select
            value={selectedFilters.country}
            onValueChange={(value) => onFilterChange("country", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un país" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key="all" value="all">
                Todos
              </SelectItem>
              {filters.countries.map((country) => (
                <SelectItem key={country.id} value={country.name}>
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tipo de Cáncer */}
        <div className="flex-1 min-w-[200px] lg:max-w-[300px]">
          <label className="block mb-2">Tipo de cáncer:</label>
          <Select
            value={selectedFilters.cancerType}
            onValueChange={(value) => onFilterChange("cancerType", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un tipo de cáncer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key="all" value="all">
                Todos
              </SelectItem>
              {filters.cancerTypes.map((cancerType) => (
                <SelectItem key={cancerType.id} value={cancerType.name}>
                  {cancerType.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Fuente de Datos */}
        <div className="flex-1 min-w-[200px] lg:max-w-[300px]">
          <label className="block mb-2">Fuente de datos:</label>
          <Select
            value={selectedFilters.dataSource}
            onValueChange={(value) => onFilterChange("dataSource", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona una fuente de datos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key="all" value="all">
                Todos
              </SelectItem>
              {filters.dataSources.map((dataSource) => (
                <SelectItem key={dataSource.id} value={dataSource.name}>
                  {dataSource.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Protocolo de Construcción */}
        <div className="flex-1 min-w-[200px] lg:max-w-[300px]">
          <label className="block mb-2">Protocolo de construcción:</label>
          <Select
            value={selectedFilters.constructionProtocol}
            onValueChange={(value) => onFilterChange("constructionProtocol", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un protocolo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key="all" value="all">
                Todos
              </SelectItem>
              {filters.constructionProtocols.map((protocol) => (
                <SelectItem key={protocol.id} value={protocol.name}>
                  {protocol.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tipo de Muestra */}
        <div className="flex-1 min-w-[200px] lg:max-w-[300px]">
          <label className="block mb-2">Tipo de muestra:</label>
          <Select
            value={selectedFilters.sampleType}
            onValueChange={(value) => onFilterChange("sampleType", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un tipo de muestra" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key="all" value="all">
                Todos
              </SelectItem>
              {filters.sampleTypes.map((sampleType) => (
                <SelectItem key={sampleType.id} value={sampleType.name}>
                  {sampleType.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};