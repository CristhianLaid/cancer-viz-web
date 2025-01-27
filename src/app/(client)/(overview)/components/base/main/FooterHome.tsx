export const FooterHome = () => {
  return (
    <footer className="border-t mt-12">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-muted-foreground mb-4 md:mb-0">
          Datos proporcionados por NGDC.cncb.
        </p>
        <p className="text-sm text-muted-foreground">
          &copy; 2025 Proyecto de Visualización de Datos de Cáncer
        </p>
      </div>
    </footer>
  );
};
