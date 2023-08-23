"use client";

import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";

function Product() {
  const router = useRouter();
  const { handle } = router.query;

  return <div>{handle}</div>;
}

export default Product;
