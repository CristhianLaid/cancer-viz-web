import { useState, useEffect } from "react";
import { Button } from "@/ui/shadcn/button";
import { configEnv } from "@/config/configEnv";
import { sampleFilterApiService } from "../../../infrastructure/services/sampleFilterService";
import { Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/shadcn/select";
import { Alert, AlertDescription } from "@/ui/shadcn/alert";
import { useForm, FormProvider } from "react-hook-form";
import InputSimpleShadow from "@/ui/components/form/InputSimpleShadow";

interface FormData {
  projectId: string;
  cancerType: string;
  dataSource: string;
  country: string;
  age: string;
  survivalMonths: string;
  tumorSize: string;
  metastasisCount: string;
  constructionProtocol: string;
  sampleType: string;
}

export const CreateCancerviz = () => {
  const [countries, setCountries] = useState<any[]>([]);
  const [cancerTypes, setCancerTypes] = useState<any[]>([]);
  const [dataSources, setDataSources] = useState<any[]>([]);
  const [constructionProtocols, setConstructionProtocols] = useState<any[]>([]);
  const [sampleTypes, setSampleTypes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const methods = useForm<FormData>();  // Usamos `useForm` para gestionar el formulario
  const { control, handleSubmit, setValue, getValues } = methods;

  useEffect(() => {
    const fetchFilters = async () => {
      setIsLoading(true);
      try {
        const [
          countriesResponse,
          cancerTypesResponse,
          dataSourcesResponse,
          protocolsResponse,
          sampleTypesResponse
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
        setIsLoading(false);
      } catch (error) {
        setError("Error al cargar los filtros");
        setIsLoading(false);
      }
    };
    fetchFilters();
  }, []);

  const onSubmit = async (formData: FormData) => {
    try {
      const response = await fetch(`${configEnv.NEXT_PUBLIC_CANCER_VIZ_SERVICE_URL}/api/cancerviz`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Cancerviz creado con éxito");
      } else {
        alert("Error al crear el Cancerviz");
      }
    } catch (error) {
      alert("Error al enviar la solicitud");
    }
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-7xl">
        <div className="p-6">
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="">
                <InputSimpleShadow control={control} name="projectId" placeholder="Enter project ID" />
                <Select
                  value={getValues("cancerType")}
                  onValueChange={(value) => setValue("cancerType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select cancer type" />
                  </SelectTrigger>
                  <SelectContent>
                    {cancerTypes.map((type) => (
                      <SelectItem key={type.id} value={type.name}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={getValues("dataSource")}
                  onValueChange={(value) => setValue("dataSource", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select data source" />
                  </SelectTrigger>
                  <SelectContent>
                    {dataSources.map((source) => (
                      <SelectItem key={source.id} value={source.name}>
                        {source.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={getValues("constructionProtocol")}
                  onValueChange={(value) => setValue("constructionProtocol", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select construction protocol" />
                  </SelectTrigger>
                  <SelectContent>
                    {constructionProtocols.map((protocol) => (
                      <SelectItem key={protocol.id} value={protocol.name}>
                        {protocol.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={getValues("sampleType")}
                  onValueChange={(value) => setValue("sampleType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select sample type" />
                  </SelectTrigger>
                  <SelectContent>
                    {sampleTypes.map((sample) => (
                      <SelectItem key={sample.id} value={sample.name}>
                        {sample.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Clinical Data - Inputs below */}
              <div className="space-y-4">
                <InputSimpleShadow control={control} name="age" placeholder="Enter age" type="number" />
                <InputSimpleShadow control={control} name="survivalMonths" placeholder="Enter survival months" type="number" />
                <InputSimpleShadow control={control} name="tumorSize" placeholder="Enter tumor size" type="number" />
                <InputSimpleShadow control={control} name="metastasisCount" placeholder="Enter metastasis count" type="number" />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-6">
                <Button type="submit" disabled={isLoading} className="min-w-[160px] bg-blue-600 text-white hover:bg-blue-700 transition-all">
                  {isLoading ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : null}
                  {isLoading ? "Creating..." : "Create Cancerviz"}
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
    </div>
  );
};
