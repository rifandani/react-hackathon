import { useI18nContext } from '@i18n/i18n-react';
import { SimpleGrid } from '@mantine/core';
import { ProductSchema } from '@product/api/product.schema';
import { getProductsCollection } from '@product/utils/products.util';
import ErrorDisplay from '@shared/components/dumb/ErrorDisplay/ErrorDisplay';
import For from '@shared/components/dumb/For/For';
import LoadingBar from '@shared/components/dumb/LoadingBar/LoadingBar';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import ProductsItem from '../ProductsItem/ProductsItem';

export default function ProductsList() {
  const { LL } = useI18nContext();
  const firestore = useFirestore();
  const productsQuery = useFirestoreCollectionData(
    getProductsCollection(firestore),
    { idField: 'id' },
  );

  if (productsQuery.status === 'loading') {
    return <LoadingBar />;
  }

  if (productsQuery.error) {
    return (
      <ErrorDisplay
        error={productsQuery.error}
        alert={{ title: 'Products query error' }}
      />
    );
  }

  return (
    <>
      {productsQuery.status === 'success' && (
        <SimpleGrid spacing="md" cols={{ base: 1, sm: 2, md: 3 }} mb="md">
          <For
            each={productsQuery.data as ProductSchema[]}
            fallback={
              <div className="flex items-center justify-center py-5">
                {LL.common.empty()}
              </div>
            }
          >
            {(product) => <ProductsItem key={product.id} product={product} />}
          </For>
        </SimpleGrid>
      )}
    </>
  );
}
