'use client';
import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { currentUser, login } from '@/lib/api';
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => { if (currentUser()) router.replace('/dashboard'); }, [router]);
  async function submit(event: FormEvent) {
    event.preventDefault();
    setError('');
    setLoading(true);
    try { await login(email, password); router.replace('/dashboard'); }
    catch (reason) { setError(reason instanceof Error ? reason.message : 'Não foi possível entrar. Tente novamente.'); }
    finally { setLoading(false); }
  }
  return <main className="login-shell"><div className="login-card"><div className="brand-mark">B</div><p className="eyebrow">Sistema de biblioteca</p><h1>Olá! Acesse sua conta</h1><p className="muted">Entre para cuidar do acervo, dos leitores e dos empréstimos.</p><form onSubmit={submit}><label>E-mail<input type="email" required value={email} onChange={event => setEmail(event.target.value)} placeholder="admin@biblioteca.local" /></label><label>Senha<input type="password" required value={password} onChange={event => setPassword(event.target.value)} placeholder="Sua senha" /></label>{error && <p className="alert">{error}</p>}<button className="primary" disabled={loading}>{loading ? 'Verificando...' : 'Entrar'}</button></form></div></main>;
}
