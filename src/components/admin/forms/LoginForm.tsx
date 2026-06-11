"use client";

import { useActionState } from "react";
import { loginAction } from "@/features/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const initialState = { error: "" };

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      const result = await loginAction(formData);
      return result || { error: "" };
    },
    initialState
  );

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold tracking-tight">Admin Login</CardTitle>
        <CardDescription>
          Enter your credentials to access the AVP Oils & Millets dashboard.
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-4">
          {state?.error && (
            <div className="p-3 text-sm text-white bg-destructive rounded-md">
              {state.error}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              placeholder="admin@avpoils.com" 
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              name="password" 
              type="password" 
              required 
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit" disabled={isPending}>
            {isPending ? "Signing in..." : "Sign in"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
