# Lawgic Dev Kit - Estructura del Proyecto

> **lawgic-dev-kit** v0.22.2 — Biblioteca de componentes UI para Lawgic

---

## 1. Tecnologias

| Categoria | Tecnologia | Version |
|---|---|---|
| **Framework** | React | ^18.2, <20 |
| **Lenguaje** | TypeScript | ~5.7.2 |
| **Bundler** | Vite | ^6.2.0 |
| **Transpilador** | SWC (via @vitejs/plugin-react-swc) | ^3.8.0 |
| **Estilos** | Tailwind CSS v4 + PostCSS | ^4.1.5 |
| **Iconos** | FontAwesome (Free + Pro) | ^6.5.x |
| **Formularios** | react-hook-form | ^7.54.2 |
| **Validacion** | Yup | ^1.6.1 |
| **Animaciones** | Motion | ^12.5.0 |
| **Floating UI** | @floating-ui/react | ^0.27.5 |
| **Busqueda fuzzy** | Fuse.js | ^7.1.0 |
| **Fechas** | date-fns | ^4.1.0 |
| **Clases CSS** | clsx | ^2.1.1 |
| **Tipado Tailwind** | tailwindest | ^3.1.1 |
| **Storybook** | Storybook | ^8.6.4 |
| **Testing** | Vitest + Playwright | ^3.0.8 / ^1.51.0 |
| **Linter** | ESLint | ^9.21.0 |

---

## 2. Arquitectura del Proyecto

El proyecto sigue el patron **Atomic Design** (atoms -> molecules -> organisms).

```
lawgicDevKit/
├── .storybook/                  # Configuracion de Storybook
│   ├── main.ts
│   ├── preview.ts
│   └── vitest.setup.ts
├── dist/                        # Build output (ES + UMD + CSS + .d.ts)
├── src/
│   ├── components/
│   │   ├── atoms/               # ~43 componentes atomicos
│   │   ├── molecules/           # ~20 componentes compuestos
│   │   └── organisms/           # Organismos (placeholder)
│   ├── constants/
│   │   └── countries.ts         # Lista de paises
│   ├── contexts/
│   │   └── themeContext.ts       # Context de tema
│   ├── hooks/
│   │   ├── useTheme.ts          # Hook para acceder al tema
│   │   └── useFilterToggler.ts  # Hook para togglear filtros
│   ├── providers/
│   │   └── ThemeProvider.tsx     # Provider del tema
│   ├── themes/
│   │   ├── default.ts           # Tema por defecto (aqua)
│   │   ├── types.ts             # Interface LawgicTheme
│   │   └── index.ts
│   ├── types/                   # Definiciones de tipos TypeScript
│   │   ├── styleValues.ts       # Color, Variant, Size, Shadow
│   │   ├── baseModalProps.ts
│   │   ├── display.ts
│   │   ├── fileInfo.ts
│   │   ├── i18n.ts
│   │   ├── modal.ts
│   │   ├── modalType.ts
│   │   ├── navbarOption.ts
│   │   ├── sidebarOption.ts
│   │   ├── stepper.ts
│   │   ├── toast.ts
│   │   └── index.ts
│   ├── utils/                   # Funciones utilitarias
│   │   ├── cycles.ts
│   │   ├── dates.ts
│   │   ├── files.ts
│   │   ├── images.ts
│   │   ├── modal.tsx
│   │   ├── renderContentOptions.tsx
│   │   ├── stepper.ts
│   │   ├── strings.ts
│   │   ├── toast.tsx
│   │   └── index.ts
│   ├── index.ts                 # Entry point principal
│   └── index.css                # Estilos globales + Tailwind
├── tailwind.config.ts           # Configuracion completa de Tailwind
├── vite.config.ts               # Configuracion de build (lib mode)
├── vite.lab.config.ts           # Configuracion de Storybook
├── vitest.workspace.ts          # Configuracion de tests
├── tsconfig.app.json            # TypeScript config
├── eslint.config.js             # ESLint config
└── package.json
```

---

## 3. Sistema de Temas

### Interface del tema

```typescript
interface LawgicTheme {
  defaultColorScheme: Color;  // 'blue' | 'aqua' | 'red' | 'gray'
  t: TFunction;               // Funcion de traduccion (i18n)
}
```

### Tema por defecto

```typescript
const defaultTheme: LawgicTheme = {
  defaultColorScheme: "aqua",
  t: (string) => string,
};
```

### Tipos de estilo globales

```typescript
type Color   = 'blue' | 'aqua' | 'red' | 'gray';
type Variant = 'filled' | 'outline' | 'transparent' | 'invisible';
type Size    = 'lg' | 'base' | 'md' | 'sm' | 'xs';
type Shadow  = 'none' | 'blue';
```

---

## 4. Variables de Diseno (Design Tokens)

### 4.1 Paleta de Colores

#### Colores semanticos

| Token | Hex | Uso |
|---|---|---|
| `white` | `#FFF` | Fondo base |
| `error` | `#EB4571` | Estados de error |
| `success` | `#16A85B` | Estados de exito |
| `light` | `#F9FBFF` | Fondo claro alternativo |

#### Escala Blue

| Token | Hex | Muestra |
|---|---|---|
| `blue-50` | `#F9FAFE` | Fondo sutil |
| `blue-100` | `#ECF1FD` | Fondo ligero |
| `blue-200` | `#CAD6F9` | Borde ligero |
| `blue-300` | `#8FA9F3` | Acento suave |
| `blue-400` | `#6A8DEF` | Acento medio |
| `blue-500` | `#4570EB` | **Color principal** |
| `blue-600` | `#375ABC` | Hover |
| `blue-700` | `#29438D` | Active/pressed |
| `blue-800` | `#1C2D5E` | Texto oscuro |
| `blue-900` | `#0E162F` | Texto muy oscuro |

#### Escala Aqua (color por defecto del tema)

| Token | Hex | Muestra |
|---|---|---|
| `aqua-100` | `#D4F5F1` | Fondo ligero |
| `aqua-200` | `#7DE2D6` | Borde ligero |
| `aqua-300` | `#51D9C9` | Acento suave |
| `aqua-400` | `#27CFBB` | Acento medio |
| `aqua-500` | `#1DA696` | **Color principal** |
| `aqua-600` | `#167C70` | Hover |
| `aqua-700` | `#0F534B` | Active/pressed |
| `aqua-800` | `#092925` | Texto oscuro |

#### Escala Gray

| Token | Hex | Muestra |
|---|---|---|
| `gray-100` | `#F0F0F2` | Fondo deshabilitado |
| `gray-200` | `#C7C8CA` | Bordes |
| `gray-300` | `#ABACAF` | Placeholder |
| `gray-400` | `#8F9095` | Texto secundario |
| `gray-500` | `#72747A` | Texto medio |
| `gray-600` | `#57595F` | Texto principal |
| `gray-700` | `#3B3D45` | Texto enfasis |
| `gray-800` | `#1E212A` | Texto maximo contraste |

#### Escala Red

| Token | Hex |
|---|---|
| `red-500` | `#EB4571` |
| `red-600` | `#B23456` |
| `red-700` | `#8F2945` |

#### Escala Green

| Token | Hex |
|---|---|
| `green-500` | `#16A85B` |
| `green-600` | `#117B43` |
| `green-700` | `#0F6136` |

---

### 4.2 Tipografia

**Base:** `html { font-size: 62.5% }` (1rem = 10px)

#### Headers (responsive)

| Clase | Mobile | Desktop (>=md) | Peso |
|---|---|---|---|
| `text-header-1` | 2.8rem (28px) | 4rem (40px) | 700 |
| `text-header-2` | 2.4rem (24px) | 3.2rem (32px) | 700 |
| `text-header-3` | 1.8rem (18px) | 2.4rem (24px) | 700 |
| `text-header-4` | 1.6rem (16px) | 1.8rem (18px) | 700 |
| `text-header-5` | 1.6rem (16px) | 1.6rem (16px) | 700 |

#### Body

| Clase | Tamano |
|---|---|
| `text-body-l` | 1.8rem (18px) |
| `text-body-m` | 1.6rem (16px) |
| `text-body-s` | 1.4rem (14px) |
| `text-label` | 1.2rem (12px) |

#### Escala generica

| Clase | Tamano |
|---|---|
| `text-xs` | 1rem (10px) |
| `text-sm` | 1.2rem (12px) |
| `text-md` | 1.3rem (13px) |
| `text-base` | 1.4rem (14px) |
| `text-lg` | 1.6rem (16px) |
| `text-xl` | 1.8rem (18px) |
| `text-2xl` | 2rem (20px) |
| `text-3xl` | 2.4rem (24px) |
| `text-4xl` | 3.2rem (32px) |
| `text-5xl` | 3.6rem (36px) |
| `text-6xl` | 4rem (40px) |
| `text-7xl` | 4.8rem (48px) |
| `text-8xl` | 6.4rem (64px) |
| `text-9xl` | 9.6rem (96px) |
| `text-10xl` | 12.8rem (128px) |

#### Pesos tipograficos

| Clase | Valor |
|---|---|
| `font-thin` | 100 |
| `font-extralight` | 200 |
| `font-light` | 300 |
| `font-normal` | 400 |
| `font-medium` | 500 |
| `font-semibold` | 600 |
| `font-bold` | 700 |
| `font-extrabold` | 800 |
| `font-black` | 900 |

---

### 4.3 Espaciado

Escala completa basada en rem (1rem = 10px):

| Key | Valor | Pixeles |
|---|---|---|
| `0` | 0px | 0px |
| `0.5` | 0.05rem | 0.5px |
| `1` | 0.1rem | 1px |
| `2` | 0.2rem | 2px |
| `3` | 0.3rem | 3px |
| `4` | 0.4rem | 4px |
| `5` | 0.5rem | 5px |
| `6` | 0.6rem | 6px |
| `8` | 0.8rem | 8px |
| `10` | 1.0rem | 10px |
| `12` | 1.2rem | 12px |
| `16` | 1.6rem | 16px |
| `20` | 2rem | 20px |
| `24` | 2.4rem | 24px |
| `32` | 3.2rem | 32px |
| `40` | 4rem | 40px |
| `48` | 4.8rem | 48px |
| `64` | 6.4rem | 64px |
| `80` | 8rem | 80px |
| `96` | 9.6rem | 96px |
| `128` | 12.8rem | 128px |
| `160` | 16rem | 160px |
| `200` | 20rem | 200px |
| `256` | 25.6rem | 256px |
| `320` | 32rem | 320px |
| `400` | 40rem | 400px |
| `480` | 48rem | 480px |
| `640` | 64rem | 640px |

#### Contenedores

| Key | Valor |
|---|---|
| `xs` | 32rem (320px) |
| `sm` | 48rem (480px) |
| `md` | 64rem (640px) |
| `lg` | 80rem (800px) |
| `xl` | 96rem (960px) |

---

### 4.4 Z-Index

| Clase | Valor | Uso recomendado |
|---|---|---|
| `z-0` | 0 | Base |
| `z-10` | 10 | Elementos elevados |
| `z-20` | 20 | Dropdowns |
| `z-30` | 30 | Sticky headers |
| `z-40` | 40 | Overlays |
| `z-50` | 50 | Modales |
| `z-99` | 99 | Tooltips |
| `z-999` | 999 | Notificaciones/toasts |
| `z-9999` | 9999 | Capa maxima |

---

### 4.5 Bordes

| Clase | Valor |
|---|---|
| `border` | 1px (default) |
| `border-0` | 0px |
| `border-2` | 2px |
| `border-3` | 3px |
| `border-4` | 4px |
| `border-8` | 8px |

---

### 4.6 Sombras

#### Box Shadows principales

| Clase | Descripcion |
|---|---|
| `shadow-sm` | Sombra sutil |
| `shadow` | Sombra por defecto |
| `shadow-md` | Sombra media |
| `shadow-lg` | Sombra grande |
| `shadow-xl` | Sombra extra grande |
| `shadow-2xl` | Sombra maxima |
| `shadow-blue-sh` | Brillo azul (`0px 0px 10px 4px rgba(199, 216, 255, 0.3)`) |
| `shadow-inner` | Sombra interior |
| `shadow-none` | Sin sombra |
| `shadow-0` a `shadow-24` | Escala material design (25 niveles de elevacion) |

---

## 5. Estilos Globales

Definidos en `src/index.css`:

- **Tailwind CSS v4** con directiva `@import 'tailwindcss'`
- **Base font-size:** `62.5%` (sistema 1rem = 10px)
- **Border color por defecto:** `var(--color-gray-200)`
- **Optimizacion de renderizado de texto** (`text-rendering: optimizeLegibility`)
- **Supresion de highlights tactiles** (`-webkit-tap-highlight-color: transparent`)
- **Todos los botones:** `cursor: pointer`
- **Sin outline en focus** (gestionado por componentes)
- **Clase `no-animate`:** Deshabilita transiciones/animaciones globalmente
- **Proteccion contra autofill** de Chrome (delay de transicion)
- **Utilidades custom de tipografia:** `text-header-1` a `text-header-5`, `body-l`, `body-m`, `body-s`, `label`

---

## 6. Componentes

### 6.1 Atoms (~43 componentes)

Componentes base, indivisibles.

| Componente | Descripcion |
|---|---|
| **ActionButton** | Boton con estilo contextual para acciones |
| **AsyncToast** | Notificacion toast con estados async |
| **Avatar** | Avatar de usuario |
| **BoxContainer** | Contenedor wrapper con estilos custom |
| **Button** | Boton principal con variantes (filled, outline, transparent, invisible) |
| **CenterModal** | Modal centrado en pantalla |
| **Checkbox** | Input tipo checkbox |
| **CircleProgress** | Indicador de progreso circular |
| **ClickAwayListener** | Detecta clics fuera del elemento |
| **CountryInput** | Input para seleccion de pais |
| **CountryLabel** | Label con bandera de pais |
| **CountrySelectInput** | Dropdown selector de pais |
| **Divider** | Linea separadora visual |
| **FilterPill** | Pill/badge de filtro activo |
| **FloatingCard** | Card flotante overlay |
| **IconButton** | Boton solo icono |
| **ImageProfileInput** | Upload de imagen de perfil |
| **IndexedStep** | Indicador de paso con indice numerico |
| **InfoCard** | Card informativa |
| **InformationDisclaimer** | Aviso/disclaimer informativo |
| **LoadingProgress** | Barra de carga lineal |
| **LoadingSpinner** | Spinner de carga animado |
| **PasswordInput** | Input de contrasena (con toggle visibilidad) |
| **PhoneInput** | Input de telefono con formato |
| **Pill** | Pill/badge/tag |
| **ProgressBar** | Barra de progreso horizontal |
| **SearchBar** | Barra de busqueda con icono |
| **SectionButton** | Boton de navegacion por secciones |
| **SelectInput** | Select/dropdown input |
| **SidebarButton** | Boton para sidebar |
| **StepIndicator** | Indicador de pasos multi-step |
| **Switch** | Toggle switch on/off |
| **Tab** | Elemento de tab individual |
| **TextButton** | Boton de solo texto |
| **TextInput** | Input de texto estandar |
| **TextStaticInput** | Input de texto de solo lectura |
| **ThresholdCircleProgress** | Progreso circular con umbral |
| **ThresholdProgressBar** | Barra de progreso con umbral |
| **Toast** | Notificacion toast |
| **Tooltip** | Tooltip hover |
| **UncontrolledSelector** | Select no controlado |
| **UncontrolledTextInput** | Text input no controlado |
| **UploadContainer** | Area de drag & drop para archivos |

### 6.2 Molecules (~20 componentes)

Componentes compuestos formados por atoms.

| Componente | Descripcion |
|---|---|
| **AlertModal** | Modal de alerta/confirmacion |
| **AutocompleteInput** | Input con sugerencias autocomplete |
| **CalendarSelector** | Selector de fecha tipo calendario |
| **DateInput** | Input de fecha |
| **DialogModal** | Modal de dialogo generico |
| **Dropdown** | Menu dropdown |
| **EmptyState** | Placeholder de estado vacio |
| **FileUpload** | Componente completo de upload de archivos |
| **FiltersMenu** | Menu de filtros aplicables |
| **FloatingMenu** | Menu flotante de acciones |
| **IndexedStepper** | Stepper multi-paso con indices |
| **InformationContainer** | Contenedor para secciones informativas |
| **MultiSelectDropdown** | Dropdown con seleccion multiple |
| **PillsContainer** | Contenedor para lista de pills |
| **SearchModal** | Modal con funcionalidad de busqueda |
| **SideModal** | Modal lateral (drawer) |
| **Stepper** | Stepper de proceso multi-paso |
| **Tabs** | Componente de navegacion por tabs |
| **Tooltip** | Tooltip (variante molecule) |
| **UncontrolledDateInput** | Date input no controlado |

### 6.3 Organisms

Actualmente en estado placeholder sin componentes activos.

---

## 7. Hooks

| Hook | Descripcion |
|---|---|
| `useTheme()` | Accede al tema actual desde el contexto |
| `useFilterToggler()` | Logica para togglear filtros activos |

---

## 8. Utilidades

| Modulo | Descripcion |
|---|---|
| `cycles.ts` | Utilidades para ciclos legales |
| `dates.ts` | Manipulacion de fechas |
| `files.ts` | Operaciones con archivos |
| `images.ts` | Procesamiento de imagenes |
| `modal.tsx` | Helpers para modales |
| `renderContentOptions.tsx` | Renderizado de opciones de contenido |
| `stepper.ts` | Logica de stepper |
| `strings.ts` | Manipulacion de strings |
| `toast.tsx` | Helpers para toasts |

---

## 9. Build y Distribucion

### Formatos de salida

| Formato | Archivo | Uso |
|---|---|---|
| **ES Module** | `dist/index.js` | Import moderno (tree-shakeable) |
| **UMD** | `dist/lawgic-dev-kit.umd.js` | Inclusion directa en browser |
| **CSS** | `dist/lawgic-dev-kit.css` | Estilos compilados |
| **Types** | `dist/index.d.ts` | Declaraciones TypeScript |

### Export paths (package.json)

```json
{
  ".":          "dist/index.js",
  "./atoms":    "dist/components/atoms/index.js",
  "./molecules":"dist/components/molecules/index.js",
  "./organisms":"dist/components/organisms/index.js",
  "./utils":    "dist/utils/index.js",
  "./types":    "dist/types/index.js",
  "./providers":"dist/providers/index.js",
  "./hooks":    "dist/hooks/index.js",
  "./contexts": "dist/contexts/index.js",
  "./themes":   "dist/themes/index.js",
  "./css":      "dist/lawgic-dev-kit.css",
  "./tailwind/preset": "tailwind.config.ts"
}
```

### Scripts NPM

| Comando | Descripcion |
|---|---|
| `npm run dev` | Servidor de desarrollo Vite |
| `npm run build` | Build de Storybook |
| `npm run build:lib` | Build de libreria (Vite + types) |
| `npm run build:types` | Solo declaraciones TypeScript |
| `npm run lab` | Storybook en puerto 6006 |
| `npm run lint` | Ejecutar ESLint |

---

## 10. Estrategia de Estilos

Los componentes usan **Tailwind CSS utility classes** directamente, sin archivos CSS separados por componente.

- **Composicion de clases:** `clsx` para merge condicional
- **Clases dinamicas:** Funciones resolver (ej. `resolveButtonClasses()`) que generan clases basadas en props (`color`, `variant`, `size`)
- **Sin CSS Modules ni Styled Components**
- **Tailwind preset exportable:** Los proyectos consumidores pueden importar `lawgic-dev-kit/tailwind/preset` para reutilizar los tokens
