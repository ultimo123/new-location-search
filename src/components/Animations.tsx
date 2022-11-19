import React from "react"

import { motion } from "framer-motion"

interface DropDownTypes {
  children: React.ReactNode
  className?: string
}
const DropDown = ({ children, className }: DropDownTypes) => {
  const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
    },
  }
  return (
    <motion.div
      variants={dropIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`${className}`}
    >
      {children}
    </motion.div>
  )
}

interface ButtonTypes {
  onClick?: (n: any) => void
  children: any
  className: string
  type?: "button" | "submit" | "reset" | undefined
  disabled?: boolean
}
const Button = ({
  className,
  onClick,
  children,
  disabled,
  type,
}: ButtonTypes) => {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`${className}`}
      onClick={onClick}
    >
      {children}
    </motion.button>
  )
}

interface LeftRightTypes {
  onClick?: (n: any) => void
  children: any
  className?: string
  direction: "left" | "right"
}
const LeftRight = ({
  children,
  className,
  onClick,
  direction,
}: LeftRightTypes) => {
  const dropIn = {
    hidden: {
      x: direction === "left" ? "-100vw" : "250vw",
      opacity: 0,
    },
    visible: {
      x: "0",
      opacity: 1,
      transition: {
        duration: 2.5,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      x: "100vw",
      opacity: 0,
    },
  }
  return (
    <motion.div
      variants={dropIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}

export { DropDown, Button, LeftRight }
