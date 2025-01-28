export const GraphSection = () => {
    return (
      <main className="flex-1 p-4 md:p-6 w-full">
        <h1 className="text-3xl font-bold text-foreground mb-6">Gráficas Interactivas</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Gráfica 1</h2>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Gráfica 2</h2>
          </div>
        </div>
      </main>
    );
  };
  