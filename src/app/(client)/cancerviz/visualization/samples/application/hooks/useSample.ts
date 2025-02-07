import { useEffect, useState } from "react";
import { SampleBase } from "../../domain/interfaces/SampleBase";
import { sampleApiService } from "../../infrastructure/services/sampleService";

export const useSample = () => {
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [data, setData] = useState<SampleBase[] | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSampleData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await sampleApiService.getSamplesFromApi({
        ...filters,
        limit,
        offset,
      });
      setData(result.data);
      setTotal(result.total);
    } catch (error) {
      console.log(error);
      setError("Error fetching samples");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSampleData();
  }, [limit, offset, filters]);

  const totalPages = total ? Math.ceil(total / limit) : 0;
  return {
    data,
    total,
    totalPages,
    limit,
    offset,
    isLoading,
    error,
    setFilters, // Permite modificar los filtros desde el componente
    setLimit, // Permite cambiar el límite de resultados
    setOffset, // Permite cambiar el offset (paginación)
  };
};
