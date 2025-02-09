import {
  CancerTypeBase,
  ConstructionProtocolBase,
  CountryBase,
  DataSourceBase,
  SampleTypeBase,
} from "../../domain/interfaces";
import { SampleFilterApi } from "../api/filter/SampleFilterApi";


class SampleFilterApiService {
  private readonly sampleApi: SampleFilterApi;

  constructor() {
    this.sampleApi = new SampleFilterApi();
  }

  async getSampleCountryFromApi(): Promise<CountryBase[]> {
    try {
      const countries = await this.sampleApi.getSampleCountry();
      return countries;
    } catch (error) {
      throw error;
    }
  }

  async getSampleCancerTypeFromApi(): Promise<CancerTypeBase[]> {
    try {
      const cancerTypes = await this.sampleApi.getSampleCancerType();
      return cancerTypes;
    } catch (error) {
      throw error;
    }
  }

  async getSampleDataSourceFromApi(): Promise<DataSourceBase[]> {
    try {
      const dataSources = await this.sampleApi.getSampleDataSource();
      return dataSources;
    } catch (error) {
      throw error;
    }
  }

  async getSampleConstructorProtocolFromApi(): Promise<
    ConstructionProtocolBase[]
  > {
    try {
      const protocols = await this.sampleApi.getSampleConstructorProtocol();

      return protocols;
    } catch (error) {
      throw error;
    }
  }

  async getSampleTypeFromApi(): Promise<SampleTypeBase[]> {
    try {
      const sampleTypes = await this.sampleApi.getSampleType();
      return sampleTypes;
    } catch (error) {
      throw error;
    }
  }
}

export const sampleFilterApiService = new SampleFilterApiService();
