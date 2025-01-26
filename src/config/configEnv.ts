
interface IConfigEnv {
    CANCER_VIZ_SERVICE_URL: string;
}


export const configEnv: IConfigEnv = {
    CANCER_VIZ_SERVICE_URL: process.env.CANCER_VIZ_SERVICE_URL as string,
}