# BOLD OS — Bread of Life Desk

Sistema proposto para o Balcão de Assistência Social e Ministério Pão da Vida.

## Estado atual

Fundação React/TypeScript com demonstração local; módulos operacionais ainda não implementados. Comece por
[docs/STATUS.md](docs/STATUS.md) para retomar o trabalho sem reler todo o histórico.

- [Plano e documentos](docs/README.md)
- [Descoberta B00](docs/DISCOVERY.md)
- [Backlog](docs/BACKLOG.md)
- [Direção visual](docs/UI-DESIGN.md)

Repositório indicado: https://github.com/rodriigoamorim-bot/rodriigoamorim-Bold-OS

Desenvolvimento utiliza apenas dados sintéticos. Publicação, contratação e uso de
dados reais dependem das validações previstas nos documentos.

## Desenvolvimento local

Requer Node 22.12+ (ou 24 LTS) e pnpm 11.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm typecheck
pnpm test
pnpm exec vite build apps/web
```

Abra o endereço informado pelo Vite. A lista usa apenas dados fictícios.
Para testar Auth, copie apps/web/.env.example para apps/web/.env.local e preencha
URL e chave publishable do projeto de desenvolvimento; reinicie o Vite. Use uma
conta de teste previamente criada no Supabase. A chave secreta/service_role nunca
vai no frontend. O login apenas testa Auth; os registros continuam demonstrativos.

A decisão vigente está em [ADR 006](docs/adr/006-supabase.md).

## Conectar Supabase

Seguir [SUPABASE-SETUP.md](docs/SUPABASE-SETUP.md) para criar projeto gratuito de desenvolvimento, aplicar a migração e verificar as permissões. Testes locais incluem PostgreSQL embarcado; validação remota ainda pendente.
