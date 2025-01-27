import { SummaryList } from "./SummaryList";

const summaryData = [
  { label: "Muestras analizadas", value: <span id="sampleCount"></span> },
  { label: "Tipos de cáncer", value: "Diversos, incluyendo cáncer de mama y otros" },
  { label: "Fuentes de datos", value: "NCBI (GEO) y otras" },
  { label: "Países contribuyentes", value: "Múltiples, incluyendo China (CHN)" },
  { label: "Protocolos de construcción", value: "Incluye GEXSCOPE y otros" },
];

export const SummarySection = () => {
  return <SummaryList items={summaryData} />;
};
