"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import useStore from "@/store";
import { getDatasources, importDatasources } from "@/api/datasources";
import { useCallback, useRef, useState } from "react";


function useDatasources() {
    const inputRef = useRef();

    const currentUser = useStore((state) => state?.currentUser);
    const [limit, setLimit] = useState(25);
    const [currentPage, setCurrentPage] = useState(1);
    const [datasourcesFile, setDatasourcesFile] = useState(null);
    const [openDrawer, setOpenDrawer] = useState(false)
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [website, setWebsite] = useState('');


    const { isPending: isDatasourcesLoading, data, refetch: refetchDatasources } = useQuery({
        queryKey: ['getDatasources'],
        queryFn: () => {
            return getDatasources({
                company_id: currentUser?.company?.id
            })
        },
    })

    const { mutate: importDatasourcesApi, isPending: isImporting } =
        useMutation({
            mutationKey: ["importDatasources"],
            mutationFn: importDatasources,
            onSuccess(data, variables, context) {
                if (data) {
                    refetchDatasources();
                    setOpenDrawer(false)
                    setDatasourcesFile(null)
                }
            },
        });

    const importDatasourcesHandler = useCallback(() => {
        if (currentUser?.company?.id) {

            let formData = new FormData()
            formData.append('company_id', currentUser?.company?.id)
            formData.append('name', name)
            formData.append('description', description)
            if (website) {
                formData.append('website_url', website)
            }
            if (datasourcesFile) {
                formData.append('file', datasourcesFile)
            }

            importDatasourcesApi(formData)
        }
    }, [currentUser, importDatasourcesApi, datasourcesFile, description, website, name]);

    return {
        isLoading: isDatasourcesLoading,
        datasources: data?.data?.rows ?? [],
        totalRows: data?.data?.totalRows ?? 0,
        refetchDatasources,
        currentPage, setCurrentPage,
        datasourcesFile, setDatasourcesFile,
        openDrawer, setOpenDrawer, importDatasourcesHandler, isImporting,
        currentUser, inputRef, description, setDescription, website, setWebsite,
        name, setName
    };
}

export default useDatasources;
