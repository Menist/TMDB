import {baseApi} from "../../app/providers";
import {useSelector} from "react-redux";
import type {RootState} from "../../app/providers/store";


export const useGlobalLoading = () => {
  const queries = useSelector((state: RootState) =>
    state[baseApi.reducerPath]?.queries || {}
  );
  return Object.values(queries).some(query => query?.status === 'pending');
};