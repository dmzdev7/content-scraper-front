export interface ApiValidationError {
  path: string[];
  message: string;
}

export interface ApiResponse<T> {
  status: "success" | "error";
  data: T;
  message?: string;
  errors?: ApiValidationError[];
}
