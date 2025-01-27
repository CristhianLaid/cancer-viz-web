import { CardSimple } from "@/ui/components/card/CardSimple";
import { BarChart2, Database, Search } from "lucide-react";

export const DataFeaturesHome = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
      <CardSimple icon={BarChart2} title="Visualizaciones Interactivas">
        <p className="text-sm text-muted-foreground">
          Explore datos de cáncer a través de gráficas dinámicas y
          personalizables.
        </p>
      </CardSimple>
      <CardSimple icon={Database} title="Base de Datos Completa">
        <p className="text-sm text-muted-foreground">
          Acceda a una amplia colección de muestras de cáncer y análisis
          relacionados.
        </p>
      </CardSimple>
      <CardSimple icon={Search} title="Búsqueda Avanzada">
        <p className="text-sm text-muted-foreground">
          Utilice herramientas de búsqueda y filtrado para encontrar datos
          específicos.
        </p>
      </CardSimple>
    </div>
  );
};
