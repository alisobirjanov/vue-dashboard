import { defineStore } from 'pinia'
import type { IOrder } from '@/types'

export const useOrdersStore = defineStore('orders', {
  state: () => ({
    orders: [
      {
        client: 1234567,
        products: [
            {
                name: "iPhone 9",
                price: 549,
                quantity: 2
            }
        ],
        amount: 1098,
        date: '6/14/2023',
        id: 1686750174956
      }
    ]
  }) as { orders: IOrder[] },
  getters: {
    getOrders(state) {
      return state.orders
    }
  },
  actions: {
    addOrder(payload: IOrder) {
      this.orders.unshift(payload)
    },
    getOrder(id: number) {
      return this.orders.find(item => item.id === id)
    },
    deleteOrder(id: number) {
      this.orders = this.orders.filter(i => i.id !== id)
    },
    editOrder(payload: IOrder) {
      this.orders = this.orders.map(item => {
        if(payload.id === item.id) {
          return payload
        }
        return item
      })
    }
  }
})