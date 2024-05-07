import React from "react";
import { motion } from "framer-motion";

const DeliveryMessage = () => {
  const messageVariants = {
    initial: {
      opacity: 0,
      x: -50,
    },
    animate: {
      opacity: 1,
      x: "100%",
      transition: {
        duration: 5,
        delay: 0.5,
      },
    },
  };

  return (
    <motion.p
      variants={messageVariants}
      initial="initial"
      animate="animate"
      className="text-yellow-500 font-bold mb-8"
      whileHover={{ x: 0 }}
    >
      Make order on or above 4000 and get free home delivery
    </motion.p>
  );
};

export default DeliveryMessage;
