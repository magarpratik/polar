'use client'

import { DashboardBody } from '@/components/Layout/DashboardLayout'
import { InlineModal } from '@/components/Modal/InlineModal'
import { useModal } from '@/components/Modal/useModal'
import { CreateProductModal } from '@/components/Products/CreateProductModal'
import { EditProductModal } from '@/components/Products/EditProductModal'
import { ProductCard } from '@/components/Products/ProductCard'
import ProductPriceTypeSelect from '@/components/Products/ProductPriceTypeSelect'
import { useCurrentOrgAndRepoFromURL } from '@/hooks'
import { useProduct, useProducts } from '@/hooks/queries/products'
import { AddOutlined } from '@mui/icons-material'
import { ProductPriceType } from '@polar-sh/sdk'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import Button from 'polarkit/components/ui/atoms/button'
import { useCallback, useEffect } from 'react'

export default function ClientPage() {
  const { org } = useCurrentOrgAndRepoFromURL()
  const searchParams = useSearchParams()
  const router = useRouter()

  const {
    isShown: isCreateProductModalShown,
    hide: hideCreateProductModal,
    show: showCreateProductModal,
  } = useModal()

  const {
    isShown: isEditProductModalShown,
    hide: hideEditProductModal,
    show: showEditProductModal,
  } = useModal()

  useEffect(() => {
    if (searchParams?.has('product')) {
      showEditProductModal()
    } else {
      hideEditProductModal()
    }
  }, [searchParams, showEditProductModal, hideEditProductModal])

  const productPriceType: ProductPriceType | 'all' =
    (searchParams?.get('type') as ProductPriceType | 'all') || 'all'
  const onFilterChange = useCallback(
    (value: ProductPriceType | 'all') => {
      const params = new URLSearchParams({ type: value })
      router.push(
        `/maintainer/${org?.name}/products/overview?${params.toString()}`,
      )
    },
    [router, org],
  )

  const { data: product } = useProduct(
    searchParams?.get('product') ?? undefined,
  )
  const products = useProducts(org?.id, {
    isRecurring:
      productPriceType === 'all'
        ? undefined
        : productPriceType === ProductPriceType.RECURRING,
  })

  return (
    <DashboardBody className="flex flex-col gap-8">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-lg">Overview</h1>
        <div className="flex w-1/3 flex-row items-center gap-2 md:w-1/5">
          <ProductPriceTypeSelect
            value={productPriceType}
            onChange={onFilterChange}
          />
          <Button size="icon" onClick={showCreateProductModal}>
            <AddOutlined className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.data?.items?.map((product) => (
          <Link
            key={product.id}
            href={`/maintainer/${org?.name}/products/overview?product=${product.id}&type=${productPriceType}`}
          >
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
      {org && (
        <>
          <InlineModal
            isShown={isCreateProductModalShown}
            hide={hideCreateProductModal}
            modalContent={
              <CreateProductModal
                organization={org}
                productPriceType={
                  productPriceType !== 'all' ? productPriceType : undefined
                }
                hide={hideCreateProductModal}
              />
            }
          />
          {product && (
            <InlineModal
              isShown={isEditProductModalShown}
              hide={() => {
                router.replace(
                  `/maintainer/${org?.name}/products/overview?type=${productPriceType}`,
                )
              }}
              modalContent={
                <EditProductModal
                  product={product}
                  organization={org}
                  hide={() => {
                    router.replace(
                      `/maintainer/${org?.name}/products/overview?type=${productPriceType}`,
                    )
                  }}
                />
              }
            />
          )}
        </>
      )}
    </DashboardBody>
  )
}
