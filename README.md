# MP3 Player — Setup Rápido

## Instalar

```bash
npm install
npm run dev
```

---

## Estrutura

```
src/
├── assets/
│   └── player.png          ← sua imagem do player
├── components/
│   ├── PlayerScreen.jsx    ← tela CRT (posicione sobre o player)
│   └── tabs/
│       ├── AboutMe.jsx     ← aba "Sobre mim"
│       ├── Interests.jsx   ← aba "Interesses"
│       └── Music.jsx       ← aba "Músicas" + áudio
├── store/
│   └── usePlayerStore.js   ← estado global (Zustand)
├── styles/
│   └── crt.css             ← estética fósforo verde
├── App.jsx                 ← raiz + posicionamento
├── App.css                 ← layout do player
└── main.jsx
public/
└── music/                  ← coloque seus .mp3 aqui
```

---

## Posicionar a tela

Em `src/App.css`, edite `.screen-overlay`:

```css
.screen-overlay {
  top:    80px;   /* distância do topo da imagem */
  left:   60px;   /* distância da esquerda */
  width:  280px;  /* largura da tela no player */
  height: 200px;  /* altura da tela no player */
}
```

---

## Adicionar músicas

Coloque os arquivos em `public/music/`:

```
public/music/
  minha-musica.mp3
  outra-faixa.ogg
```

Eles aparecem automaticamente na aba "Músicas".

---

## Conectar os botões do player

Importe o store e chame as ações nos seus botões posicionados:

```jsx
import usePlayerStore from './store/usePlayerStore'

// Dentro de qualquer componente:
const { togglePlay, nextTab, prevTab, volumeUp, volumeDown } = usePlayerStore()

// Fora de componente (handlers de eventos diretos):
usePlayerStore.getState().togglePlay()
```

### Ações disponíveis

| Ação            | Efeito                              |
|-----------------|-------------------------------------|
| `togglePlay()`  | play / pause da música atual        |
| `play()`        | play                                |
| `pause()`       | pause                               |
| `nextTab()`     | próxima aba (Sobre → Interesses → Músicas) |
| `prevTab()`     | aba anterior                        |
| `volumeUp()`    | +10%                                |
| `volumeDown()`  | -10%                                |
| `setVolume(n)`  | volume exato 0-100                  |

### Variável global da música atual

```js
// Leitura em qualquer lugar
const currentSong = usePlayerStore.getState().currentSong
// { name: string, url: string } | null

// Reativo em componente
const currentSong = usePlayerStore(s => s.currentSong)
```

---

## Personalizar conteúdo

- **Sobre mim** → edite o array `lines` em `src/components/tabs/AboutMe.jsx`
- **Interesses** → edite o array `categories` em `src/components/tabs/Interests.jsx`
- **Cores CRT** → edite as variáveis `--crt-*` em `src/styles/crt.css`
