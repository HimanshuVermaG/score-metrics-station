
import { useToast as useHookToast, toast } from "@/hooks/use-toast";

export function useToast() {
  return useHookToast();
}

export { toast };
