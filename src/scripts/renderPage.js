import { qs, qsa } from './utils';
import { getFilteredProducts } from './products';
import { getBasketProducts, getTotalPrice, updateProductCount, removeProduct, addProduct } from './basket';

function renderMenuItem(product) {
  const { ProductId, DisplayName, Description, ExtendedPrice } = product;

  return `<div class="product">
    <div class="product-add" data-productid="${ProductId}">
      <input type="hidden" value="1" />
      <button type="button">+</button>
    </div>
    <div class="product-info">
      <div class="product-name">${DisplayName}</div>
      <div class="product-content">${Description}</div>
    </div>
    <div class="product-price">
      ${ExtendedPrice} TL
    </div>
  </div>`;
}

export function renderMenu(categories) {
  let html = '';

  for (let i = 0; i < categories.length; i++) {
    let productsHtml = '';
    for (let j = 0; j < categories[i].Products.length; j++) {
      productsHtml += renderMenuItem(categories[i].Products[j]);
    }
    html += `<div class="category">
        <div class="category-header">
          ${categories[i].DisplayName}
        </div>
        <div class="category-content">
          ${productsHtml}
        </div>
      </div>`;
  }

  return html;
}

const menuElement = qs('.menu');
export function renderMenuList(searchText) {
  menuElement.innerHTML = renderMenu(getFilteredProducts(searchText));
  const addButtons = qsa('.product-add > button', menuElement);
  for (let i = 0; i < addButtons.length; i++) {
    addButtons[i].addEventListener('click', function(event) {
      event.preventDefault();
      const parent = this.parentElement;
      const productId = parent.dataset.productid;
      const count = parent.querySelector('input').value;
      addProduct(productId, count);
      reRenderBasket();
    });
  }
}

function renderBasketItem(selectedBasketItem) {
  const {
    Product: { ProductId, DisplayName, ExtendedPrice },
    Count,
  } = selectedBasketItem;

  return `<tr data-productid="${ProductId}">
    <td class="basket-product-name">${DisplayName}</td>
    <td class="basket-product-count">
      <input type="number" name="" value=${Count} />
    </td>
    <td class="basket-product-price">${ExtendedPrice} TL</td>
    <td class="basket-product-remove">x</td>
  </tr>
  `;
}

function renderBasket(basket) {
  if (basket.length > 0) {
    let basketHtml = '<table>';
    for (let i = 0; i < basket.length; i++) {
      basketHtml += renderBasketItem(basket[i]);
    }
    basketHtml += '</table>';
    return basketHtml;
  }
  return '<div class="text-center">Sepetiniz Henüz Boş.</div>';
}

renderMenuList('');

function reRenderBasket() {
  const basketElm = qs('.basket');
  basketElm.innerHTML = renderBasket(getBasketProducts());
  const countInputs = qsa('input', basketElm);
  for (let i = 0; i < countInputs.length; i++) {
    countInputs[i].addEventListener('change', function(event) {
      event.preventDefault();
      const productId = this.parentElement.parentElement.dataset.productid;
      const count = this.value;
      updateProductCount(productId, count);
      qs('.basket-totalPrice').innerHTML = getTotalPrice().toFixed(2) + " TL";
    });
  }
  const removeButtons = qsa('.basket-product-remove', basketElm)
  for (let i = 0; i < removeButtons.length; i++) {
    removeButtons[i].addEventListener('click', function(event) {
      event.preventDefault();
      const productId = this.parentElement.dataset.productid;
      removeProduct(productId);
      reRenderBasket();
    });
  }
  qs('.basket-totalPrice').innerHTML = getTotalPrice().toFixed(2) + " TL";
}
reRenderBasket();
