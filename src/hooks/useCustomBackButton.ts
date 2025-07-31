import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Custom hook to handle browser/Android back button behavior
 * Ensures that the back button navigates to home with proper fromPage parameter
 * instead of triggering the splash screen
 */
export function useCustomBackButton(pageName: string, onExit?: () => void) {
  const router = useRouter();

  useEffect(() => {
    // Add a dummy history entry when the page loads
    // This ensures we can capture the back button press
    window.history.pushState({ page: pageName }, '', window.location.href);

    const handlePopState = (event: PopStateEvent) => {
      // Prevent the default back navigation
      event.preventDefault();
      
      // If there's an onExit callback (for animations), use it
      if (onExit) {
        onExit();
        // Wait for the exit animation, then navigate
        setTimeout(() => {
          router.push(`/?from=${pageName}`);
        }, 500);
      } else {
        // Navigate immediately if no exit animation
        router.push(`/?from=${pageName}`);
      }
    };

    // Listen for the popstate event (back/forward browser buttons)
    window.addEventListener('popstate', handlePopState);

    // Cleanup
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [pageName, router, onExit]);
}
