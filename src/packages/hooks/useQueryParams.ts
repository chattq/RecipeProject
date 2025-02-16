import { useSearchParams } from "react-router-dom";

export default function useQueryParams() {
  const [searchParams] = useSearchParams();
  const dataParams: any = Object.fromEntries([...searchParams]);
  return Object.keys(dataParams).length === 0 ? "" : dataParams;
}
