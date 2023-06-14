export interface IClient {
  fullName: string
  dateOfBirth: string
  address: string
  phone: string
  id: number
}

export interface IProduct {
  name: string
  price: number
  quantity: number
}

export interface IOrder {
  client: number
  products: IProduct[]
  amount: number
  date: string
  id: number
}
