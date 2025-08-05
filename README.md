# ViagemImpacta 🏨

<p align="center">
  <img src="https://img.shields.io/badge/ASP.NET%20Core-8.0-blue?style=for-the-badge&logo=dotnet" alt="ASP.NET Core 8.0">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react" alt="React 18">
  <img src="https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite" alt="Vite">
  <img src="https://img.shields.io/badge/TailwindCSS-3.0-06B6D4?style=for-the-badge&logo=tailwindcss" alt="TailwindCSS">
</p>

<p align="center">
  <strong>Sistema completo de gestão hoteleira e reservas</strong><br>
  Uma plataforma moderna que conecta administradores, funcionários e clientes em um ecossistema digital eficiente.
</p>

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Como Executar](#-como-executar)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Funcionalidades](#-funcionalidades)
- [API Endpoints](#-api-endpoints)
- [Configuração do Banco de Dados](#-configuração-do-banco-de-dados)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Contribuição](#-contribuição)
- [Licença](#-licença)

---

## 🎯 Sobre o Projeto

O **ViagemImpacta** é uma plataforma digital completa para gestão de reservas hoteleiras, desenvolvida com arquitetura moderna separando frontend e backend. O sistema oferece funcionalidades robustas para administradores gerenciarem hotéis, reservas e usuários, além de proporcionar uma experiência intuitiva para clientes realizarem reservas.

### 🎨 Screenshots

| Dashboard Administrativo | Busca de Hotéis | Página Inicial |
|-------------------------|-----------------|----------------|
| ![Dashboard](docs/dashboard-preview.png) | ![Search](docs/search-preview.png) | ![Home](docs/home-preview.png) |

---

## 🚀 Tecnologias

### Backend
- **ASP.NET Core MVC 8.0** - Framework web principal
- **Entity Framework Core** - ORM para banco de dados
- **SQL Server/SQLite** - Banco de dados
- **Stripe API** - Processamento de pagamentos
- **BCrypt** - Criptografia de senhas
- **AutoMapper** - Mapeamento de objetos
- **FluentValidation** - Validação de dados

### Frontend
- **React 18** - Biblioteca principal
- **Vite** - Build tool e desenvolvimento
- **TailwindCSS** - Framework CSS utilitário
- **Chart.js** - Gráficos e visualizações
- **ScrollReveal** - Animações de scroll
- **Axios** - Cliente HTTP

### DevOps & Ferramentas
- **Git** - Controle de versão
- **Visual Studio Code** - IDE
- **Postman** - Testes de API
- **npm/yarn** - Gerenciador de pacotes

---

## 🏗️ Arquitetura do Backend

### Estrutura em Camadas

O backend segue uma arquitetura em camadas bem definida:

```
📁 ViagemImpacta/
├── 📁 Controllers/           # Camada de Apresentação
│   ├── 📁 ApiControllers/   # APIs RESTful (JSON)
│   └── 📁 MvcControllers/   # Views renderizadas (HTML)
├── 📁 Services/             # Camada de Lógica de Negócio
│   ├── 📁 Interfaces/       # Contratos dos serviços
│   └── 📁 Implementations/  # Implementações concretas
├── 📁 Repositories/         # Camada de Acesso a Dados
│   ├── 📁 Interfaces/       # Contratos dos repositórios
│   └── 📁 Implementations/  # Implementações com EF Core
├── 📁 Models/               # Entidades de Domínio
├── 📁 DTO/                  # Data Transfer Objects
├── 📁 ViewModels/           # ViewModels para MVC
├── 📁 Data/                 # Contexto do Entity Framework
└── 📁 Setup/                # Configurações e DI
```

### Padrões Implementados

#### 🔧 Repository Pattern
```csharp
// Interface genérica
public interface IRepository<T> where T : class
{
    Task<IEnumerable<T>> GetAllAsync();
    Task<T> GetByIdAsync(int id);
    Task<T> CreateAsync(T entity);
    Task<T> UpdateAsync(T entity);
    Task DeleteAsync(int id);
}

// Implementação específica
public class UserRepository : Repository<User>, IUserRepository
{
    public async Task<User> GetByEmailAsync(string email)
    {
        return await _context.Users
            .FirstOrDefaultAsync(u => u.Email == email);
    }
}
```

#### 🏢 Service Layer
```csharp
public interface IUserService
{
    Task<IEnumerable<UserDto>> GetAllUsersAsync();
    Task<UserDto> GetUserByIdAsync(int id);
    Task<UserDto> CreateUserAsync(CreateUserDto userDto);
    Task<UserDto> UpdateUserAsync(int id, UpdateUserDto userDto);
    Task DeleteUserAsync(int id);
}
```

#### 🔗 Dependency Injection
```csharp
// Program.cs - Configuração de DI
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IReservationService, ReservationService>();
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<StripeService>();
```

### Configuração de Segurança

#### 🔐 Autenticação com Cookies
```csharp
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.LoginPath = "/Admins/Index";
        options.AccessDeniedPath = "/Admins/AccessDenied";
        options.ExpireTimeSpan = TimeSpan.FromHours(24);
    });
```

#### 🛡️ Autorização por Roles
```csharp
[Authorize(Roles = "Admin")]
public class AdminsController : Controller { }

[Authorize(Roles = "Admin, Attendant")]
public IActionResult Dashboard() { }
```

### Middleware Pipeline

```csharp
// Program.cs - Pipeline de middleware
app.UseHttpsRedirection();     // Força HTTPS
app.UseStaticFiles();          // Arquivos estáticos
app.UseRouting();              // Roteamento
app.UseCors();                 // CORS para frontend
app.UseAuthentication();       // Autenticação
app.UseAuthorization();        // Autorização
app.MapControllers();          # APIs
app.MapControllerRoute(        # Rotas MVC
    name: "default",
    pattern: "{controller=Admins}/{action=Index}/{id?}");
```

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18.0 ou superior)
- **.NET SDK 8.0** ou superior
- **SQL Server** (ou SQL Server Express) / **SQLite**
- **Git**
- **Visual Studio Code** (recomendado)

### Verificar Instalações

```bash
# Verificar Node.js
node --version

# Verificar .NET
dotnet --version

# Verificar Git
git --version
```

---

## 📥 Instalação

### 1. Clonar o Repositório

```bash
git clone https://github.com/oblipix/ViagemImpacta.git
cd ViagemImpacta
```

### 2. Configurar Backend

```bash
# Navegar para o diretório do backend
cd backend/ViagemImpacta

# Restaurar pacotes NuGet
dotnet restore

# Instalar ferramentas do Entity Framework (se necessário)
dotnet tool install --global dotnet-ef
```

### 3. Configurar Frontend

```bash
# Navegar para o diretório do frontend
cd ../../frontend

# Instalar dependências
npm install
# ou
yarn install
```

---

## 🔧 Configuração do Banco de Dados

### 🗄️ Usando SQL Server Local (Recomendado)

#### Pré-requisitos SQL Server
Antes de configurar, certifique-se de ter uma das opções instaladas:

1. **SQL Server LocalDB** (mais leve, ideal para desenvolvimento):
   - Vem incluído com Visual Studio
   - Download: [SQL Server Express LocalDB](https://docs.microsoft.com/en-us/sql/database-engine/configure-windows/sql-server-express-localdb)

2. **SQL Server Express** (versão completa gratuita):
   - Download: [SQL Server Express](https://www.microsoft.com/sql-server/sql-server-downloads)

3. **SQL Server Developer** (versão completa para desenvolvimento):
   - Download: [SQL Server Developer](https://www.microsoft.com/sql-server/sql-server-downloads)

#### Configuração LocalDB (Recomendado)

1. **Verificar se LocalDB está instalado**:
```bash
sqllocaldb info
```

2. **Criar uma instância LocalDB** (se necessário):
```bash
sqllocaldb create MSSQLLocalDB
sqllocaldb start MSSQLLocalDB
```

3. **Configurar Connection String** em `appsettings.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\MSSQLLocalDB;Database=ViagemImpactaDB;Trusted_Connection=true;MultipleActiveResultSets=true"
  }
}
```

#### Configuração SQL Server Express

Para SQL Server Express instalado localmente:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost\\SQLEXPRESS;Database=ViagemImpactaDB;Trusted_Connection=true;MultipleActiveResultSets=true"
  }
}
```

#### Executar Migrações e Criar Banco

1. **Verificar se EF Tools está instalado**:
```bash
dotnet tool list --global
```

2. **Instalar EF Tools** (se necessário):
```bash
dotnet tool install --global dotnet-ef
```

3. **Navegar para o projeto backend**:
```bash
cd backend/ViagemImpacta
```

4. **Criar migração inicial** (se não existir):
```bash
dotnet ef migrations add InitialCreate
```

5. **Aplicar migrações e criar banco**:
```bash
dotnet ef database update
```

6. **Verificar criação do banco**:
   - Abra SQL Server Management Studio (SSMS)
   - Conecte em `(localdb)\MSSQLLocalDB` ou `localhost\SQLEXPRESS`
   - Verifique se o banco `ViagemImpactaDB` foi criado

### 🗃️ Usando SQLite (Desenvolvimento Rápido)

Para desenvolvimento rápido sem SQL Server:

1. **Alterar Connection String** em `appsettings.Development.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=viagemimpacta.db"
  }
}
```

2. **Instalar pacote SQLite** (se necessário):
```bash
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
```

3. **Executar Migrações**:
```bash
dotnet ef database update
```

### 🔧 Problemas Comuns com Banco de Dados

**❌ Erro: "A network-related or instance-specific error"**
```bash
# Verificar se SQL Server está rodando
net start MSSQL$SQLEXPRESS

# Para LocalDB
sqllocaldb start MSSQLLocalDB
```

**❌ Erro: "Login failed for user"**
- Verifique se `Trusted_Connection=true` está na connection string
- Para SQL Server Express, certifique-se que Windows Authentication está habilitado

**❌ Erro: "Cannot open database"**
```bash
# Recriar o banco do zero
dotnet ef database drop
dotnet ef database update
```

---

## ⚙️ Variáveis de Ambiente

### Backend - `appsettings.json`

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "SUA_CONNECTION_STRING"
  },
  "Stripe": {
    "SecretKey": "sk_test_...",
    "PublishableKey": "pk_test_..."
  },
  "SmtpSettings": {
    "Host": "smtp.gmail.com",
    "Port": 587,
    "User": "seu-email@gmail.com",
    "Pass": "sua-senha",
    "From": "noreply@viagemimpacta.com"
  }
}
```

### Frontend - `.env`

```env
VITE_API_URL=http://localhost:5155
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

---

## 🚀 Como Executar

### Método 1: Executar Separadamente

#### Backend
```bash
cd backend/ViagemImpacta
dotnet run
```
*Servidor rodará em: `http://localhost:5155`*

#### Frontend
```bash
cd frontend
npm run dev
# ou
yarn dev
```
*Aplicação rodará em: `http://localhost:5173`*

### Método 2: Script de Desenvolvimento (Recomendado)

Crie um script para executar ambos simultaneamente:

**`start-dev.ps1` (Windows PowerShell):**
```powershell
# Executar backend em background
Start-Process powershell -ArgumentList "-Command cd backend/ViagemImpacta; dotnet run"

# Aguardar alguns segundos
Start-Sleep -Seconds 5

# Executar frontend
cd frontend
npm run dev
```

**`start-dev.sh` (Linux/Mac):**
```bash
#!/bin/bash
# Executar backend em background
cd backend/ViagemImpacta && dotnet run &

# Aguardar alguns segundos
sleep 5

# Executar frontend
cd ../../frontend && npm run dev
```

---

## 📁 Estrutura do Projeto

```
ViagemImpacta/
├── 📁 backend/
│   └── 📁 ViagemImpacta/
│       ├── 📁 Controllers/
│       │   ├── 📁 ApiControllers/
│       │   └── 📁 MvcControllers/
│       ├── 📁 Models/
│       ├── 📁 Services/
│       ├── 📁 Repositories/
│       ├── 📁 Data/
│       ├── 📁 Views/
│       ├── 📁 wwwroot/
│       └── 📄 Program.cs
├── 📁 frontend/
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   │   ├── 📁 common/
│   │   │   ├── 📁 pages/
│   │   │   └── 📁 styles/
│   │   ├── 📁 services/
│   │   ├── 📁 hooks/
│   │   ├── 📁 utils/
│   │   └── 📄 main.jsx
│   ├── 📁 public/
│   ├── 📄 package.json
│   └── 📄 vite.config.js
├── 📁 docs/
├── 📄 README.md
└── 📄 .gitignore
```

---

## ✨ Funcionalidades

### 👨‍💼 Painel Administrativo
- ✅ **Dashboard** com métricas e gráficos
- ✅ **Gestão de Usuários** (CRUD completo)
- ✅ **Gestão de Funcionários** com controle de acesso
- ✅ **Gerenciamento de Hotéis** e quartos
- ✅ **Controle de Reservas** e status
- ✅ **Relatórios Financeiros** com integração Stripe
- ✅ **Sistema de Autenticação** robusto

### 🌐 Interface do Cliente
- ✅ **Busca de Hotéis** com filtros avançados
- ✅ **Sistema de Reservas** intuitivo
- ✅ **Seleção de Datas** otimizada para mobile
- ✅ **Design Responsivo** para todos os dispositivos
- ✅ **Animações Suaves** e micro-interações
- ✅ **Experiência Mobile-First**

### 🔐 Segurança
- ✅ **Autenticação baseada em Cookies**
- ✅ **Autorização por Roles** (Admin/Attendant)
- ✅ **Criptografia de Senhas** com BCrypt
- ✅ **Validação de Dados** em múltiplas camadas
- ✅ **Proteção CSRF** e CORS configurado

---

## 🔗 API Endpoints

O backend do ViagemImpacta expõe duas categorias de endpoints:
- **API Controllers** (`/api/*`) - RESTful APIs para integração
- **MVC Controllers** (`/*`) - Views renderizadas no servidor para admin

### 🔐 Autenticação e Autorização

#### Endpoints de Autenticação (MVC)
```http
GET  /Admins/Index           # Página de login
POST /Admins/Index          # Processar login
POST /Admins/Logout         # Fazer logout
GET  /Admins/AccessDenied   # Página de acesso negado
```

**Exemplo de Login:**
```bash
curl -X POST http://localhost:5155/Admins/Index \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "Email=admin@hotel.com&Password=123456"
```

### 👥 Gestão de Usuários (API)

#### Endpoints Usuários
```http
GET    /api/Users                    # Listar todos usuários
POST   /api/Users                    # Criar novo usuário
GET    /api/Users/{id}               # Buscar usuário por ID
PUT    /api/Users/{id}               # Atualizar usuário
DELETE /api/Users/{id}               # Excluir usuário
POST   /api/Users/forgot-password    # Solicitar reset de senha
POST   /api/Users/reset-password     # Resetar senha
```

**Modelo de Usuário:**
```json
{
  "id": 1,
  "email": "user@example.com",
  "firstName": "João",
  "lastName": "Silva",
  "cpf": "12345678901",
  "phone": "(11) 99999-9999",
  "birthDate": "1990-01-01",
  "role": "Customer",
  "isActive": true
}
```

**Criar Usuário:**
```bash
curl -X POST http://localhost:5155/api/Users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "novo@email.com",
    "password": "senha123",
    "firstName": "Nome",
    "lastName": "Sobrenome",
    "cpf": "12345678901",
    "phone": "(11) 99999-9999",
    "birthDate": "1990-01-01"
  }'
```

### 🏨 Gestão de Hotéis (MVC + API)

#### Endpoints Hotéis (MVC)
```http
GET    /Hotels              # Listar hotéis (view)
GET    /Hotels/Details/{id} # Detalhes do hotel (view)
GET    /Hotels/Create       # Formulário criar hotel
POST   /Hotels/Create       # Criar hotel
GET    /Hotels/Edit/{id}    # Formulário editar hotel
POST   /Hotels/Edit/{id}    # Atualizar hotel
GET    /Hotels/Delete/{id}  # Confirmar exclusão
POST   /Hotels/Delete/{id}  # Excluir hotel
```

#### Endpoints Hotéis (API)
```http
GET    /api/Hotels                  # Listar hotéis (JSON)
POST   /api/Hotels                  # Criar hotel (API)
GET    /api/Hotels/{id}             # Buscar hotel por ID
PUT    /api/Hotels/{id}             # Atualizar hotel
DELETE /api/Hotels/{id}             # Excluir hotel
GET    /api/Hotels/{id}/rooms       # Listar quartos do hotel
GET    /api/Hotels/search           # Buscar hotéis com filtros
```

**Modelo de Hotel:**
```json
{
  "id": 1,
  "name": "Hotel Copacabana",
  "description": "Hotel de luxo em Copacabana",
  "address": "Av. Atlântica, 1000",
  "city": "Rio de Janeiro",
  "state": "RJ",
  "postalCode": "22000-000",
  "phone": "(21) 3333-4444",
  "email": "contato@hotelcopacabana.com",
  "rating": 4.5,
  "amenities": ["Wi-Fi", "Piscina", "Academia"],
  "checkInTime": "14:00",
  "checkOutTime": "12:00",
  "isActive": true
}
```

### 🛏️ Gestão de Quartos

#### Endpoints Quartos (MVC)
```http
GET    /Rooms                    # Listar quartos
GET    /Rooms/Create             # Formulário criar quarto
POST   /Rooms/Create             # Criar quarto
GET    /Rooms/Edit/{id}          # Formulário editar quarto
POST   /Rooms/Edit/{id}          # Atualizar quarto
DELETE /Rooms/Delete/{id}        # Excluir quarto
```

**Modelo de Quarto:**
```json
{
  "id": 1,
  "hotelId": 1,
  "roomNumber": "101",
  "type": "Standard",
  "capacity": 2,
  "pricePerNight": 150.00,
  "description": "Quarto confortável com vista para o mar",
  "amenities": ["Ar condicionado", "TV", "Frigobar"],
  "isAvailable": true
}
```

### 📅 Gestão de Reservas

#### Endpoints Reservas (MVC)
```http
GET    /Reservations                 # Listar reservas
GET    /Reservations/Details/{id}    # Detalhes da reserva
GET    /Reservations/Create          # Formulário criar reserva
POST   /Reservations/Create          # Criar reserva
GET    /Reservations/Edit/{id}       # Formulário editar reserva
POST   /Reservations/Edit/{id}       # Atualizar reserva
POST   /Reservations/Cancel/{id}     # Cancelar reserva
```

#### Endpoints Reservas (API)
```http
GET    /api/Reservations             # Listar reservas (JSON)
POST   /api/Reservations             # Criar reserva
GET    /api/Reservations/{id}        # Buscar reserva por ID
PUT    /api/Reservations/{id}        # Atualizar reserva
DELETE /api/Reservations/{id}        # Cancelar reserva
GET    /api/Reservations/user/{id}   # Reservas de um usuário
```

**Modelo de Reserva:**
```json
{
  "id": 1,
  "userId": 1,
  "roomId": 1,
  "checkInDate": "2025-08-15",
  "checkOutDate": "2025-08-20",
  "totalAmount": 750.00,
  "status": "Confirmed",
  "specialRequests": "Quarto não fumante",
  "createdAt": "2025-08-01T10:00:00",
  "travellers": [
    {
      "firstName": "João",
      "lastName": "Silva",
      "cpf": "12345678901",
      "birthDate": "1990-01-01"
    }
  ]
}
```

### 💰 Integração Financeira (Stripe)

#### Endpoints Financeiros
```http
GET    /api/Payments/balance         # Consultar saldo
POST   /api/Payments/charge          # Processar pagamento
GET    /api/Payments/transactions    # Listar transações
POST   /api/Payments/refund/{id}     # Processar reembolso
```

**Processar Pagamento:**
```bash
curl -X POST http://localhost:5155/api/Payments/charge \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 750.00,
    "currency": "brl",
    "source": "tok_visa",
    "description": "Reserva Hotel Copacabana",
    "reservationId": 1
  }'
```

### 👨‍💼 Gestão de Funcionários

#### Endpoints Funcionários (MVC)
```http
GET    /Employees               # Listar funcionários
GET    /Employees/Create        # Formulário criar funcionário
POST   /Employees/Create        # Criar funcionário
GET    /Employees/Edit/{id}     # Formulário editar funcionário
POST   /Employees/Edit/{id}     # Atualizar funcionário
DELETE /Employees/Delete/{id}   # Excluir funcionário
```

**Modelo de Funcionário:**
```json
{
  "id": 1,
  "email": "funcionario@hotel.com",
  "firstName": "Maria",
  "lastName": "Santos",
  "cpf": "98765432100",
  "phone": "(11) 88888-7777",
  "role": "Attendant",
  "department": "Recepção",
  "hireDate": "2025-01-15",
  "isActive": true
}
```

### 📊 Dashboard e Relatórios

#### Endpoints Dashboard (MVC)
```http
GET    /Admins/Dashboard              # Dashboard principal
GET    /Admins/FaturamentoDetalhado   # Relatório detalhado
```

#### Endpoints Relatórios (API)
```http
GET    /api/Reports/revenue           # Relatório de receita
GET    /api/Reports/occupancy         # Taxa de ocupação
GET    /api/Reports/bookings          # Estatísticas de reservas
GET    /api/Reports/hotels-performance # Performance por hotel
```

### 🛡️ Autenticação de Requisições

#### Headers Necessários
```http
Cookie: .AspNetCore.Cookies=CfDJ8M...
Content-Type: application/json
```

#### Verificar Autenticação
```bash
curl -X GET http://localhost:5155/api/Users \
  -H "Cookie: .AspNetCore.Cookies=SEU_COOKIE_AQUI"
```

### 📝 Códigos de Status

| Código | Descrição |
|--------|-----------|
| 200 | Sucesso |
| 201 | Criado com sucesso |
| 400 | Dados inválidos |
| 401 | Não autenticado |
| 403 | Sem permissão |
| 404 | Não encontrado |
| 500 | Erro interno |

### 🧪 Testando as APIs

#### Usando Postman
1. Importe a collection: `docs/ViagemImpacta.postman_collection.json`
2. Configure a variável `{{baseUrl}}` para `http://localhost:5155`
3. Execute o login primeiro para obter cookies de autenticação

#### Usando curl
```bash
# Fazer login e salvar cookies
curl -c cookies.txt -X POST http://localhost:5155/Admins/Index \
  -d "Email=admin@hotel.com&Password=123456"

# Usar cookies em requisições subsequentes
curl -b cookies.txt -X GET http://localhost:5155/api/Users
```

---

## 🧪 Testes

### Backend
```bash
cd backend/ViagemImpacta.Tests
dotnet test
```

### Frontend
```bash
cd frontend
npm run test
# ou
yarn test
```

---

## 📦 Build para Produção

### Backend
```bash
cd backend/ViagemImpacta
dotnet publish -c Release -o ./publish
```

### Frontend
```bash
cd frontend
npm run build
# ou
yarn build
```

---

## 🐳 Docker (Opcional)

### Backend
```dockerfile
# Dockerfile para backend
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY . .
RUN dotnet publish -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "ViagemImpacta.dll"]
```

### Frontend
```dockerfile
# Dockerfile para frontend
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
```

---

## 🤝 Contribuição

1. **Fork** o projeto
2. Crie uma **branch** para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. Abra um **Pull Request**

### Padrões de Commit
```
feat: adiciona nova funcionalidade
fix: corrige bug
docs: atualiza documentação
style: ajustes de formatação
refactor: refatoração de código
test: adiciona ou modifica testes
```

---

## 🐛 Solução de Problemas

### Problemas Comuns

**❌ Erro de conexão com banco de dados**
```bash
# Verifique se o SQL Server está rodando
# Confirme a connection string em appsettings.json
dotnet ef database update
```

**❌ Frontend não conecta com backend**
```bash
# Verifique se o backend está rodando na porta correta
# Confirme a variável VITE_API_URL no arquivo .env
```

**❌ Erro de CORS**
```csharp
// Verifique se o CORS está configurado corretamente em Program.cs
app.UseCors();
```

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👥 Equipe

- **Desenvolvedor Principal** - [@oblipix](https://github.com/oblipix)

---

