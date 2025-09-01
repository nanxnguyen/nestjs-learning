export class Pagination {
  private readonly page: number;
  private readonly take: number;
  private readonly totalRecords: number;
  private readonly totalPages: number;

  constructor(page: number, take: number, totalRecords: number) {
    this.page = page;
    this.take = take;
    this.totalRecords = totalRecords;
    this.totalPages = Math.ceil(totalRecords / take);
  }
}
