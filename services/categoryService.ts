import axiosInstance from "@/services/axiosInstance";

const CATEGORY_API_PREFIX = "/api/v1/categories";

export type CategoryApiEnvelope<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type CategoryItem = {
  categoryId: number;
  name: string;
  description: string;
  isActive: boolean;
};

export type CategoryQueryParams = {
  includeInactive?: boolean;
};

export type CreateCategoryPayload = {
  name: string;
  description: string;
};

export type UpdateCategoryPayload = {
  name?: string;
  description?: string;
};

export type DeactivateCategoryResponseData = {
  categoryId: number;
  isActive: boolean;
};

export const getCategories = async (params?: CategoryQueryParams) => {
  const response = await axiosInstance.get<CategoryApiEnvelope<CategoryItem[]>>(CATEGORY_API_PREFIX, {
    params,
  });

  return response.data;
};

export const getCategoryDetail = async (categoryId: number) => {
  const response = await axiosInstance.get<CategoryApiEnvelope<CategoryItem>>(
    `${CATEGORY_API_PREFIX}/${categoryId}`,
  );

  return response.data;
};

export const createCategory = async (payload: CreateCategoryPayload) => {
  const response = await axiosInstance.post<CategoryApiEnvelope<CategoryItem>>(
    CATEGORY_API_PREFIX,
    payload,
  );

  return response.data;
};

export const updateCategory = async (categoryId: number, payload: UpdateCategoryPayload) => {
  const response = await axiosInstance.patch<CategoryApiEnvelope<CategoryItem>>(
    `${CATEGORY_API_PREFIX}/${categoryId}`,
    payload,
  );

  return response.data;
};

export const deactivateCategory = async (categoryId: number) => {
  const response = await axiosInstance.delete<CategoryApiEnvelope<DeactivateCategoryResponseData>>(
    `${CATEGORY_API_PREFIX}/${categoryId}`,
  );

  return response.data;
};
