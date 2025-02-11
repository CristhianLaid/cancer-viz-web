import {
  CountryBase,
  DataSourceBase,
} from "../../domain/interfaces";
import { GraphFilterApi } from "../api/filter/GraphFilterApi";


class GraphFilterApiService {
  private readonly graphApi: GraphFilterApi;

  constructor() {
    this.graphApi = new GraphFilterApi();
  }

  async getGraphCountryFromApi(): Promise<CountryBase[]> {
    try {
      const countries = await this.graphApi.getGraphCountry();
      return countries;
    } catch (error) {
      throw error;
    }
  }

  async getGraphDataSourceFromApi(): Promise<DataSourceBase[]> {
    try {
      const dataSources = await this.graphApi.getGraphDataSource();
      return dataSources;
    } catch (error) {
      throw error;
    }
  }

}

export const graphFilterApiService = new GraphFilterApiService();
