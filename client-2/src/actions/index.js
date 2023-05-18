export * from './category.action';
export * from './product.action';
export * from './auth.action';
export * from './product.action';
export * from './cart.action';
export * from './user.action';

export function AppImages(image) {
  return {
    type: 'APP_IMAGES',
    payload: image,
  };
}
export function Reconmendation(data) {
  return {
    type: 'PRODUCT_RECONMENDATION',
    payload: data,
  };
}

export function loginModel() {
  return {
    type: 'LOGIN_MODEL',
  };
}
