import { useEffect, useState } from "react";
import { GraphBase } from "../../domain/interfaces";
import { graphApiService } from "../../infrastructure/services/graphService";

export const useGraph = () => {
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [data, setData] = useState<GraphBase[] | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGraphData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Filtrar los filtros vacíos para no enviarlos en la petición
      const activeFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== "")
      );

      const queryParams = {
        ...activeFilters
      };


      const result = await graphApiService.getGraphsFromApi(queryParams);
      setData(result.data);
      setTotal(result.total);
    } catch (error) {
      console.log(error);
      setError("Error fetching graphs");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGraphData();
  }, [filters]);

  return {
    data,
    total,
    isLoading,
    error,
    setFilters, // Permite modificar los filtros desde el componente
  };
};
