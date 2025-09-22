// Taget fra tidligere opgave
"use client";

import asyncFetch from "@/utils/async-fetch";
import { useEffect, useState } from "react";

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(function () {
    asyncFetch(url, options)
      .then(data => setData(data))
      .catch(error => setError(error))
      .finally(() => setLoading(false))
  }, []);


  return { data, loading, error }
}