import {
  CancerTypeBase,
  ConstructionProtocolBase,
  CountryBase,
  DataSourceBase,
  SampleTypeBase,
} from "../interfaces";

export abstract class SampleFilterRepository {
  abstract getSampleCountry(): Promise<CountryBase[]>;
  abstract getSampleCancerType(): Promise<CancerTypeBase[]>;
  abstract getSampleDataSource(): Promise<DataSourceBase[]>;
  abstract getSampleConstructorProtocol(): Promise<ConstructionProtocolBase[]>;
  abstract getSampleType(): Promise<SampleTypeBase[]>;
}