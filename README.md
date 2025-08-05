<div align="center">
<img src="https://github.com/user-attachments/assets/dac0eaa1-3cbd-4a74-957d-6f244da6aca6" width="200px"style=> 
</div>


## Tripz Hospedagens

O Tripz será um portal de hospitalidade inovador, projetado para oferecer uma plataforma completa para hóspedes e gerentes de hotéis. O objetivo é facilitar o acesso a reservas, serviços de quarto e avaliações, além de um acompanhamento detalhado da estadia. Através de uma interface amigável e intuitiva, hóspedes poderão acessar recursos de lazer, realizar check-in e check-out online e monitorar seus gastos. Gerentes de hotéis poderão gerenciar quartos, reservas e serviços de forma centralizada, oferecendo uma experiência de hospedagem mais eficiente e personalizada para todos os envolvidos.

## Instruções de uso
<details>
 <summary> Ambiente de trabalho</summary>
<ul>
  Certifique-se de que você tem as seguintes ferramentas instaladas:
  
- .NET SDK 8.0: [Baixar aqui](https://dotnet.microsoft.com/download/dotnet/8.0)
  
- Node.js & npm: [Baixar aqui](https://nodejs.org/en) (a instalação do Node.js já inclui o npm)

- SQL Server: Você pode usar o [SQL Server Express](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) ou o LocalDB (instalado com o Visual Studio).
  
Abra seu terminal favorito (PowerShell, Git Bash, CMD) e clone o repositório para o seu diretório local:

- git clone [https://github.com/oblipix/ViagemImpacta.git](https://github.com/oblipix/ViagemImpacta.git)
  <br><br/>
Exemplo de string de conexão para LocalDB:

- "ViagemImpactConnection": "Server=(localdb)\\mssqllocaldb;Database=ViagemImpactaDb;Trusted_Connection=True;MultipleActiveResultSets=true"
  
  </ul>
</details>
<details>
 <summary> Bibliotecas</summary>
<ul>
Backend
  
- Abra o terminal e baixe as bibliotecas
  
- Install-Package Microsoft.AspNetCore.Authentication.JwtBearer
  
- Install-Package AutoMapper
  
- Install-Package AutoMapper.Extensions.Microsoft.DependencyInjection
  
- Install-Package Stripe.net
  
- Install-Package Microsoft.EntityFrameworkCore.SqlServer
  
- Install-Package Microsoft.EntityFrameworkCore.Tools
  
- Install-Package Microsoft.EntityFrameworkCore.Design

frontend

- npm install

  </ul>
</details>
<details>
 <summary> Comandos</summary>
<ul>
  Adicionar uma nova migração no terminal do nugget:

  - add-migrations <NomeDaMigracao>

  - update-database 

  rodar o front
- npm run dev

  </ul>
</details>

## Funcionalidades Implementadas

<details>
<summary>Épico 1 – Cadastro e Autenticação de Usuários</summary>
<ul>
  
- US01: Criar conta como cliente. O cliente deve poder se registrar com validação de dados e receber um e-mail de confirmação.

- US02: Recuperar senha. Usuário pode redefinir a senha via e-mail e fazer login com a nova senha.

- US03: Login do cliente. Usuário deve ser autenticado com credenciais corretas e ser direcionado para sua área de cliente.

- US04: Login do administrador. Administrador deve acessar o painel de administração com credenciais válidas.

- US05: Controle de perfis. Administrador pode atribuir diferentes permissões (cliente, atendente, gestor) aos usuários.
</ul>
</details>
<details>
<summary>Épico 2 – Hoteis</summary>
<ul>
  
- US06: Cadastro de hoteis. Administrador deve poder criar pacotes completos, que são salvos e aparecem na listagem pública.

- US07: Editar/excluir pacotes. O administrador pode editar os dados de um pacote ou excluí-lo (com confirmação).

- US08: Listagem e filtros. Usuário pode usar filtros por destino, data ou preço para encontrar pacotes.

- US09: Visualização de detalhes. Ao clicar em um pacote, o usuário deve ver todos os detalhes, como fotos, descrição, datas e valor.
</ul>
</details>
<details>
<summary>Épico 3 – Reservas</summary>
<ul>

- US10: Escolher o hotel e data. Cliente pode selecionar um pacote e uma data disponível para iniciar o processo de reserva.

- US11: Inserir dados dos viajantes. O sistema deve validar e salvar os dados de todos os viajantes na reserva.

- US12: Visualizar reservas no admin. O administrador deve ver uma lista de todas as reservas com status, datas e clientes associados.
</ul>
</details>
<details>
<summary>Épico 4 – Pagamentos</summary>
<ul>

- US13: Efetuar pagamento. Após finalizar a reserva, o sistema deve processar o pagamento via gateway integrado.

- US14: Receber comprovante por e-mail. Após a confirmação do pagamento, o cliente recebe um e-mail com o comprovante e os detalhes da reserva.

- US15: Ver status do pagamento. O administrador deve visualizar o status do pagamento (pendente, aprovado, recusado) de uma reserva.
</ul>
</details>
<details>
<summary>Épico 5 – Painel Administrativo</summary>
<ul>

- US16: Métricas no painel. O painel deve exibir gráficos e números de vendas por período, destino e status.

- US17: Exportar relatórios. Administrador pode exportar dados do sistema em formatos como Excel ou PDF.

- US18: Suporte ao cliente. Administrador pode buscar clientes por CPF ou nome para ver suas reservas e dar suporte.
</ul>
</details>

<details>
<summary>Épico 6 – Avaliações</summary>
<ul>

- US19: Avaliar pacote. Após a viagem, o cliente pode dar uma nota e escrever um comentário para o pacote.

- US20: Moderação de comentários. Administrador pode gerenciar, aprovar ou remover as avaliações dos clientes.
</ul>
</details>
<details>
<summary>Épico 7 – Usabilidade</summary>
<ul>

- US21: Acesso via celular. O site deve ser responsivo e se adaptar a telas de celulares e tablets.

- US22: Acessibilidade. O site deve ser acessível, com suporte a leitores de tela e navegação por teclado.
</ul>
</details>


## 💻 Tecnologias Usadas
- **Linguagem de Programação**:<br>![C#](https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=c-sharp&logoColor=white)
  ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
- **Banco de Dados**:<br>![SQL Server](https://img.shields.io/badge/Microsoft%20SQL%20Server-CC2927?style=for-the-badge&logo=microsoft%20sql%20server&logoColor=white)
- **Framework de Desenvolvimento Web**:<br>![.NET](https://img.shields.io/badge/.NET-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)
- **Frontend**:<br>![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
- **Organização**:<br>![Jira](https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=jira&logoColor=white)![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

## 🖇️Links 
-  [Projeto - Jira](https://matheusclcclc-1752064913933.atlassian.net/jira/software/projects/SCRUM/boards/1/backlog?atlOrigin=eyJpIjoiYzUzNTk3YzEyOWY4NGQwNWJjODQ4NzE3Nzk2MmEzNzAiLCJwIjoiaiJ9)
- [Protótipo Lo-Fi & Sketchboard - Figma](https://www.figma.com/proto/epp3vRexzmU4C3Twsh4ZWI/Untitled?node-id=0-1&t=R4FQwUqcs4BoGPUP-1)



## 🙋‍♂️ Criado por:

- **Matheus Lustosa** - <a href="mailto:matheusclc@hotmail.com"><img src="https://github.com/user-attachments/assets/d910e050-b74b-4dfd-9c58-bd3e6be60e8b" width="25"></a> - <a href="https://www.linkedin.com/in/matheus-lustosa-827010242/"><img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" width="20"></a>
- **Poliana Barros** - <a href="mailto:polibarross@gmail.com"><img src="https://github.com/user-attachments/assets/d910e050-b74b-4dfd-9c58-bd3e6be60e8b" width="25"></a> - <a href="https://www.linkedin.com/in/polianabrandao1/"><img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" width="20"></a>
- **Maximus Rosas** - <a href="mailto:lianthg07@gmail.com"><img src="https://github.com/user-attachments/assets/d910e050-b74b-4dfd-9c58-bd3e6be60e8b" width="25"></a> - <a href="https://www.linkedin.com/in/maximus-rosas-burgos-30a048276/"><img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" width="20"></a>
- **Matheus Maia** - <a href="matheusmaiagoulart@outlook.com"><img src="https://github.com/user-attachments/assets/d910e050-b74b-4dfd-9c58-bd3e6be60e8b" width="25"></a> - <a href="https://www.linkedin.com/in/matheusmaiagoulart/"><img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" width="20"></a>
- **Marcelo Gonçalves** - <a href="mailto:marcelojunior_@outlook.com.br"><img src="https://github.com/user-attachments/assets/d910e050-b74b-4dfd-9c58-bd3e6be60e8b" width="25"></a> - <a href="https://www.linkedin.com/in/marcelogjr/"><img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" width="20"></a>
- **Maria Carolina** - <a href="mailto:mariacarolinatech@gmail.com"><img src="https://github.com/user-attachments/assets/d910e050-b74b-4dfd-9c58-bd3e6be60e8b" width="25"></a> - <a href="https://www.linkedin.com/in/mariacarolinalv/"><img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" width="20"></a>
- **Rodrigo Santos** - <a href="mailto:rodrigo_rwa@hotmail.com"><img src="https://github.com/user-attachments/assets/d910e050-b74b-4dfd-9c58-bd3e6be60e8b" width="25"></a> - <a href="https://www.linkedin.com/in/rodrigospmelo/"><img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" width="20"></a>

## ✨ Contribuição
<a href="https://github.com/oblipix/ViagemImpacta/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=oblipix/ViagemImpacta" />
</a>
