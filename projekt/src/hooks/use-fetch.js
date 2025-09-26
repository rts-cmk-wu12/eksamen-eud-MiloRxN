// Taget fra tidligere opgave
"use client";

import asyncFetch from "@/utils/async/async-fetch";
import { useEffect, useState } from "react";

export default function useFetch(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(function () {
    asyncFetch(endpoint)
      .then(data => setData(data))
      .catch(error => setError(error))
      .finally(() => setLoading(false))
  }, []);


  return { data, loading, error }
}