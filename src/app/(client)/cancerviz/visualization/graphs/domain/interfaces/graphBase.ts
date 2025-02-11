export interface GraphBase {
  id: number;
  projectId: string;
  cancerType: string;
  dataSource: string;
  accessionNo: string;
  country: string;
  sampleId: string;
  sampleType: string;
  constructionProtocol: string;
  age: string;
  survivalMonths: string;
  tumorSize: string;
  metastasisCount: string;
  transcriptomeAnalysis: string;
  metabolicProfile: string;
  createdAt: string;
  updatedAt: string;
}
