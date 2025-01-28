"use client";

import { useState } from "react";
import { Filter, X, Menu } from "lucide-react";
import { Button } from "@/ui/shadcn/button";

export default function Page() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile toggle button - Fixed at bottom */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20 p-3 rounded-full bg-white shadow-lg hover:bg-gray-100 md:hidden flex items-center gap-2"
          aria-label="Abrir filtros"
        >
          <Menu className="w-5 h-5 text-gray-700" />
          <span className="text-sm font-medium text-gray-700">Filtros</span>
        </button>
      )}

      <div className="flex relative">
        {/* Sidebar */}
        <aside
          className={`
            fixed md:sticky top-0 z-20 
            h-screen
            bg-white 
            transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            ${sidebarOpen ? 'w-[250px]' : 'md:w-20'}
            shadow-lg md:shadow-none
          `}
        >
          <div className="p-4">
            <div className="flex items-center justify-between">
              {sidebarOpen && (
                <h2 className="text-lg font-semibold flex items-center">
                  <Filter className="w-5 h-5 mr-2 text-gray-700" />
                  Filtros
                </h2>
              )}

              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-md hover:bg-gray-200 focus:outline-none"
                aria-label={sidebarOpen ? "Cerrar menú" : "Abrir menú"}
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            {sidebarOpen && (
              <div className="mt-6 space-y-6">
                <Button
                  variant="outline"
                  onClick={() => alert("Filtros restablecidos")}
                  className="w-full"
                >
                  <X className="w-5 h-5 mr-2 text-gray-500" />
                  Restablecer filtros
                </Button>
              </div>
            )}
          </div>
        </aside>

        {/* Main content */}
        <main className={`
          flex-1 
          p-4 md:p-6 
          w-full
          ${!sidebarOpen ? 'md:ml-20' : ''}
        `}>
          <h1 className="text-3xl font-bold text-foreground mb-6">
            Gráficas Interactivas
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Grafica 1
              </h2>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Grafica 2
              </h2>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}