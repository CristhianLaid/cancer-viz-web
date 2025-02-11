import { GraphBase } from "../../domain/interfaces";
import { GraphApi } from "../api/graphApi";

class GraphService {
  private readonly graphApi: GraphApi;

  constructor() {
    this.graphApi = new GraphApi();
  }

  async getGraphsFromApi(
    filters: Record<string, any>
  ): Promise<{ data: GraphBase[]; total: number }> {
    try {
      const graphResponse = await this.graphApi.getGraphData(filters);
      return graphResponse;
    } catch (error) {
      throw error;
    }
  }
}

export const graphApiService = new GraphService();
