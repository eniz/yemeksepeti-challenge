import menus from './menuData.json';

const getMenus = () => menus.d.ResultSet

export function getProductById(searchId) {
  const menus = getMenus();

  for (let i = menus.length - 1; i >= 0; i--) {
    for (let j = menus[i].Products.length - 1; j >= 0; j--) {
      if (menus[i].Products[j].ProductId === searchId) {
        return menus[i].Products[j];
      }
    }
  }
  return null;
}

export function getFilteredProducts(searchText) {
  const result = JSON.parse(JSON.stringify(getMenus()));

  for (let i = result.length - 1; i >= 0; i--) {
    for (let j = result[i].Products.length - 1; j >= 0; j--) {
      const currentName = result[i].Products[j].DisplayName;
      if (currentName.toLowerCase().indexOf(searchText.toLowerCase()) === -1) {
        result[i].Products.splice(j, 1);
      }
    }
    if (result[i].Products.length === 0) {
      result.splice(i, 1);
    }
  }
  return result;
}
