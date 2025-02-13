import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";

import { sampleFilterApiService } from "../../../infrastructure/services/sampleFilterService";
import { Button } from "@/ui/shadcn/button";
import { configEnv } from "@/config/configEnv";
import InputSimpleShadow from "@/ui/components/form/InputSimpleShadow";
import SelectFieldSimpleShadow from "@/ui/components/form/SelectFieldSimpleShadow";
import { CancerTypeBase, ConstructionProtocolBase, CountryBase, DataSourceBase, SampleTypeBase } from "../../../domain/interfaces";

const FormSchema = z.object({
  projectId: z.string().nonempty("ProjectId is required."),
  accessionNo: z.string().nonempty("AccessionNo is required"),
  country: z.string().nonempty("Please select a country."),
  cancerType: z.string().nonempty("Please select a cancer type."),
  dataSource: z.string().nonempty("Please select a data source."),
  constructionProtocol: z
    .string()
    .nonempty("Please select a construction protocol."),
  sampleId: z.string().nonempty("Sample ID is required."),
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
      projectId: "",
      country: "",
      cancerType: "",
      dataSource: "",
      constructionProtocol: "",
      accessionNo: "",
      sampleId: "",
      sampleType: "",
      age: "",
      survivalMonths: "",
      tumorSize: "",
      metastasisCount: "",
      transcriptomeAnalysis: "",
      metabolicProfile: "",
    },
  });

  const [countries, setCountries] = useState<CountryBase[]>([]);
  const [cancerTypes, setCancerTypes] = useState<CancerTypeBase[]>([]);
  const [dataSources, setDataSources] = useState<DataSourceBase[]>([]);
  const [constructionProtocols, setConstructionProtocols] = useState<ConstructionProtocolBase[]>([]);
  const [sampleTypes, setSampleTypes] = useState<SampleTypeBase[]>([]);
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

    try {
      const response = await fetch(
        `${configEnv.NEXT_PUBLIC_CANCER_VIZ_SERVICE_URL}/api/cancerviz`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-5xl mx-auto bg-white shadow-xl rounded-lg p-5 space-y-8 border border-gray-200"
      >


        {error && (
          <div className="bg-red-500 text-white p-4 rounded-lg text-center">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="text-center text-gray-600 text-lg">Cargando...</div>
        ) : (
          <div className="overflow-x-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-w-[800px]">
              <SelectFieldSimpleShadow
                control={form.control}
                name="country"
                label="País"
                placeholder="Seleccione un país"
                options={countries}
              />

              <SelectFieldSimpleShadow
                control={form.control}
                name="cancerType"
                label="Tipo de Cáncer"
                placeholder="Seleccione tipo de cáncer"
                options={cancerTypes}
              />

              <SelectFieldSimpleShadow
                control={form.control}
                name="dataSource"
                label="Fuente de Datos"
                placeholder="Seleccione una fuente de datos"
                options={dataSources}
              />

              <SelectFieldSimpleShadow
                control={form.control}
                name="constructionProtocol"
                label="Protocolo de Construcción"
                placeholder="Seleccione protocolo de construcción"
                options={constructionProtocols}
              />

              <SelectFieldSimpleShadow
                control={form.control}
                name="sampleType"
                label="Tipo de Muestra"
                placeholder="Seleccione el tipo de muestra"
                options={sampleTypes}
              />

              <InputSimpleShadow
                control={form.control}
                name="sampleId"
                placeholder="Ingrese el ID de muestra"
                label="ID de Muestra"
              />

              <InputSimpleShadow
                control={form.control}
                name="accessionNo"
                placeholder="Ingrese el número de acceso"
                label="Número de Acceso"
              />

              <InputSimpleShadow
                control={form.control}
                name="projectId"
                placeholder="Ingrese el ID del proyecto"
                label="ID del Proyecto"
              />

              <InputSimpleShadow
                control={form.control}
                name="age"
                placeholder="Ingrese la edad"
                label="Edad"
              />

              <InputSimpleShadow
                control={form.control}
                name="survivalMonths"
                placeholder="Ingrese los meses de supervivencia"
                label="Meses de Supervivencia"
              />

              <InputSimpleShadow
                control={form.control}
                name="tumorSize"
                placeholder="Ingrese el tamaño del tumor"
                label="Tamaño del Tumor"
              />

              <InputSimpleShadow
                control={form.control}
                name="metastasisCount"
                placeholder="Ingrese el número de metástasis"
                label="Número de Metástasis"
              />

              <InputSimpleShadow
                control={form.control}
                name="transcriptomeAnalysis"
                placeholder="Ingrese el análisis de transcriptoma"
                label="Análisis de Transcriptoma"
              />

              <InputSimpleShadow
                control={form.control}
                name="metabolicProfile"
                placeholder="Ingrese el perfil metabólico"
                label="Perfil Metabólico"
              />

            </div>
          </div>
        )}

        <Button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 text-lg font-semibold"
        >
          Crear Cancerviz
        </Button>
      </form>
    </FormProvider>
  );



}
