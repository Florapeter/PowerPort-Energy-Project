import { defineStore } from "pinia";
import type { RowType } from "@/types/station";
import { ref } from "vue";

export const useStationStore = defineStore('station',()=>{
    const rowDate = ref<RowType>({
        name: '',
        id: '',
        city: '',
        fast: '',
        slow: '',
        status: 1,
        now: '',
        fault: '',
        person: '',
        tel: '',
    })

    const setRowData = (row:RowType)=>{
        rowDate.value = row
    }
    return{
        rowDate,setRowData
    }
})