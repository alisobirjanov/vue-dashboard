import { defineStore } from 'pinia'
import type { IClient } from '@/types'

export const useClientsStore = defineStore('clients', {
  state: () => ({
    clients: [
      {
        fullName: 'Ervin Howell',
        dateOfBirth: '1995-05-21',
        address: 'Douglas Extension',
        phone: '1-463-123-4447',
        id: 1238478,
      },
      {
        fullName: 'Leanne Graham',
        dateOfBirth: '2000-01-13',
        address: 'Kulas Light',
        phone: '1-770-736-8031',
        id: 1234567,
      }
    ]
  }) as { clients: IClient[] },
  getters: {
    getClients(state) {
      return state.clients
    }
  },
  actions: {
    addClient(payload: IClient) {
      this.clients.unshift(payload)
    },
    getClient(id: number) {
      return this.clients.find(item => item.id === id)
    },
    deleteClient(id: number) {
      this.clients = this.clients.filter(i => i.id !== id)
    },
    editClient(payload: IClient) {
      this.clients = this.clients.map(item => {
        if (payload.id === item.id) {
          return payload
        }
        return item
      })
    }
  }
})