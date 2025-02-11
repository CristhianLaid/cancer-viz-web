export interface FilterOption {
  id: number;
  name: string;
}

export interface SelectGraphFilterProps {
  filters: {
    countries: FilterOption[];
    dataSources: FilterOption[];
  };
  selectedFilters: {
    country: string;
    dataSource: string;
  };
  onFilterChange: (filterName: string, value: string) => void;
  isLoading: boolean;
  error: string | null;
}
