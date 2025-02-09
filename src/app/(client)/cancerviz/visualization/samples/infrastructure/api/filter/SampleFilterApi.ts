import {
  CancerTypeBase,
  ConstructionProtocolBase,
  CountryBase,
  DataSourceBase,
  SampleTypeBase,
} from "../../../domain/interfaces";
import { SampleFilterRepository } from "../../../domain/repositories/sampleFilterRepository";
import { httpClient } from "../httpClient";

export class SampleFilterApi implements SampleFilterRepository {
  getSampleCountry(): Promise<CountryBase[]> {
    return httpClient({
      url: `/api/sample/countries`,
      options: {
        method: "GET",
      },
    });
  }
  getSampleCancerType(): Promise<CancerTypeBase[]> {
    return httpClient({
      url: `/api/sample/cancer-types`,
      options: {
        method: "GET",
      },
    });
  }
  getSampleDataSource(): Promise<DataSourceBase[]> {
    return httpClient({
      url: `/api/sample/data-sources`,
      options: {
        method: "GET",
      },
    });
  }
  getSampleConstructorProtocol(): Promise<ConstructionProtocolBase[]> {
    return httpClient({
      url: `/api/sample/construction-protocols`,
      options: {
        method: "GET",
      },
    });
  }
  getSampleType(): Promise<SampleTypeBase[]> {
    return httpClient({
      url: `/api/sample/sample-types`,
      options: {
        method: "GET",
      },
    });
  }
}
