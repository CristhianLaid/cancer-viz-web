import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";

import { sampleFilterApiService } from "../../../infrastructure/services/sampleFilterService";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/shadcn/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/shadcn/select";
import { Button } from "@/ui/shadcn/button";
import { configEnv } from "@/config/configEnv";

const FormSchema = z.object({
  country: z.string().nonempty("Please select a country."),
  cancerType: z.string().nonempty("Please select a cancer type."),
  dataSource: z.string().nonempty("Please select a data source."),
  constructionProtocol: z
    .string()
    .nonempty("Please select a construction protocol."),
  sampleType: z.string().nonempty("Please select a sample type."),
  age: z.string().nonempty("Age is required."),
  survivalMonths: z.string().nonempty("Survival months are required."),
  tumorSize: z.string().nonempty("Tumor size is required."),
  metastasisCount: z.string().nonempty("Metastasis count is required."),
  transcriptomeAnalysis: z
    .string()
    .nonempty("Transcriptome analysis is required."),
  metabolicProfile: z.string().nonempty("Metabolic profile is required."),
});

export function CreateCancerviz() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      country: "",
      cancerType: "",
      dataSource: "",
      constructionProtocol: "",
      sampleType: "",
      age: "",
      survivalMonths: "",
      tumorSize: "",
      metastasisCount: "",
      transcriptomeAnalysis: "",
      metabolicProfile: "",
    },
  });

  const [countries, setCountries] = useState<any[]>([]);
  const [cancerTypes, setCancerTypes] = useState<any[]>([]);
  const [dataSources, setDataSources] = useState<any[]>([]);
  const [constructionProtocols, setConstructionProtocols] = useState<any[]>([]);
  const [sampleTypes, setSampleTypes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFilters = async () => {
      setIsLoading(true);
      try {
        const [
          countriesResponse,
          cancerTypesResponse,
          dataSourcesResponse,
          protocolsResponse,
          sampleTypesResponse,
        ] = await Promise.all([
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
      } catch (error) {
        setError("Error al cargar los filtros");
      }
      setIsLoading(false);
    };
    fetchFilters();
  }, []);

  const onSubmit = async () => {
    const formData = form.getValues();
  
    const correctedFormData = {
      ...formData,
      projectId: String(formData.projectId || ""),
      accessionNo: String(formData.accessionNo || ""),
      sampleId: String(formData.sampleId || ""),
    };
  
    try {
      const response = await fetch(
        `${configEnv.NEXT_PUBLIC_CANCER_VIZ_SERVICE_URL}/api/cancerviz`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(correctedFormData),
        }
      );
  
      if (response.ok) {
        window.location.reload();
      } else {
        const errorText = await response.text();
        console.error(`Error al crear el Cancerviz: ${errorText}`);
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  };
  
  

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <h1 className="text-4xl font-semibold text-center mb-8">
          Crear Cancerviz
        </h1>

        {error && (
          <div className="bg-red-500 text-white p-4 mb-4 rounded">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="text-center">Cargando...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Selector de País */}
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>País</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un país" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.id} value={country.name}>
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Selector de Tipo de Cáncer */}
            <FormField
              control={form.control}
              name="cancerType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Cáncer</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione tipo de cáncer" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {cancerTypes.map((type) => (
                        <SelectItem key={type.id} value={type.name}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Selector de Fuente de Datos */}
            <FormField
              control={form.control}
              name="dataSource"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fuente de Datos</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione una fuente de datos" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {dataSources.map((source) => (
                        <SelectItem key={source.id} value={source.name}>
                          {source.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Selector de Protocolo de Construcción */}
            <FormField
              control={form.control}
              name="constructionProtocol"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Protocolo de Construcción</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione protocolo de construcción" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {constructionProtocols.map((protocol) => (
                        <SelectItem key={protocol.id} value={protocol.name}>
                          {protocol.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Selector de Tipo de Muestra */}
            <FormField
              control={form.control}
              name="sampleType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Muestra</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione tipo de muestra" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sampleTypes.map((sampleType) => (
                        <SelectItem
                          key={sampleType.id}
                          value={sampleType.name}
                        >
                          {sampleType.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Otros campos de texto */}
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Edad</FormLabel>
                  <FormControl>
                    <input
                      type="text"
                      {...field}
                      className="p-3 border rounded"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="survivalMonths"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meses de Supervivencia</FormLabel>
                  <FormControl>
                    <input
                      type="text"
                      {...field}
                      className="p-3 border rounded"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tumorSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tamaño del Tumor</FormLabel>
                  <FormControl>
                    <input
                      type="text"
                      {...field}
                      className="p-3 border rounded"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="metastasisCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de Metástasis</FormLabel>
                  <FormControl>
                    <input
                      type="text"
                      {...field}
                      className="p-3 border rounded"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="transcriptomeAnalysis"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Análisis de Transcriptoma</FormLabel>
                  <FormControl>
                    <input
                      type="text"
                      {...field}
                      className="p-3 border rounded"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="metabolicProfile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Perfil Metabólico</FormLabel>
                  <FormControl>
                    <input
                      type="text"
                      {...field}
                      className="p-3 border rounded"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        <Button type="submit" className="w-full">
          Crear Cancerviz
        </Button>
      </form>
    </FormProvider>
  );

}
