import { GraphBase } from "../../domain/interfaces/graphBase";
import { GraphRepository } from "../../domain/repository/graphRepository";
import { httpClient } from "./httpClient";

export class GraphApi implements GraphRepository {
  getGraphData(
    filters: Record<string, any>
  ): Promise<{ data: GraphBase[]; total: number }> {
    const query = new URLSearchParams(filters).toString();
    return httpClient({
      url: `/api/cancerviz?${query}`,
      options: {
        method: "GET",
      },
    });
  }
}
