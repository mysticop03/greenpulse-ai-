import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Leaf } from "lucide-react";
import { useLogin, useRegister } from "@/hooks/useAuth";
import { Button } from "@/components/Buttons/Button";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(4, "Password must be at least 4 characters"),
  companyName: z.string().optional(),
});


export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const login = useLogin();
  const signup = useRegister();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>({
    resolver: zodResolver(isRegister ? registerSchema : loginSchema),
  });

  function onSubmit(values: any) {
    if (isRegister) {
      signup.mutate(values);
    } else {
      login.mutate(values);
    }
  }

  function handleModeToggle() {
    setIsRegister((r) => !r);
    reset();
  }

  const isPending = login.isPending || signup.isPending;
  const isError = isRegister ? signup.isError : login.isError;
  const errorObj = isRegister ? signup.error : login.error;

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-sunken px-4">
      <div className="w-full max-w-sm rounded-card border border-border bg-surface p-8 shadow-card">
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-600 text-white">
            <Leaf className="h-5 w-5" />
          </div>
          <div>
            <p className="text-base font-semibold text-ink">GreenPulse AI</p>
            <p className="text-xs text-ink-muted">Enterprise Device Intelligence</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {isRegister && (
            <div>
              <label className="mb-1 block text-sm font-medium text-ink">Full Name</label>
              <input
                {...formRegister("name")}
                type="text"
                placeholder="John Doe"
                className="h-10 w-full rounded-lg border border-border px-3 text-sm focus:border-brand-500"
              />
              {errors.name && <p className="mt-1 text-xs text-risk-high">{errors.name.message as string}</p>}
            </div>
          )}

          <div>
            <label className="mb-1 block text-sm font-medium text-ink">Email</label>
            <input
              {...formRegister("email")}
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              className="h-10 w-full rounded-lg border border-border px-3 text-sm focus:border-brand-500"
            />
            {errors.email && <p className="mt-1 text-xs text-risk-high">{errors.email.message as string}</p>}
          </div>

          {isRegister && (
            <div>
              <label className="mb-1 block text-sm font-medium text-ink">Select Enterprise</label>
              <select
                {...formRegister("companyName")}
                className="h-10 w-full rounded-lg border border-border bg-surface px-3 text-sm focus:border-brand-500 text-ink"
              >
                <option value="Acme Global Corp.">Acme Global Corp.</option>
                <option value="Acme Retail India">Acme Retail India</option>
                <option value="Acme Manufacturing">Acme Manufacturing</option>
              </select>
              {errors.companyName && <p className="mt-1 text-xs text-risk-high">{errors.companyName.message as string}</p>}
            </div>
          )}

          <div>
            <label className="mb-1 block text-sm font-medium text-ink">Password</label>
            <input
              {...formRegister("password")}
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              className="h-10 w-full rounded-lg border border-border px-3 text-sm focus:border-brand-500"
            />
            {errors.password && <p className="mt-1 text-xs text-risk-high">{errors.password.message as string}</p>}
          </div>

          {isError && (
            <p className="rounded-lg bg-risk-high-bg px-3 py-2 text-xs text-risk-high">
              {(errorObj as Error).message || "Operation failed. Please try again."}
            </p>
          )}

          <Button type="submit" className="w-full" isLoading={isPending}>
            {isRegister ? "Sign up" : "Sign in"}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-ink-muted">
          {isRegister ? "Already have an account?" : "Need an account for your organization?"}{" "}
          <button
            type="button"
            onClick={handleModeToggle}
            className="font-medium text-brand-600 hover:text-brand-700"
          >
            {isRegister ? "Sign in" : "Sign up"}
          </button>
        </p>
      </div>
    </div>
  );
}
