import { CountryBase, DataSourceBase } from "../../../domain/interfaces";
import { GraphFilterRepository } from "../../../domain/repository/graphFilterRepository";
import { httpClient } from "../httpClient";


export class GraphFilterApi implements GraphFilterRepository {
  getGraphCountry(): Promise<CountryBase[]> {
    return httpClient({
      url: `/api/graph/countries`,
      options: {
        method: "GET",
      },
    });
  }

  getGraphDataSource(): Promise<DataSourceBase[]> {
    return httpClient({
      url: `/api/graph/data-sources`,
      options: {
        method: "GET",
      },
    });
  }

}
