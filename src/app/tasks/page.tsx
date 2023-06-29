"use client";

import React, { useEffect } from "react";
import { Button, InputField } from "@components";
import { useRouter } from "next/navigation";
import { useAuth, useAuthDispatch } from "@contexts/authContext";
import { useError } from "@hooks/useError";
import useSWR from "swr";

export default function Tasks(): React.ReactElement {
  const [shouldFetch, setShouldFetch] = React.useState<boolean>(false);
  const { errorMessage, setErrorMessage } = useError(3000);

  const { token } = useAuth();
  const { setToken } = useAuthDispatch();

  const router = useRouter();

  const { data, isLoading, error } = useSWR(
    shouldFetch ? "/api/tasks/all" : null,
    async (url) => {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = new Error(await response.json()) as any;
        error.status = response.status;
        throw error;
      }

      return response.json();
    }
  );

  const load = async () => {
    if (isLoading) return;

    setShouldFetch(true);
  };

  useEffect(() => {
    if (error) {
      setErrorMessage(
        error.status === 400
          ? "Email oder Passwort falsch"
          : "Ein Fehler ist aufgetreten"
      );
      setShouldFetch(false);
      return;
    }

    if (data) {
      setToken(data.token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  return (
    <div>
      <h1>Willkommen</h1>
      <Button
        mode="large"
        onClick={load}
        label="ANMELDEN"
        loading={isLoading}
      />
    </div>
  );
}
