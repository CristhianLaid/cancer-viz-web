import { CardSimple } from "@/ui/components/card/CardSimple";
import { Globe } from "lucide-react";

export const ImpactSectionHome = () => (
  <CardSimple title="Impacto Global">
    <p className="text-sm text-muted-foreground mb-6">
      Nuestra plataforma está siendo utilizada por investigadores y
      profesionales médicos en todo el mundo, contribuyendo al avance de la
      investigación del cáncer y mejorando las estrategias de tratamiento.
    </p>
    <div className="flex items-center">
      <Globe className="w-12 h-12 text-primary mr-4" />
      <div>
        <p className="text-2xl font-bold text-foreground">100+</p>
        <p className="text-sm text-muted-foreground">Países utilizando CancerViz</p>
      </div>
    </div>
  </CardSimple>
);
