"use client";

import { motion, type Variants } from "motion/react";
import * as React from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const offset: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 36 },
  down: { y: -36 },
  left: { x: 36 },
  right: { x: -36 },
  none: {},
};

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  duration?: number;
  once?: boolean;
  as?: "div" | "section" | "li" | "span" | "h2" | "p";
}

/**
 * 스크롤 진입 시 페이드 + 슬라이드로 등장하는 공통 래퍼.
 * 모든 섹션에서 재사용하며 reduced-motion 환경을 자동 존중한다.
 */
export function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.7,
  once = true,
  as = "div",
}: RevealProps) {
  const variants: Variants = {
    hidden: { opacity: 0, ...offset[direction] },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.25 }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * 자식 요소를 순차적으로 등장시키는 스태거 컨테이너.
 * <Stagger><StaggerItem/>...</Stagger> 형태로 사용한다.
 */
export function Stagger({
  children,
  className,
  gap = 0.12,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  gap?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      variants={{
        visible: { transition: { staggerChildren: gap } },
      }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};
