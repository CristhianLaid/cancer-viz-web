import { CardSimpleDescription } from "@/ui/components/card/CardSimpleDescription";
import { CardSimpleLink } from "@/ui/components/card/CardSimpleLink";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/shadcn/tabs";
import { ExternalLink } from "lucide-react";
import { SummarySection } from "../summary/SummarySection";


export default function TabsContentSectionHome() {
  return (
    <Tabs defaultValue="database" className="mb-16">
      <TabsList className="grid w-full grid-cols-2 mb-4">
        <TabsTrigger value="database">Nuestra Base de Datos</TabsTrigger>
        <TabsTrigger value="updates">Estadísticas Clave</TabsTrigger>
      </TabsList>
      <TabsContent value="database">
        <CardSimpleLink
          href="https://ngdc.cncb.ac.cn/"
          label_link={"Visitar NGDC.cncb"}
          description="Información detallada sobre nuestras fuentes y procesamiento de datos"
          title={"Acerca de Nuestra Base de Datos"}
          icon={ExternalLink}
        >
          <p className="text-sm text-muted-foreground mb-4">
            Los datos presentados en esta plataforma se obtuvieron de NGDC.cncb,
            una fuente confiable de información genómica. El equipo de NDGC ha
            procesado y organizado estos datos para facilitar su exploración y
            análisis, asegurando la más alta calidad y relevancia para la
            investigación del cáncer.
          </p>
        </CardSimpleLink>
      </TabsContent>
      <TabsContent value="updates">
        <CardSimpleDescription
          title="Estadísticas Clave"
          description="Resumen de los datos disponibles en nuestra plataforma"
        >
          <SummarySection />
        </CardSimpleDescription>
      </TabsContent>
    </Tabs>
  );
}
