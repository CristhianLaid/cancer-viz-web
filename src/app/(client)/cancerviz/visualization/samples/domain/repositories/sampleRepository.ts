import { SampleBase } from "../interfaces/SampleBase";


export interface SampleRepository {
  getSamples(filters: Record<string, any>): Promise<{ data: SampleBase[]; total: number }>;
}
