# Portfólio Pessoal - Rodrigo Martins

Este é um portfólio pessoal estático desenvolvido com HTML, CSS (Tailwind) e JavaScript vanilla.

## Características

- Design responsivo e acessível
- Tema escuro por padrão com opção de alternar para tema claro
- Animações suaves e efeitos visuais leves
- Carregamento dinâmico de projetos a partir de JSON
- Formulário de contato (demonstrativo)

## Estrutura do Projeto

```
portfolio/
├── index.html              # Página principal
├── assets/
│   ├── css/
│   │   └── style.css       # Estilos personalizados
│   ├── data/
│   │   └── projects.json   # Dados dos projetos
│   ├── img/                # Imagens e placeholders
│   ├── js/
│   │   └── main.js         # JavaScript principal
│   ├── pdf/
│   │   └── CV_Rodrigo_Martins.pdf  # CV para download
│   └── favicon/            # Arquivos de favicon
├── robots.txt              # Instruções para crawlers
└── sitemap.xml             # Mapa do site para SEO
```

## Como Usar

1. Clone este repositório para sua máquina local:
   ```
   git clone https://github.com/seu-username/portfolio.git
   ```

2. Abra o arquivo `index.html` em seu navegador para visualizar o site.

3. Personalize o conteúdo:
   - Edite `index.html` para atualizar textos e informações pessoais
   - Modifique `assets/data/projects.json` para adicionar seus próprios projetos
   - Substitua as imagens em `assets/img/` por suas próprias imagens
   - Coloque seu CV atualizado em `assets/pdf/`

## Publicando no GitHub Pages

1. Faça push do repositório para o GitHub:
   ```
   git add .
   git commit -m "Versão inicial do portfólio"
   git push origin main
   ```

2. No GitHub, vá para **Settings** > **Pages**

3. Na seção **Source**, selecione **Deploy from a branch**

4. Escolha a branch **main** e pasta **/ (root)** e clique em **Save**

5. Aguarde alguns minutos para que seu site seja publicado. O URL será exibido na parte superior da página.

### Domínio Personalizado (opcional)

1. No GitHub Pages, na seção **Custom domain**, digite seu domínio personalizado

2. Crie um arquivo `CNAME` na raiz do projeto com seu domínio:
   ```
   seudominio.com
   ```

3. Configure os registros DNS conforme as instruções do GitHub

## Tecnologias Utilizadas

- HTML5
- CSS3 com Tailwind CSS
- JavaScript vanilla
- Animações CSS
- Intersection Observer API
- Fetch API

## Acessibilidade

Este projeto segue práticas recomendadas de acessibilidade:
- Contraste adequado (WCAG AA)
- Estrutura HTML semântica
- Navegação por teclado
- Atributos ARIA quando necessário
- Alternativas textuais para imagens

---

Desenvolvido por Rodrigo Martins, 2025.
