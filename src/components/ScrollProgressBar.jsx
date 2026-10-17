import { motion, useScroll } from "framer-motion";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="wand-progress-bar"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
