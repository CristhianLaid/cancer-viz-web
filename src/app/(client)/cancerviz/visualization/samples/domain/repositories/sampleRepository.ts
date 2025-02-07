import { SampleBase } from "../interfaces/SampleBase";


export abstract class SampleRepository {
  abstract getSamples(filters: Record<string, any>): Promise<{ data: SampleBase[]; total: number }>;
}
