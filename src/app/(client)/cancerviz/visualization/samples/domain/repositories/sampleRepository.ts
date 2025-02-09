import { SampleBase } from "../interfaces/sampleBase";

export abstract class SampleRepository {
  abstract getSamples(
    filters: Record<string, any>
  ): Promise<{ data: SampleBase[]; total: number }>;
}
