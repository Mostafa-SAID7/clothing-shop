"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("cart");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Thank you for your order!</h1>
        <p className="text-gray-600 mb-6">
          We'll send you a confirmation email with your order details.
        </p>
        <Button onClick={() => router.push("/")}>Continue Shopping</Button>
      </div>
    </div>
  );
}