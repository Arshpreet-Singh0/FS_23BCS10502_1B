"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Eye, EyeOff, Mail, Lock, Facebook, Chrome } from "lucide-react"
import { axiosInstance } from "@/configs/AxiosInstance"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { handleAxiosError } from "@/utils/handleAxiosError"
import { useUser } from "@/context/user-context"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const router = useRouter();
  const { refreshUser } = useUser();

  const handleLogin = async(e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await axiosInstance.post("/auth/login", {email, password});
      
      toast.success("Login successfull.");
      localStorage.setItem("token", res?.data?.data);
       await refreshUser();
      router.push("/")
      
    } catch (error) {
      handleAxiosError(error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">S</span>
            </div>
            <span className="font-bold text-2xl text-foreground">StyleHub</span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your account to continue shopping</p>
        </div>

        {/* Login Card */}
        <Card className="bg-card border-0 shadow-lg p-8 mb-6">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
              <div className="relative">
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-lg bg-muted border-0 focus:ring-2 focus:ring-primary"
                  required
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 py-2 rounded-lg bg-muted border-0 focus:ring-2 focus:ring-primary"
                  required
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-border" />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-primary hover:text-primary/80 font-medium">
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground rounded-lg py-2 font-semibold transition-all"
            >
              Sign In
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant="outline"
              className="rounded-lg border-border bg-transparent hover:bg-muted text-foreground"
            >
              <Chrome className="w-4 h-4 mr-2" />
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              className="rounded-lg border-border bg-transparent hover:bg-muted text-foreground"
            >
              <Facebook className="w-4 h-4 mr-2" />
              Facebook
            </Button>
          </div>
        </Card>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary hover:text-primary/80 font-semibold">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
