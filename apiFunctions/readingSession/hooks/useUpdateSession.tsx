import { useMutation } from '@tanstack/react-query';
import { updateSessionAction } from '../updateSession';

export const useUpdateSession = () => {
    const {
        isSuccess: isUpdatedSuccessfuly,
        mutate: updateSession,
        isLoading: isSessionUpdating,
      } = useMutation({
        mutationFn: updateSessionAction
      });

      return {
        isSessionUpdating,
        updateSession,
        isUpdatedSuccessfuly
      }
}
