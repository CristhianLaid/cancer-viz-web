
interface IConfigEnv {
    NEXT_PUBLIC_CANCER_VIZ_SERVICE_URL: string;
}


export const configEnv: IConfigEnv = {
    NEXT_PUBLIC_CANCER_VIZ_SERVICE_URL: process.env.NEXT_PUBLIC_CANCER_VIZ_SERVICE_URL as string,
}