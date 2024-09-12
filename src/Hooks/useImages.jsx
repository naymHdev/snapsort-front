import { useQuery } from "@tanstack/react-query";
import PublicAxios from "./localAxios";

const useImages = () => {
  const {
    data: isImages = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["isImages"],
    queryFn: async () => {
      const res = await PublicAxios.get("/api/images");
      return res.data;
    },
  });
  return [isImages, refetch, isLoading];
};

export default useImages;
