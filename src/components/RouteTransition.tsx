import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";

interface RouteTransitionProps {
  children: React.ReactNode;
}

/**
 * Wraps the active route element in a soft cross-fade + slight slide.
 * Keyed by location.pathname so navigating between pages plays the
 * exit animation of the previous route and the enter of the new one.
 */
export function RouteTransition({ children }: RouteTransitionProps) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}