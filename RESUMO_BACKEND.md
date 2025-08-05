# Resumo do Backend - ViagemImpacta

## Sistema Backend ASP.NET Core MVC

O **backend do ViagemImpacta** é uma aplicação robusta desenvolvida em ASP.NET Core MVC que serve como espinha dorsal do sistema de gestão hoteleira. Esta API RESTful fornece todos os serviços necessários para gerenciar reservas, usuários, hotéis e operações financeiras de forma segura e eficiente.

### Arquitetura e Estrutura

O backend foi estruturado seguindo o padrão **MVC (Model-View-Controller)** com uma arquitetura em camadas bem definida. A separação de responsabilidades é implementada através de repositórios para acesso a dados, serviços para lógica de negócio, e controllers para exposição de endpoints. Esta organização garante manutenibilidade, testabilidade e escalabilidade do código.

A **persistência de dados** é gerenciada pelo Entity Framework Core, que implementa o padrão Repository e Unit of Work. O sistema utiliza migrações para versionamento do banco de dados, garantindo consistência entre diferentes ambientes de desenvolvimento e produção.

### Funcionalidades e Módulos

O sistema possui **controllers especializados** para diferentes domínios: AdminsController para gestão administrativa, UsersController para gerenciamento de clientes, EmployeesController para funcionários, HotelsController para estabelecimentos, e ReservationsController para o core business de reservas.

A **autenticação e autorização** são implementadas através de cookies authentication com diferentes níveis de acesso (Admin e Attendant). O sistema utiliza claims-based authentication para gerenciar permissões e proteger endpoints sensíveis. Senhas são criptografadas usando BCrypt para máxima segurança.

A **integração com Stripe** permite processamento seguro de pagamentos, consulta de balanços e geração de relatórios financeiros. O StripeService encapsula toda a lógica de pagamentos, mantendo as chaves de API seguras através do sistema de configuração do ASP.NET Core.

### Serviços e Lógica de Negócio

O **AuthService** gerencia toda a lógica de autenticação, incluindo login, logout e manutenção de sessões. O **ReservationService** implementa regras complexas de negócio para validação de disponibilidade, cálculo de preços e gestão do ciclo de vida das reservas.

O **UserService** fornece operações CRUD completas para usuários, incluindo funcionalidades de recuperação de senha via email. O sistema de **notificações por email** é implementado através de um serviço SMTP configurável, permitindo envio de confirmações e atualizações para os usuários.

### Segurança e Performance

O backend implementa **validação robusta** em múltiplas camadas, desde Data Annotations nos models até validações customizadas nos services. CORS está configurado para permitir comunicação segura com o frontend, enquanto HTTPS é enforçado em produção.

O sistema utiliza **injeção de dependência** nativa do ASP.NET Core para gerenciar o ciclo de vida dos serviços, promovendo baixo acoplamento e facilitando testes unitários. Logging integrado permite monitoramento e debugging eficientes.

### Modelo de Dados

O **schema do banco** inclui entidades principais como User, Hotel, Room, Reservation, Travellers, e Promotion. Relacionamentos são modelados através de foreign keys e navigation properties, permitindo queries eficientes via LINQ. O Entity Framework gerencia automaticamente a criação e atualização das tabelas através de migrações.

### Views e Apresentação

Embora seja primariamente uma API, o backend inclui **Views Razor** para o painel administrativo, oferecendo interfaces web completas para gestão do sistema. As views utilizam Bootstrap e CSS customizado para uma apresentação profissional e responsiva.

### Conclusão

O backend do ViagemImpacta representa uma implementação sólida e profissional de uma API de gestão hoteleira. Combina as melhores práticas do desenvolvimento .NET com funcionalidades específicas do domínio hoteleiro, resultando em um sistema confiável, seguro e escalável que atende às necessidades complexas do setor de hospitalidade.

---

**Principais Tecnologias:**
- ASP.NET Core MVC 8.0
- Entity Framework Core
- SQL Server / SQLite
- Stripe API para pagamentos
- BCrypt para criptografia
- SMTP para emails
- Bootstrap e CSS customizado

**Funcionalidades Implementadas:**
- Sistema de autenticação e autorização completo
- CRUD para todas as entidades principais
- Integração com gateway de pagamento
- Dashboard administrativo com gráficos
- Sistema de notificações por email
- Validação robusta e tratamento de erros
