import { SampleBase } from "../../domain/interfaces/SampleBase";
import { SampleRepository } from "../../domain/repositories/sampleRepository";
import { httpClient } from "./httpClient";


export class SampleApi implements SampleRepository {
    getSamples(filters: Record<string, any>): Promise<{ data: SampleBase[]; total: number; }> {
        const query = new URLSearchParams(filters).toString();
        return httpClient({
            url: `/api/cancerviz?${query}`,
            options: {
                method: 'GET',
            },
        });
    };
};