import { zodResolver } from '@hookform/resolvers/zod';
import { useI18nContext } from '@i18n/i18n-react';
import { Button, Image, SimpleGrid, Text, Transition } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import {
  CreateProductFormSchema,
  CreateProductSchema,
  createProductFormSchema,
} from '@product/api/product.schema';
import { getProductDocument } from '@product/utils/products.util';
import DatePickerInputForm from '@shared/components/smart/DatePickerInputForm/DatePickerInputForm';
import FileDropzoneForm from '@shared/components/smart/FileDropzoneForm/FileDropzoneForm';
import NumberInputForm from '@shared/components/smart/NumberInputForm/NumberInputForm';
import TextInputForm from '@shared/components/smart/TextInputForm/TextInputForm';
import { toastError } from '@shared/utils/helper/helper.util';
import { getDoc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { nanoid } from 'nanoid';
import { Form, FormSubmitHandler, useForm } from 'react-hook-form';
import { useFirestore, useStorage, useUser } from 'reactfire';

export default function ProductsCreate() {
  const { LL } = useI18nContext();
  const user = useUser();
  const storage = useStorage();
  const firestore = useFirestore();

  const form = useForm<CreateProductFormSchema>({
    mode: 'onChange',
    resolver: zodResolver(createProductFormSchema),
    values: {
      userId: user.data?.uid ?? 'unknown-user-id',
      title: '',
      stock: 0,
      restockDate: null,
      price: 0,
      files: [],
    },
  });

  const previews = form.getValues().files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);

    return (
      <Image
        key={index}
        src={imageUrl}
        onLoad={() => {
          URL.revokeObjectURL(imageUrl);
        }}
      />
    );
  });

  // #region HANDLERS
  const onSubmitProduct: FormSubmitHandler<CreateProductFormSchema> = async (
    values,
  ) => {
    try {
      const productId = nanoid();
      const product: CreateProductSchema = {
        imageUrls: [],
        userId: values.data.userId,
        title: values.data.title,
        stock: values.data.stock,
        restockDate: values.data.restockDate?.valueOf() ?? null,
        price: values.data.price,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      // save product image to firestorage
      product.imageUrls = await Promise.all(
        values.data.files.map(async (image) => {
          const filePath = `images/products/${productId}/${image.name}`;
          const imageRef = ref(storage, filePath);
          await uploadBytesResumable(imageRef, image);
          return getDownloadURL(imageRef);
        }),
      );

      // save product data to firestore
      const productDoc = await getDoc(getProductDocument(firestore, productId));
      await setDoc(productDoc.ref, product);

      showNotification({
        color: 'green',
        title: 'Mutation Success',
        message: `Product created with id: ${productId}`,
      });
    } catch (err) {
      toastError(err);
    }
  };
  // #endregion

  return (
    <Form
      className="mb-3 flex w-full flex-col gap-3"
      control={form.control}
      onSubmit={onSubmitProduct}
    >
      <TextInputForm
        control={form.control}
        name="title"
        withAsterisk
        w="100%"
        label="Title"
        placeholder="Product title..."
      />

      <NumberInputForm
        control={form.control}
        name="stock"
        withAsterisk
        w="100%"
        thousandSeparator="."
        decimalSeparator=","
        label="Stock"
        placeholder="Product stock..."
      />

      <DatePickerInputForm
        control={form.control}
        name="restockDate"
        clearable
        minDate={new Date()}
        w="100%"
        label="Restock date (if any)"
        placeholder="Pick date"
      />

      <NumberInputForm
        control={form.control}
        name="price"
        withAsterisk
        w="100%"
        prefix="Rp"
        thousandSeparator="."
        decimalSeparator=","
        label="Price"
        placeholder="Product price..."
      />

      <FileDropzoneForm control={form.control} name="files" />

      <Transition
        transition="skew-down"
        mounted={!!form.getFieldState('files').error}
      >
        {(style) => (
          <Text c="red" style={style}>
            {form.getFieldState('files').error?.message}
          </Text>
        )}
      </Transition>

      <Transition mounted={!!previews.length} transition="scale">
        {(style) => (
          <SimpleGrid cols={{ base: 1, sm: 4 }} my="sm" style={style}>
            {previews}
          </SimpleGrid>
        )}
      </Transition>

      <Button
        miw="10rem"
        type="submit"
        variant="outline"
        loading={form.formState.isSubmitting}
        disabled={!form.formState.isValid}
      >
        {LL.common.create()}
      </Button>
    </Form>
  );
}
