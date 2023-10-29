import { IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { MAX_SIZE_FILE_PRODUCT } from '@product/constants/products.constant';
import dayjs from 'dayjs';
import { ArrayIndices } from 'type-fest';
import { z } from 'zod';

// #region ENTITY SCHEMA
export const productSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string(),
  stock: z.number(),
  restockDate: z.number().nullable(), // milliseconds
  price: z.number(),
  imageUrl: z.string().url(),
  createdAt: z.number(), // milliseconds
  updatedAt: z.number(), // milliseconds
});
export const detailProductSchema = productSchema.pick({ id: true });
export const createProductSchema = productSchema.omit({ id: true });
export const createProductFormSchema = z.object({
  userId: z.string(),
  title: z.string().min(3),
  stock: z.number().min(0),
  restockDate: z
    // .custom<Dayjs>()
    // .refine((date) => date.isAfter(dayjs(new Date()), 'day'))
    .date()
    .min(dayjs().startOf('day').toDate())
    .nullable(),
  price: z.number().min(0),
  files: z
    .array(z.custom<File>())
    .refine((files) => files.length === 1, 'You should choose only 1 file')
    .refine(
      (files) => files.every((file) => file instanceof File),
      'Expected a file',
    )
    .refine(
      (files) => files.every((file) => file.size <= MAX_SIZE_FILE_PRODUCT),
      'File size should be less than 5MB',
    )
    .refine(
      (files) =>
        files.every((file) =>
          IMAGE_MIME_TYPE.includes(
            file.type as ArrayIndices<typeof IMAGE_MIME_TYPE>,
          ),
        ),
      'Only image file types are allowed',
    ),
});
export const updateProductSchema = productSchema.pick({
  stock: true,
});
export const deleteProductSchema = detailProductSchema;
// #endregion

// #region SCHEMA TYPES
export type ProductSchema = z.infer<typeof productSchema>;
export type DetailProductSchema = z.infer<typeof detailProductSchema>;
export type CreateProductSchema = z.infer<typeof createProductSchema>;
export type CreateProductFormSchema = z.infer<typeof createProductFormSchema>;
export type UpdateProductSchema = z.infer<typeof updateProductSchema>;
export type DeleteProductSchema = z.infer<typeof deleteProductSchema>;
// #endregion
