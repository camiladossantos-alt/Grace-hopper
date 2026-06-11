# Design Guide: Hero Section com Fotografia e Botões Translúcidos

## 📋 Visão Geral

Este documento define as especificações para construir uma hero section moderna, minimalista e elegante. O foco é na fotografia em grande formato com controles visuais discretos (botões translúcidos).

**Princípios de Design:**
- Fotografia como protagonista
- Hierarquia visual clara
- Interface discreta e sofisticada
- Espaço negativo estratégico
- Sem elementos textuais sobre a fotografia

---

## 🎨 Estrutura de Layout

### Composição Geral

```
┌─────────────────────────────────────┐
│                                     │
│    FOTOGRAFIA EM GRANDE ESCALA     │
│    (100% da viewport width)         │
│    (70vh - 100vh de altura)         │
│                                     │
│    [Botão]  [Botão]                 │
│    (Translúcido)                    │
│                                     │
└─────────────────────────────────────┘
```

### Distribuição Vertical

| Camada | Conteúdo | Altura |
|--------|----------|--------|
| Background | Fotografia (full width) | 100% da altura |
| Overlay | Gradient sutil (opcional) | 100% |
| CTA Area | Botões translúcidos | Fixed ou Absolute |

---

## 📷 Fotografia (Imagem Principal)

### Especificações Técnicas

**Dimensões:**
- Width: 100% da viewport
- Height: 70vh (mobile) a 100vh (desktop)
- Object-fit: `cover` (garante preenchimento sem distorção)
- Object-position: `center` (padrão; ajustar conforme necessidade)

**Requisitos da Imagem:**
- Resolução mínima: 1920x1080px para desktop
- Formato recomendado: WebP ou AVIF (com fallback JPG)
- Peso máximo: 500KB (otimizada)
- Proporção: Qualquer uma (será coberta pelo container)

**CSS:**

```css
.hero-image {
  width: 100%;
  height: 100vh;
  object-fit: cover;
  object-position: center;
  display: block;
}

@media (max-width: 768px) {
  .hero-image {
    height: 70vh;
  }
}
```

### Overlay (Opcional)

Um overlay sutil para melhorar legibilidade dos botões (caso a foto seja muito clara):

```css
.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.2) 0%,
    rgba(0, 0, 0, 0) 50%,
    rgba(0, 0, 0, 0.1) 100%
  );
  pointer-events: none;
}
```

---

## 🔘 Botões Translúcidos

### Design dos Botões

**Características:**
- Background: `rgba(255, 255, 255, 0.15)` (ajustável conforme a foto)
- Backdropfilter: `blur(10px)` (efeito glassmorphism)
- Sem borda, ou borda muito sutil
- Text: branco ou cor clara
- Transição suave em hover

### Especificações Visuais

| Propriedade | Valor |
|------------|-------|
| Background | `rgba(255, 255, 255, 0.15)` |
| Backdrop Filter | `blur(10px)` |
| Border | `1px solid rgba(255, 255, 255, 0.2)` (opcional) |
| Padding | 14px 32px |
| Border Radius | 8px |
| Font Size | 16px (desktop), 14px (mobile) |
| Font Weight | 500 |
| Color | #FFFFFF |
| Cursor | pointer |

### CSS Implementação

```css
.btn-translucent {
  display: inline-block;
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-translucent:hover {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.btn-translucent:active {
  transform: translateY(0);
}

@media (max-width: 768px) {
  .btn-translucent {
    padding: 12px 24px;
    font-size: 14px;
  }
}
```

### Variações de Botões

**Primário (Principal):**
```css
.btn-primary {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.btn-primary:hover {
  background: rgba(255, 255, 255, 0.3);
}
```

**Secundário (Contraste menor):**
```css
.btn-secondary {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.15);
}
```

---

## 📐 Posicionamento dos Botões

### Opção 1: Centro Inferior (Recomendado)

```css
.hero-buttons {
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
  z-index: 10;
}

@media (max-width: 768px) {
  .hero-buttons {
    bottom: 40px;
    gap: 12px;
  }
}
```

### Opção 2: Canto Inferior Esquerdo

```css
.hero-buttons {
  position: absolute;
  bottom: 60px;
  left: 40px;
  display: flex;
  gap: 16px;
  z-index: 10;
}

@media (max-width: 768px) {
  .hero-buttons {
    left: 20px;
    bottom: 40px;
    flex-direction: column;
  }
}
```

### Opção 3: Canto Inferior Direito

```css
.hero-buttons {
  position: absolute;
  bottom: 60px;
  right: 40px;
  display: flex;
  gap: 16px;
  z-index: 10;
}
```

---

## 🏗️ Estrutura HTML

```html
<section class="hero">
  <!-- Imagem de fundo -->
  <img 
    src="hero-image.webp" 
    alt="Hero section" 
    class="hero-image"
  />
  
  <!-- Overlay opcional -->
  <div class="hero-overlay"></div>
  
  <!-- Container dos botões -->
  <div class="hero-buttons">
    <button class="btn-translucent btn-primary">
      Explorar
    </button>
    <button class="btn-translucent btn-secondary">
      Saiba mais
    </button>
  </div>
</section>
```

---

## 🎯 Container Principal

```css
.hero {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: #000; /* Fallback se imagem não carregar */
}

@media (max-width: 768px) {
  .hero {
    height: 70vh;
  }
}
```

---

## 🌐 Responsividade

### Desktop (1920px+)
- Height: 100vh
- Botões: Display flex, gap 16px
- Padding: 60px from bottom

### Tablet (768px - 1919px)
- Height: 85vh
- Botões: Mantém layout flex
- Padding: 50px from bottom

### Mobile (< 768px)
- Height: 70vh
- Botões: Stack vertical (flex-direction: column)
- Padding: 40px from bottom
- Botões: 100% width ou auto

```css
@media (max-width: 768px) {
  .hero {
    height: 70vh;
  }
  
  .hero-buttons {
    flex-direction: column;
    width: auto;
    gap: 12px;
  }
  
  .btn-translucent {
    width: 100%;
    padding: 12px 24px;
  }
}
```

---

## 🎬 Animações (Opcional)

### Entrada dos Botões

```css
@keyframes slideUpFade {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-buttons {
  animation: slideUpFade 0.8s ease-out 0.3s both;
}

.hero-buttons .btn-translucent:nth-child(2) {
  animation-delay: 0.5s;
}
```

### Parallax (Avançado)

```javascript
// JavaScript para efeito parallax suave na imagem
document.addEventListener('scroll', () => {
  const heroImage = document.querySelector('.hero-image');
  const scrollY = window.scrollY;
  heroImage.style.transform = `translateY(${scrollY * 0.5}px)`;
});
```

---

## 🔍 Checklist de Implementação

- [ ] Imagem otimizada e comprimida (< 500KB)
- [ ] Fallbacks de formato de imagem (WebP → JPG)
- [ ] Botões com estado `:hover` e `:active`
- [ ] Responsividade testada em mobile, tablet e desktop
- [ ] Acessibilidade: `alt` text na imagem, semântica HTML correta
- [ ] Performance: lazy loading para imagem se apropriado
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Backup color no caso da imagem não carregar

---

## ♿ Acessibilidade

```html
<section class="hero" role="region" aria-label="Hero section">
  <img 
    src="hero-image.webp" 
    alt="[Descrição relevante da imagem em português]"
    class="hero-image"
  />
  
  <div class="hero-buttons">
    <button class="btn-translucent btn-primary" aria-label="Explorar conteúdo">
      Explorar
    </button>
    <button class="btn-translucent btn-secondary" aria-label="Mais informações">
      Saiba mais
    </button>
  </div>
</section>
```

---

## 📱 Exemplo Completo (HTML + CSS)

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hero Section</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .hero {
      position: relative;
      width: 100%;
      height: 100vh;
      overflow: hidden;
      background-color: #000;
    }

    .hero-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      display: block;
    }

    .hero-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.2) 0%,
        rgba(0, 0, 0, 0) 50%,
        rgba(0, 0, 0, 0.1) 100%
      );
      pointer-events: none;
    }

    .hero-buttons {
      position: absolute;
      bottom: 60px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      justify-content: center;
      z-index: 10;
      animation: slideUpFade 0.8s ease-out 0.3s both;
    }

    @keyframes slideUpFade {
      from {
        opacity: 0;
        transform: translateX(-50%) translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
    }

    .btn-translucent {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 14px 32px;
      font-size: 16px;
      font-weight: 500;
      color: #ffffff;
      background: rgba(255, 255, 255, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      backdrop-filter: blur(10px);
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: none;
      gap: 8px;
    }

    .btn-translucent:hover {
      background: rgba(255, 255, 255, 0.25);
      border-color: rgba(255, 255, 255, 0.3);
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    }

    .btn-translucent:active {
      transform: translateY(0);
    }

    @media (max-width: 768px) {
      .hero {
        height: 70vh;
      }

      .hero-buttons {
        flex-direction: column;
        gap: 12px;
        bottom: 40px;
      }

      .btn-translucent {
        padding: 12px 24px;
        font-size: 14px;
        width: 100%;
        max-width: 300px;
      }
    }
  </style>
</head>
<body>
  <section class="hero">
    <img src="hero-image.webp" alt="Hero section" class="hero-image">
    <div class="hero-overlay"></div>
    <div class="hero-buttons">
      <button class="btn-translucent">Explorar</button>
      <button class="btn-translucent">Saiba mais</button>
    </div>
  </section>
</body>
</html>
```

---

## 🎨 Paleta de Cores

**Cores Base:**
- Fundo: Preto (#000000) - cor de fallback
- Botões: Branco translúcido (rgba(255, 255, 255, 0.15-0.25))
- Texto: Branco (#FFFFFF)
- Bordas: Branco semi-transparente (rgba(255, 255, 255, 0.2-0.3))

**Variações para Fotos Mais Escuras:**
- Aumentar a opacidade do botão: `rgba(255, 255, 255, 0.2-0.3)`
- Aumentar blur do backdrop: `blur(15px)`

**Variações para Fotos Mais Claras:**
- Usar preto translúcido: `rgba(0, 0, 0, 0.1-0.2)`
- Aumentar o overlay gradient

---

## 📊 Performance

**Otimizações:**
- Usar `<img>` com `srcset` para diferentes resoluções
- Lazy loading: `loading="lazy"` (se não for hero)
- WebP com fallback PNG/JPG
- CSS containment: `contain: layout style paint`
- Will-change para animações: `will-change: transform`

```html
<picture>
  <source srcset="hero-image.webp" type="image/webp">
  <source srcset="hero-image.jpg" type="image/jpeg">
  <img src="hero-image.jpg" alt="Hero section" class="hero-image">
</picture>
```

---

## 📝 Notas do Design

1. **Prioridade da Fotografia**: A imagem é o elemento principal. Todos os outros elementos devem ser discretos.

2. **Espaço Negativo**: Sem textos ou elementos visuais competindo com a foto.

3. **Glassmorphism**: Os botões translúcidos com blur criam uma sensação moderna e sofisticada.

4. **Contraste**: Importante que os botões contrastem bem com a imagem. Ajuste a opacidade conforme necessário.

5. **Interatividade**: Hover states são importantes para feedback visual. Mantenha transições suaves.

6. **Responsividade**: Adapte a altura e layout dos botões para telas menores.

---

**Versão do Documento:** 1.0  
**Última Atualização:** 2026  
**Compatibilidade:** Todos os browsers modernos (Chrome, Firefox, Safari, Edge)