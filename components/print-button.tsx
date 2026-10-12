"use client";

import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PrintButton() {
  return (
    <Button variant="secondary" size="lg" onClick={() => window.print()}>
      <Printer size={18} /> Print resume
    </Button>
  );
}
