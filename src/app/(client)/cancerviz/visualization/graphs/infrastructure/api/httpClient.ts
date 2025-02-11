import { configEnv } from "@/config/configEnv";

interface Props {
  url: string;
  options?: RequestInit;
}
export async function httpClient<T>({ url, options }: Props): Promise<T> {
  const { NEXT_PUBLIC_CANCER_VIZ_SERVICE_URL } = configEnv;
  const response = await fetch(`${NEXT_PUBLIC_CANCER_VIZ_SERVICE_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}
