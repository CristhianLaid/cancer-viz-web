export interface FilterOption {
  id: number;
  name: string;
}

export interface SelectSampleFilterProps {
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
