export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export type globalResponse<T> = ApiResponse<T>;
