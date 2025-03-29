
import { useToast as useHookToast, toast } from "@/hooks/use-toast";

export function useToast() {
  try {
    return useHookToast();
  } catch (e) {
    // Fallback in case of context issues
    return { toast, toasts: [] };
  }
}

export { toast };
