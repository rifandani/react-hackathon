import { useI18nContext } from '@i18n/i18n-react';
import { Carousel } from '@mantine/carousel';
import { Button, Card, Divider, Flex, Image, Stack, Text } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { ProductSchema } from '@product/api/product.schema';
import { getProductDocument } from '@product/utils/products.util';
import { toastError } from '@shared/utils/helper/helper.util';
import dayjs from 'dayjs';
import Autoplay from 'embla-carousel-autoplay';
import { deleteDoc } from 'firebase/firestore';
import { deleteObject, listAll, ref } from 'firebase/storage';
import { FormEvent, useRef } from 'react';
import { useFirestore, useStorage, useUser } from 'reactfire';
import classes from './ProductsItem.module.css';

interface Props {
  product: ProductSchema;
}

export default function ProductsItem({ product }: Props) {
  const user = useUser();
  const { LL } = useI18nContext();
  const firestore = useFirestore();
  const storage = useStorage();
  const autoplay = useRef(Autoplay({ delay: 2000 }));

  // #region HANDLERS
  const onSubmitDeleteProduct =
    (_product: ProductSchema) => async (evt: FormEvent<HTMLFormElement>) => {
      evt.preventDefault();

      // only allow user who belongs the product
      if (_product.userId !== user.data?.uid) return;

      try {
        // delete product document
        const productDoc = getProductDocument(firestore, _product.id);
        await deleteDoc(productDoc);

        // delete all images in storage
        const productImagesPath = `images/products/${_product.id}`;
        const imagesRef = ref(storage, productImagesPath);
        const imageList = await listAll(imagesRef);
        await Promise.all(
          imageList.items.map(async (imageRef) => {
            await deleteObject(imageRef);
          }),
        );

        showNotification({
          color: 'green',
          title: 'Mutation Success',
          message: `Product deleted with id: ${_product.id}`,
        });
      } catch (err) {
        toastError(err);
      }
    };
  // #endregion

  return (
    <form
      id={`product-${product.id}`}
      className="duration-300 ease-in-out animate-in slide-in-from-left-5"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={onSubmitDeleteProduct(product)}
    >
      <input type="hidden" name="productId" value={product.id} />

      <Card withBorder radius="md" className={classes.card}>
        <Card.Section className={classes.imageSection}>
          <Carousel
            withIndicators
            classNames={{
              container: classes.container,
              indicator: classes.indicator,
            }}
            plugins={[autoplay.current]}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
          >
            {product.imageUrls.map((imageUrl) => (
              <Carousel.Slide key={imageUrl}>
                <Image
                  src={imageUrl}
                  alt={product.title}
                  className="h-full w-full object-contain"
                />
              </Carousel.Slide>
            ))}
          </Carousel>
        </Card.Section>

        <Card.Section className={classes.section}>
          <Stack>
            <Flex align="center" justify="space-between">
              <Text fz="xl" fw={700}>
                {product.title}
              </Text>

              <Text fz="sm" c="dimmed">
                {product.stock} left
              </Text>
            </Flex>

            <Text fz="lg">
              {Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
              }).format(product.price)}
            </Text>

            {product.restockDate && (
              <Text fz="sm" c="dimmed">
                Restock at:{' '}
                {dayjs(product.restockDate).format('ddd, DD-MM-YYYY')}
              </Text>
            )}

            {product.userId === user.data?.uid && (
              <>
                <Divider />
                <Button type="submit" color="red" variant="subtle">
                  {LL.forms.remove({ icon: '💥' })}
                </Button>
              </>
            )}
          </Stack>
        </Card.Section>
      </Card>
    </form>
  );
}
