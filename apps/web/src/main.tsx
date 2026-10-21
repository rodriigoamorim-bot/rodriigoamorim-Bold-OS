import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { matchesName } from './search';
import { supabase } from './supabase';
import './style.css';

const people = [
  { id: 'DEMO-001', name: 'João Exemplo', phase: 'Acolhimento', next: 'Contato a combinar' },
  { id: 'DEMO-002', name: 'Maria Exemplo', phase: 'Capacitação / alojamento', next: 'Revisar plano' },
  { id: 'DEMO-003', name: 'Ana Exemplo', phase: 'Autonomia / apoio familiar', next: 'Contato a combinar' },
];
function App() {
  const [page, setPage] = useState('Assistidos e PRI');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [pending, setPending] = useState(false);
  const shown = people.filter(p => matchesName(p.name, query));
  async function login(event: React.FormEvent) {
    event.preventDefault();
    if (!supabase) return;
    setPending(true); setMessage('');
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setMessage(error ? 'Não foi possível entrar. Confira suas credenciais e conexão.' : 'Autenticação confirmada. Os dados desta versão continuam demonstrativos.');
    } catch { setMessage('Falha de conexão. Tente novamente.'); }
    finally { setPassword(''); setPending(false); }
  }
  return <div className="shell"><aside><div className="brand">BOLD <span>OS</span></div><small>Bread of Life Desk</small><p className="nav-label">OPERAÇÃO</p><nav aria-label="Navegação principal">{['Assistidos e PRI', 'Configuração'].map(item => <button key={item} className={page === item ? 'active' : ''} onClick={() => {setPage(item); setSelected(null);}}>{item}</button>)}</nav><div className="aside-bottom">Balcão de assistência social<br/><small>Versão inicial · 0.1</small></div></aside><main><header><span>Balcão / {page}</span><span className="badge">Ambiente demonstrativo</span></header><div className="notice">Dados inteiramente fictícios. Esta versão não grava atendimentos ou prontuários.</div>{page === 'Assistidos e PRI' ? <><div className="title"><div><h1>Assistidos e PRI <span className="count">{people.length}</span></h1><p>Acolhimento e continuidade do cuidado</p></div></div><section className="panel"><div className="filters"><label htmlFor="search">Buscar assistido</label><input id="search" type="search" value={query} onChange={e => {setQuery(e.target.value); setSelected(null);}} placeholder="Nome social ou apelido"/><span>{shown.length} de {people.length} registros</span></div><div className="table-scroll"><table><thead><tr><th>Nome / identificador</th><th>Fase principal</th><th>Próximo passo</th><th>Detalhe</th></tr></thead><tbody>{shown.map(person => <tr key={person.id}><td><strong>{person.name}</strong><small>{person.id}</small></td><td><span className="badge">{person.phase}</span></td><td>{person.next}</td><td><button className="link" onClick={() => setSelected(person.id)} aria-label={`Ver demonstração de ${person.name}`}>Ver resumo →</button></td></tr>)}</tbody></table></div>{shown.length === 0 && <p className="empty">Nenhum resultado. Tente outro nome.</p>}<footer>Dados sintéticos · página 1 de 1</footer></section>{selected && <section className="panel detail" aria-label="Resumo demonstrativo"><button className="link" onClick={() => setSelected(null)}>Fechar resumo</button><h2>{people.find(p => p.id === selected)?.name}</h2><p>Exemplo de acompanhamento. Responsável e histórico ainda não implementados.</p><p>Ajuda material não depende de adesão religiosa.</p></section>}</> : <><h1>Conexão com Supabase</h1><section className="panel detail"><h2>{supabase ? 'Projeto configurado' : 'Projeto ainda não conectado'}</h2><p>Configure a URL e a chave pública em apps/web/.env.local. Nunca use chave secreta ou service_role no navegador.</p>{supabase && <form onSubmit={login}><label htmlFor="email">E-mail</label><input id="email" type="email" required autoComplete="username" value={email} onChange={e => setEmail(e.target.value)}/><label htmlFor="password">Senha</label><input id="password" type="password" required autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)}/><button className="primary" disabled={pending}>{pending ? 'Entrando…' : 'Testar entrada'}</button><p role="status">{message}</p></form>}<p>Autenticação não libera acesso a PRI nesta entrega. Banco e permissões ainda serão implementados e verificados.</p></section></>}</main></div>;
}
createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
