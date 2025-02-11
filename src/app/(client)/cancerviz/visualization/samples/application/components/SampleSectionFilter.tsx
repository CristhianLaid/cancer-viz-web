import React from 'react';
import { SelectFilterSimple } from '@/ui/components/select/SelectFilterSimple';
import { SelectSampleFilterProps } from '../../domain/interfaces';

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
    <div className="w-full max-w-7xl mx-auto p-4" role="search" aria-label="Sample filters">
      {isLoading && (
        <div className="flex items-center justify-center p-8" role="status">
          <p className="text-lg">Cargando filtros<span className="sr-only">. Por favor espere.</span>...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4" role="alert" aria-live="polite">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {!isLoading && !error && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <SelectFilterSimple
              filterType="country"
              label="País"
              placeholder="Selecciona un país"
              options={filters.countries}
              selectedValue={selectedFilters.country}
              onChange={onFilterChange}
              aria-label="Filtrar por país"
            />

            <SelectFilterSimple
              filterType="cancerType"
              label="Tipo de cáncer"
              placeholder="Selecciona un tipo de cáncer"
              options={filters.cancerTypes}
              selectedValue={selectedFilters.cancerType}
              onChange={onFilterChange}
              aria-label="Filtrar por tipo de cáncer"
            />

            <SelectFilterSimple
              filterType="dataSource"
              label="Fuente de datos"
              placeholder="Selecciona una fuente de datos"
              options={filters.dataSources}
              selectedValue={selectedFilters.dataSource}
              onChange={onFilterChange}
              aria-label="Filtrar por fuente de datos"
            />

            <SelectFilterSimple
              filterType="constructionProtocol"
              label="Protocolo de construcción"
              placeholder="Selecciona un protocolo"
              options={filters.constructionProtocols}
              selectedValue={selectedFilters.constructionProtocol}
              onChange={onFilterChange}
              aria-label="Filtrar por protocolo de construcción"
            />

            <SelectFilterSimple
              filterType="sampleType"
              label="Tipo de muestra"
              placeholder="Selecciona un tipo de muestra"
              options={filters.sampleTypes}
              selectedValue={selectedFilters.sampleType}
              onChange={onFilterChange}
              aria-label="Filtrar por tipo de muestra"
            />
          </div>

          <div className="text-sm text-gray-500 mt-4">
            <p>* Todos los campos son opcionales. Selecciona "Todos" para ver todos los resultados.</p>
          </div>
        </div>
      )}
    </div>
  );
};
