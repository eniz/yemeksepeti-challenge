import { getProductById } from './products';

const basketProducts = [];

export const getBasketProductById = id => basketProducts.find(prd => prd.Product.ProductId === id)

export const getBasketProducts = () => basketProducts

export function getTotalPrice() {
  let total = 0;

  total = basketProducts.reduce((acc, prd) => {
    const price = parseFloat(prd.Product.ExtendedPrice.replace(',', '.')) * prd.Count
    return acc + price;
  }, 0)

  return total;
}

export function addProduct(productId, count) {
  let productCount = +count;

  const currentProduct = getBasketProductById(productId);
  if (currentProduct) {
    currentProduct.Count += productCount;
  } else {
    const product = getProductById(productId);
    if (product) {
      basketProducts.push({ Product: product, Count: productCount });
    }
  }
}

export function removeProduct(productId) {
  for (let i = basketProducts.length - 1; i >= 0; i--) {
    if (basketProducts[i].Product.ProductId === productId) {
      basketProducts.splice(i, 1);
      return;
    }
  }
}

export function updateProductCount(productId, count) {
  let productCount = count;
  const selectedProduct = getBasketProductById(productId);
  if (selectedProduct) {
    selectedProduct.Count = +productCount;
  }
}


