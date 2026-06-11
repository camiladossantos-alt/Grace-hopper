"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/utils/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        alert("Conta criada! Você já pode fazer login.");
        setIsSignUp(false);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push("/dashboard");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Erro desconhecido ao autenticar.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMsg("");
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) throw error;
    } catch (err: any) {
      setErrorMsg(err.message || "Erro ao iniciar o Google OAuth.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black flex flex-col justify-center items-center font-sans px-4">
      {/* Logo/Icon */}
      <div className="flex items-center gap-2 mb-8">
        <span className="font-light tracking-widest text-sm text-[#0A0A41] uppercase">
          PROJETO GRACE HOPPER
        </span>
      </div>

      {/* Login Card */}
      <div className="max-w-md w-full bg-white border border-[#E5E7EB] rounded-[8px] p-8 shadow-none text-center">
        <h2 className="text-xl font-bold mb-2 text-[#0A0A41]">
          {isSignUp ? "Criar Conta" : "Entrar na Plataforma"}
        </h2>
        <p className="text-sm text-[#666666] mb-6 leading-relaxed">
          Pratique entrevistas realistas por voz com IA e receba análises instantâneas.
        </p>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-[6px] bg-red-100 border border-red-300 text-red-700 text-xs text-left">
            {errorMsg}
          </div>
        )}

        {/* Email & Password Form */}
        <form onSubmit={handleEmailAuth} className="flex flex-col gap-4 text-left mb-6">
          <div>
            <label htmlFor="email" className="text-xs font-semibold text-[#666666] mb-1.5 block">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              required
              className="w-full rounded-[6px] border border-[#E5E7EB] px-4 py-2.5 bg-white text-sm focus:outline-none focus:border-[#0A0A41]"
              placeholder="seu-email@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="text-xs font-semibold text-[#666666] mb-1.5 block">
              Senha
            </label>
            <input
              id="password"
              type="password"
              required
              className="w-full rounded-[6px] border border-[#E5E7EB] px-4 py-2.5 bg-white text-sm focus:outline-none focus:border-[#0A0A41]"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group w-full rounded-[6px] bg-[#0A0A41] text-white font-semibold py-3 border border-[#0A0A41] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 text-sm mt-2 cursor-pointer"
          >
            <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1.5">
              {loading ? "Processando..." : isSignUp ? "Criar Conta" : "Entrar com E-mail"}
            </span>
          </button>
        </form>

        <div className="relative flex items-center justify-center my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E5E7EB]" />
          </div>
          <span className="relative bg-white px-3 text-xs text-[#666666]">ou</span>
        </div>

        {/* Google OAuth Button */}
        <button
          onClick={handleGoogleLogin}
          type="button"
          className="w-full flex items-center justify-center gap-3 rounded-[6px] border border-[#E5E7EB] bg-white py-3 px-4 font-medium hover:bg-gray-50 text-[#0A0A41] transition-all duration-200 cursor-pointer"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          Continuar com Google
        </button>

        {/* Alternate Action */}
        <div className="mt-6 text-sm text-[#666666]">
          {isSignUp ? (
            <span>
              Já tem conta?{" "}
              <button onClick={() => setIsSignUp(false)} className="text-[#0A0A41] font-semibold hover:underline cursor-pointer">
                Fazer Login
              </button>
            </span>
          ) : (
            <span>
              Novo por aqui?{" "}
              <button onClick={() => setIsSignUp(true)} className="text-[#0A0A41] font-semibold hover:underline cursor-pointer">
                Criar Conta
              </button>
            </span>
          )}
        </div>

        {/* Back Link */}
        <div className="mt-6 border-t border-[#E5E7EB] pt-4">
          <Link href="/" className="text-xs text-[#666666] hover:text-[#0A0A41] transition-colors">
            ← Voltar para a Home
          </Link>
        </div>
      </div>
    </div>
  );
}
