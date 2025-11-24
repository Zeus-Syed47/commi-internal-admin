"use clients"
import { getClients } from "@/api/clients"
import { useQuery } from "@tanstack/react-query"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"


function useClients(){

    const [limit, setLimit] = useState(25);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const {data: clients, isLoading, refetch} = useQuery({
        queryKey: ["clients", limit, currentPage, search],
        queryFn: ()=>{

            let paramObj: any = {
                limit: limit,
                offset: currentPage,
            };

            if(search){
                paramObj.search = search
            }
            return getClients(paramObj)
        }
    })

    return{
        clients: clients?.data,
        isLoading,
        search, setSearch,
        currentPage, setCurrentPage
    }

}

export default useClients