import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { SelectionListType } from '@/views/operations/Orders.vue'

export const useOrderStore = defineStore('order', () => {
    const rowDate = ref<SelectionListType>({
        orderNo: '',
        equipmentNo: '',
        date: '',
        startTime: '',
        endTime: '',
        money: '',
        pay: '',
        status: 1,
    })
    const setRowData = (row:SelectionListType)=>{
        rowDate.value = row
    }
    return{
        rowDate,setRowData
    }
})
