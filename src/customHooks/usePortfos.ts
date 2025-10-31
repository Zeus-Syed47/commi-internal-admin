import { getPortfos } from "@/app/api/portfos";
import useStore from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export function usePortfos(props) {
  const { hold } = props ?? {};
  const updatePortfos = useStore((state) => state?.updatePortfos);

  const query = useQuery({
    queryKey: ["portfos"],
    queryFn: getPortfos,
    enabled: !hold,
  });

  useEffect(() => {
    if (query.data) {
      updatePortfos(query.data);
    }
  }, [query.data, updatePortfos]);

  return query;
}
