export type PageDto = {
  limit: number;
  offset: number;
  currentPage: number;
};

export const PageDefaults: PageDto = { limit: 20, offset: 0, currentPage: 1 };
