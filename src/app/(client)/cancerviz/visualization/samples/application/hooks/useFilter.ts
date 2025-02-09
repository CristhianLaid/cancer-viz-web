import { useState, useEffect } from "react";
import {
  CountryBase,
  CancerTypeBase,
  DataSourceBase,
  ConstructionProtocolBase,
  SampleTypeBase,
} from "../../domain/interfaces";
import { sampleFilterApiService } from "../../infrastructure/services/sampleFilterService";

export const useFilters = () => {
  const [countries, setCountries] = useState<CountryBase[]>([]);
  const [cancerTypes, setCancerTypes] = useState<CancerTypeBase[]>([]);
  const [dataSources, setDataSources] = useState<DataSourceBase[]>([]);
  const [constructionProtocols, setConstructionProtocols] = useState<ConstructionProtocolBase[]>([]);
  const [sampleTypes, setSampleTypes] = useState<SampleTypeBase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const initialFilters = {
    country: "",
    cancerType: "",
    dataSource: "",
    constructionProtocol: "",
    sampleType: "",
  };

  const [selectedFilters, setSelectedFilters] = useState(initialFilters);

  useEffect(() => {
    const fetchFilters = async () => {
      setIsLoading(true);
      try {
        const [countriesResponse, cancerTypesResponse, dataSourcesResponse, protocolsResponse, sampleTypesResponse] =
          await Promise.all([
            sampleFilterApiService.getSampleCountryFromApi(),
            sampleFilterApiService.getSampleCancerTypeFromApi(),
            sampleFilterApiService.getSampleDataSourceFromApi(),
            sampleFilterApiService.getSampleConstructorProtocolFromApi(),
            sampleFilterApiService.getSampleTypeFromApi(),
          ]);
        setCountries(countriesResponse);
        setCancerTypes(cancerTypesResponse);
        setDataSources(dataSourcesResponse);
        setConstructionProtocols(protocolsResponse);
        setSampleTypes(sampleTypesResponse);
        setIsLoading(false);
      } catch (error) {
        setError("Error al cargar los filtros");
        setIsLoading(false);
      }
    };
    fetchFilters();
  }, []);

  const handleFilterChange = (key: string, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [key]: value === "all" ? "" : value,
    }));
  };

  const handleResetFilters = () => {
    setSelectedFilters(initialFilters);
  };

  return {
    countries,
    cancerTypes,
    dataSources,
    constructionProtocols,
    sampleTypes,
    isLoading,
    error,
    selectedFilters,
    handleFilterChange,
    handleResetFilters, // <- Ahora lo exportamos
  };
};
