import { CountryBase } from "../interfaces/graphCountry";
import { DataSourceBase } from "../interfaces/graphDataSource";


export abstract class GraphFilterRepository {
  abstract getGraphCountry(): Promise<CountryBase[]>;
  abstract getGraphDataSource(): Promise<DataSourceBase[]>;
}