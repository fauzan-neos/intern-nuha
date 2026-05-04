"use client";

import { useEffect, useState } from "react";

export function useNavbarScroll() {
  const [isTop, setIsTop] = useState(true);
  const [show, setShow] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      setIsTop(scrollY < 50);
      setShow(!(scrollY > lastScroll && scrollY > 100));
      setLastScroll(scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return { isTop, show };
}
