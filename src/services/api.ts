/**
 * Client-Side Resilient API Service
 * Handles debouncing, request deduplication, AbortController timeouts, and graceful fallbacks.
 */

interface FetchOptions extends RequestInit {
  timeoutMs?: number;
}

// In-flight request deduplication map
const pendingRequests = new Map<string, Promise<any>>();

export async function fetchWithTimeout<T>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  const { timeoutMs = 8000, ...fetchOptions } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });

    clearTimeout(id);

    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
    }

    return (await response.json()) as T;
  } catch (error: any) {
    clearTimeout(id);
    if (error.name === 'AbortError') {
      throw new Error(`Request timed out after ${timeoutMs}ms: ${url}`);
    }
    throw error;
  }
}

/**
 * Deduplicated GET fetcher to prevent redundant simultaneous network requests
 */
export function deduplicatedFetch<T>(url: string, options?: FetchOptions): Promise<T> {
  if (pendingRequests.has(url)) {
    return pendingRequests.get(url) as Promise<T>;
  }

  const promise = fetchWithTimeout<T>(url, options).finally(() => {
    pendingRequests.delete(url);
  });

  pendingRequests.set(url, promise);
  return promise;
}

/**
 * Simple client-side debounce utility
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  waitMs: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), waitMs);
  };
}
