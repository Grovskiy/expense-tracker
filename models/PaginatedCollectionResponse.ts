export interface PaginatedCollectionResponse<T> {
  data: T[];
  limit: number;
  offset: number;
  total: number;
}
