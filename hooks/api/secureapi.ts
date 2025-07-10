// hooks/useApi.ts
import { useQuery, useMutation, UseQueryOptions } from '@tanstack/react-query';
import { showToast } from '../filtered-toast';
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};


// 🧠 For GET requests
type UseApiProps<T> = {
  endpoint: string;
  method?: HttpMethod;
  queryKey?: any[];
  enabled?: boolean;
  body?: any;
  token?: string; // ✅ Optional token from caller
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
};

export function useApiQuery<T = unknown>({
  endpoint,
  queryKey = [endpoint],
  enabled = true,
  body,
  token,
  onSuccess,
  onError,
}: UseApiProps<T>) {
  return useQuery<ApiResponse<T>, Error>({
    queryKey,
    enabled,
    queryFn: async () => {
      const authToken = token

      const res = await fetch(`/api/bun${endpoint}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
      });

      const json: ApiResponse<T> = await res.json();
      if (!json.success) throw new Error(json.error || 'API Error');
      return json;
    },
    onSuccess: (response: any) => {
      console.log(response, "sdfladf")
      if (response.data) {
        onSuccess?.(response.data);
      }
    },
    onError: (err: any) => {
      console.log(err, "error when fetcching")
      showToast({
        title: 'Error',
        description: err.message,
      });
      onError?.(err);
    },
  } as UseQueryOptions<ApiResponse<T>, Error>);
}






// 🧠 For POST, PUT, DELETE, PATCH
// 🧠 For POST, PUT, DELETE, PATCH
export function useApiMutation<T = any>({
  endpoint,
  method = 'POST',
  onSuccess,
  onError,
  token,
}: Omit<UseApiProps<T>, 'queryKey' | 'enabled' | 'body'>) {
  return useMutation<ApiResponse<T>, Error, any>({
    mutationFn: async (body) => {
      const tokens = token
      const res = await fetch(`/api/bun${endpoint}`, {
        method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(body),
      });

      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'API Error');
      return json;
    },
    onSuccess: (data) => {
      // ✅ Show success toast manually only for login
      if (endpoint.includes('/login')) {
        showToast({
          title: 'success',
          description: 'Login successful!',
        });
      } else {
        showToast({
          title: 'success',
          description: (data as any)?.data?.message ?? 'Action successful',
        });
      }
      if (data.data !== undefined) {
        onSuccess?.(data.data); // ✅ only call if data is defined
      }
    },
    onError: (err) => {
      showToast({ title: 'Error', description: err.message });
      onError?.(err);
    },
  });
}

