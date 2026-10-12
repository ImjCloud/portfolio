"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StarRatingDisplay } from "@/components/star-rating";

type PendingItem = {
  id: string;
  name: string;
  role: string | null;
  company: string | null;
  linkedin_url: string | null;
  rating: number;
  recommendation: string;
  email: string | null;
  created_at: string;
};

export function AdminTestimonialsPanel() {
  const [secret, setSecret] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [items, setItems] = useState<PendingItem[]>([]);
  const [configured, setConfigured] = useState(true);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const load = useCallback(async (key: string) => {
    setStatus("loading");
    try {
      const response = await fetch("/api/testimonials/admin/", { headers: { "x-admin-secret": key } });
      if (response.status === 401) {
        setStatus("error");
        setUnlocked(false);
        return;
      }
      const result = await response.json();
      setConfigured(result.configured !== false);
      setItems(result.testimonials ?? []);
      setUnlocked(true);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    conֻǱ˞