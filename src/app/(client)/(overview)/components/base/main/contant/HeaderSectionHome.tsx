import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/ui/components/button/ButtonLink";

interface HeaderSectionProps {
  children: React.ReactNode;
}

export const HeaderSectionHome = ({ children }: HeaderSectionProps) => {
  return (
    <main className="flex-grow container mx-auto px-4 py-12">
      <section className="mb-16 text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4 leading-tight">
          Visualización de Datos de Cáncer
        </h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Explore nuestra extensa base de datos de muestras de cáncer, que
          incluye información detallada sobre tipos de cáncer, fuentes de datos,
          países de origen y protocolos de construcción. Nuestra plataforma
          permite a investigadores y profesionales médicos analizar datos de
          transcriptoma y perfiles metabólicos para avanzar en la investigación
          del cáncer.
        </p>
        <ButtonLink
          href="/cancerviz/dashboard/graphs"
          label="Explorar Gráficas"
          icon={ArrowRight}
        />
      </section>
      {children}
    </main>
  );
};
