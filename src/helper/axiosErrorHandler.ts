import { AxiosError } from 'axios';

interface ErrorResponse {
  message: string;
}

export function handleAxiosError<T extends ErrorResponse>(error: unknown): T | undefined {
  if (isAxiosError(error)) {
    const axiosError = error as AxiosError<T>;
    return axiosError.response?.data;
  }
  return undefined;
}

function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).isAxiosError !== undefined;
}
