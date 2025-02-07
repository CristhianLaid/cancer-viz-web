import { SampleBase } from "../../domain/interfaces/SampleBase";
import { SampleApi } from "../api/sampleApi";


class SampleService {
    private readonly sampleApi: SampleApi;

    constructor(){
        this.sampleApi = new SampleApi();
    }

    async getSamplesFromApi(filters: Record<string, any>): Promise<{ data: SampleBase[]; total: number; }>{
        try {
            const sampleResponse = await this.sampleApi.getSamples(filters);
    
            return sampleResponse;
        } catch (error) {
            throw error;
        }
    }
}

export const sampleApiService = new SampleService();