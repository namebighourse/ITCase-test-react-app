const sizes = [
  { id: 1, label: 'XS', number: 44 },
  { id: 2, label: 'S', number: 46 },
  { id: 3, label: 'M', number: 48 },
  { id: 4, label: 'L', number: 50 },
  { id: 5, label: 'XL', number: 52 },
]

const products = [
  {
    id: 1,
    name: 'Футболка',
    colors: [
      {
        id: 1,
        name: 'черный',
        images: ['/src/assets/fake-api-image/t-shirt/black_front.png', '/src/assets/fake-api-image/t-shirt/black_back.png'],
        price: '123.00',
        description: 'Описание для "Футболка черный"',
        sizes: [1, 2, 3],
      },
      {
        id: 2,
        name: 'белый',
        images: ['/src/assets/fake-api-image/t-shirt/white_front.png', '/src/assets/fake-api-image/t-shirt/white_back.png'],
        price: '125.00',
        description: 'Описание для "Футболка белый"',
        sizes: [1, 2, 3, 4, 5],
      },
      {
        id: 3,
        name: 'серый',
        images: ['/src/assets/fake-api-image/t-shirt/gray_front.png', '/src/assets/fake-api-image/t-shirt/gray_back.png'],
        price: '120.00',
        description: 'Описание для "Футболка серый"',
        sizes: [],
      },
    ],
  },

  {
    id: 2,
    name: 'Майка',
    colors: [
      {
        id: 1,
        name: 'желтый',
        images: ['/src/assets/fake-api-image/jerkin/jerkin_v2/yellow_front-Photoroom.png', '/src/assets/fake-api-image/jerkin/jerkin_v2/yellow_back-Photoroom.png'],
        price: '88.00',
        description: 'Описание для "Майка желтый"',
        sizes: [1, 2, 3, 4, 5],
      },
      {
        id: 2,
        name: 'синий',
        images: ['/src/assets/fake-api-image/jerkin/jerkin_v2/blue_front-Photoroom.png', '/src/assets/fake-api-image/jerkin/jerkin_v2/blue_back-Photoroom.png'],
        price: '89.00',
        description: 'Описание для "Майка синий"',
        sizes: [2],
      },
      {
        id: 3,
        name: 'черный',
        images: ['/src/assets/fake-api-image/jerkin/jerkin_v2/black_front-Photoroom.png', '/src/assets/fake-api-image/jerkin/jerkin_v2/black_back-Photoroom.png'],
        price: '90.00',
        description: 'Описание для "Майка черный"',
        sizes: [],
      },
    ],
  },
]

function getSizes() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(sizes), 250)
  })
}

function getSize(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const size = sizes.find((size) => size.id == id)
      if (size) {
        resolve(size)
      } else {
        reject(new Error('getSize: Size not found'))
      }
    }, 250)
  })
}

function getProducts() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(products), 250)
  })
}

function getProduct(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = products.find((product) => product.id == id)
      if (product) {
        resolve(product)
      } else {
        reject(new Error('getProduct: Product not found'))
      }
    }, 250)
  })
}

function getProductColor(productID, colorID) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = products.find((product) => product.id == productID)

      if (!product) {
        return reject(new Error('getProductColor: Product not found'))
      }

      const color = product.colors.find((color) => color.id == colorID)

      if (color) {
        resolve(color)
      } else {
        reject(new Error('getProductColor: Color not found'))
      }
    }, 250)
  })
}

export { sizes, products, getSizes, getSize, getProducts, getProduct, getProductColor}
 