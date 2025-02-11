import { useState, useEffect } from "react";
import {
  CountryBase,
  DataSourceBase
} from "../../domain/interfaces";
import { graphFilterApiService } from "../../infrastructure/services/graphFilterService";

export const useFilters = () => {
  const [countries, setCountries] = useState<CountryBase[]>([]);
  const [dataSources, setDataSources] = useState<DataSourceBase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const initialFilters = {
    country: "",
    dataSource: "",
  };

  const [selectedFilters, setSelectedFilters] = useState(initialFilters);

  useEffect(() => {
    const fetchFilters = async () => {
      setIsLoading(true);
      try {
        const [countriesResponse, dataSourcesResponse] =
          await Promise.all([
            graphFilterApiService.getGraphCountryFromApi(),
            graphFilterApiService.getGraphDataSourceFromApi(),
          ]);
        setCountries(countriesResponse);
        setDataSources(dataSourcesResponse);
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
    dataSources,
    isLoading,
    error,
    selectedFilters,
    handleFilterChange,
    handleResetFilters,
  };
};
