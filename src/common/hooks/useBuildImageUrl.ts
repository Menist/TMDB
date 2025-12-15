import {useGetConfigurationQuery} from "../../features/config/api/configApi";

export function useBuildImageUrl(): string | undefined {
  const {data: config} = useGetConfigurationQuery()
  if (!config) return undefined;
  return`${config.images.secure_base_url}${config.images.backdrop_sizes[0]}`
}