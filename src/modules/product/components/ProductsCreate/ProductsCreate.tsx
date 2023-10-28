import { zodResolver } from '@hookform/resolvers/zod';
import { useI18nContext } from '@i18n/i18n-react';
import { Button, Image, SimpleGrid, Text, Transition } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import {
  CreateProductFormSchema,
  CreateProductSchema,
  createProductFormSchema,
} from '@product/api/product.schema';
import { getProductsCollection } from '@product/utils/products.util';
import FileDropzoneForm from '@shared/components/smart/FileDropzoneForm/FileDropzoneForm';
import NumberInputForm from '@shared/components/smart/NumberInputForm/NumberInputForm';
import TextInputForm from '@shared/components/smart/TextInputForm/TextInputForm';
import { toastError } from '@shared/utils/helper/helper.util';
import { addDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Form, FormSubmitHandler, useForm } from 'react-hook-form';
import { useFirestore, useStorage, useUser } from 'reactfire';

export default function ProductsCreate() {
  const { LL } = useI18nContext();
  const user = useUser();
  const storage = useStorage();
  const firestore = useFirestore();
  const productsCollection = getProductsCollection(firestore);

  const form = useForm<CreateProductFormSchema>({
    mode: 'onChange',
    resolver: zodResolver(createProductFormSchema),
    values: {
      userId: user.data?.uid ?? 'unknown-user-id',
      title: '',
      stock: 0,
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
      // save product image to firestorage
      const image = values.data.files[0];
      const filePath = `images/products/${image.name}`;
      const imageRef = ref(storage, filePath);
      await uploadBytesResumable(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);

      // save product data to firestore
      const product = {
        imageUrl,
        userId: values.data.userId,
        title: values.data.title,
        stock: values.data.stock,
        price: values.data.price,
      } satisfies CreateProductSchema;
      const result = await addDoc(productsCollection, product);

      showNotification({
        color: 'green',
        title: 'Mutation Success',
        message: `Product created with id: ${result.id}`,
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
        w="100%"
        label="Title"
        placeholder="Product title..."
      />

      <NumberInputForm
        control={form.control}
        name="stock"
        w="100%"
        thousandSeparator="."
        decimalSeparator=","
        label="Stock"
        placeholder="Product stock..."
      />

      <NumberInputForm
        control={form.control}
        name="price"
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
