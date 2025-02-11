import { GraphBase } from "../interfaces/graphBase";

export abstract class GraphRepository {
    abstract getGraphData(
        filters: Record<string, any>
      ): Promise<{ data: GraphBase[]; total: number }>;
}