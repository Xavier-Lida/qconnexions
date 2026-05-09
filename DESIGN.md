---
version: alpha
name: Connexions Québec
description: "Identité visuelle pour un jeu quotidien type Connections, ancré au Québec. Fond neige (#FCF7F8) et texte bleu nuit (#091540) évoquent le drapeau sans le pasticher. Bleu fleurdelisé (#2191FB) pour liens, focus et états en jeu. Or tournesol (#F7B32B) pour les actions principales, avec texte marine sur le bouton. Bleu de Prusse (#001D4A) pour surfaces sombres. Pastels pour états secondaires. Filets légers, peu d’ombre. Inter en display/corps ; JetBrains Mono pour le code."

colors:
  primary: "#F7B32B"
  primary-active: "#E0A028"
  accent: "#2191FB"
  ink: "#091540"
  prussian: "#001D4A"
  body: "#3D4F72"
  body-strong: "#091540"
  muted: "#5C6B8A"
  muted-soft: "#8A96AD"
  hairline: "#E4E8F0"
  hairline-soft: "#EEF1F7"
  hairline-strong: "#C9D0E0"
  canvas: "#FCF7F8"
  canvas-soft: "#F4F2F5"
  surface-card: "#FFFFFF"
  surface-strong: "#E4EAF5"
  on-primary: "#091540"
  timeline-thinking: "#F0E4C8"
  timeline-grep: "#D4EAD8"
  timeline-read: "#CFE8FC"
  timeline-edit: "#D4D8F0"
  timeline-done: "#E8C47A"
  semantic-error: "#C41E3A"
  semantic-success: "#1A7F5C"

typography:
  display-mega:
    fontFamily: "'Inter', system-ui, 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: 72px
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: -2.16px
  display-lg:
    fontFamily: "'Inter', system-ui, sans-serif"
    fontSize: 36px
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: -0.72px
  display-md:
    fontFamily: "'Inter', system-ui, sans-serif"
    fontSize: 26px
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: -0.325px
  display-sm:
    fontFamily: "'Inter', system-ui, sans-serif"
    fontSize: 22px
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: -0.11px
  title-md:
    fontFamily: "'Inter', system-ui, sans-serif"
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0
  title-sm:
    fontFamily: "'Inter', system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0
  body-md:
    fontFamily: "'Inter', system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  body-tracked:
    fontFamily: "'Inter', system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0.08px
  body-sm:
    fontFamily: "'Inter', system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  caption:
    fontFamily: "'Inter', system-ui, sans-serif"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0
  caption-uppercase:
    fontFamily: "'Inter', system-ui, sans-serif"
    fontSize: 11px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0.88px
    textTransform: uppercase
  code:
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  button:
    fontFamily: "'Inter', system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.0
    letterSpacing: 0
  nav-link:
    fontFamily: "'Inter', system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0

rounded:
  none: 0px
  xs: 4px
  sm: 6px
  md: 8px
  lg: 12px
  xl: 16px
  pill: 9999px
  full: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  base: 16px
  md: 20px
  lg: 24px
  xl: 32px
  xxl: 48px
  section: 80px

components:
  top-nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.nav-link}"
    height: 64px
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 10px 18px
    height: 40px
  button-primary-active:
    backgroundColor: "{colors.primary-active}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
  button-secondary:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 9px 17px
    height: 40px
  button-tertiary-text:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.button}"
  button-download:
    backgroundColor: "{colors.prussian}"
    textColor: "{colors.canvas}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 12px 20px
    height: 44px
  hero-band:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.display-mega}"
    padding: 80px
  ide-mockup-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: 0
  ide-pane:
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.body}"
    typography: "{typography.code}"
    rounded: "{rounded.md}"
    padding: 16px
  feature-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.title-md}"
    rounded: "{rounded.lg}"
    padding: 24px
  comparison-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 24px
  timeline-pill-thinking:
    backgroundColor: "{colors.timeline-thinking}"
    textColor: "{colors.ink}"
    typography: "{typography.caption-uppercase}"
    rounded: "{rounded.pill}"
    padding: 4px 10px
  timeline-pill-grep:
    backgroundColor: "{colors.timeline-grep}"
    textColor: "{colors.ink}"
    typography: "{typography.caption-uppercase}"
    rounded: "{rounded.pill}"
    padding: 4px 10px
  timeline-pill-read:
    backgroundColor: "{colors.timeline-read}"
    textColor: "{colors.ink}"
    typography: "{typography.caption-uppercase}"
    rounded: "{rounded.pill}"
    padding: 4px 10px
  timeline-pill-edit:
    backgroundColor: "{colors.timeline-edit}"
    textColor: "{colors.ink}"
    typography: "{typography.caption-uppercase}"
    rounded: "{rounded.pill}"
    padding: 4px 10px
  timeline-pill-done:
    backgroundColor: "{colors.timeline-done}"
    textColor: "{colors.ink}"
    typography: "{typography.caption-uppercase}"
    rounded: "{rounded.pill}"
    padding: 4px 10px
  code-block:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.code}"
    rounded: "{rounded.lg}"
    padding: 20px
  pricing-tier-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 32px
  pricing-tier-featured:
    backgroundColor: "{colors.prussian}"
    textColor: "{colors.canvas}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 32px
  text-input:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 12px 16px
    height: 44px
  badge-pill:
    backgroundColor: "{colors.surface-strong}"
    textColor: "{colors.ink}"
    typography: "{typography.caption-uppercase}"
    rounded: "{rounded.pill}"
    padding: 4px 10px
  cta-band:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.display-lg}"
    padding: 96px
  testimonial-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.body}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 24px
  footer:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.body}"
    typography: "{typography.body-sm}"
    padding: 64px 48px
  footer-link:
    backgroundColor: transparent
    textColor: "{colors.body}"
    typography: "{typography.body-sm}"
---

## Overview

Connexions Québec vise une interface **claire et quotidienne** : fond **neige** (`{colors.canvas}` — #FCF7F8) et texte **bleu nuit** (`{colors.ink}` — #091540), rappel du contraste drapeau sans pastiche. L’accent **bleu fleurdelisé** (`{colors.accent}` — #2191FB) sert aux liens, focus et détails « vivants » ; l’**or tournesol** (`{colors.primary}` — #F7B32B) est réservé aux actions principales (soumission, connexion), avec texte marine sur le bouton.

La typo **Inter** porte titres et corps (poids 400 sur les grands titres pour un ton éditorial calme). JetBrains Mono reste optionnel pour tout bloc de code.

Les **pastels de la ligne timeline** (or pâle, menthe, bleu ciel, lavande, or miel) servent d’états secondaires (indices, progression, badges) — pas comme couleur d’action principale.

**Caractéristiques clés :**
- Toile neige, cartes blanches légèrement contrastées.
- Encre marine pour le texte fort ; gris-bleu pour le corps.
- Une seule couleur d’action chaude : `{colors.primary}` (or). À utiliser avec parcimonie.
- Bleu `{colors.accent}` pour l’interactif, pas pour noyer toute l’UI.
- Rayons 8px sur les CTA ; filets fins plutôt que grosses ombres.
- Rythme de section 80px conservé du gabarit d’origine.

## Colors

Palette de référence (drapeau / fleurdelisé) : **bleu nuit** `#091540`, **bleu de Prusse** `#001D4A`, **bleu vif** `#2191FB`, **neige** `#FCF7F8`, **or** `#F7B32B`. Les tokens ci-dessous dérivent de ces repères pour l’accessibilité (contraste texte/fond).

### Marque et accents
- **Or tournesol** (`{colors.primary}` — #F7B32B) : boutons primaires (Soumettre, Connexion). Texte sur le bouton : `{colors.on-primary}` (marine #091540).
- **Or actif** (`{colors.primary-active}` — #E0A028) : état pressé / survol fort.
- **Bleu fleurdelisé** (`{colors.accent}` — #2191FB) : liens, focus rings, puces d’état « en jeu ».

### Surfaces
- **Canvas** (`{colors.canvas}` — #FCF7F8) : fond de page (neige).
- **Canvas soft** (`{colors.canvas-soft}` — #F4F2F5) : panneaux secondaires, zones de grille atténuées.
- **Surface carte** (`{colors.surface-card}` — #ffffff) : tuiles de mots, cartes.
- **Surface forte** (`{colors.surface-strong}` — #E4EAF5) : badges, pastilles.
- **Bleu de Prusse** (`{colors.prussian}` — #001D4A) : bandeaux sombres, bouton « plein » secondaire (`button-download`), carte tarifaire mise en avant.

### Filets
- **Hairline** (`{colors.hairline}` — #E4E8F0) : bordure 1px.
- **Hairline soft** (`{colors.hairline-soft}` — #EEF1F7) : séparateurs légers.
- **Hairline strong** (`{colors.hairline-strong}` — #C9D0E0) : contour de panneau plus marqué.

### Texte
- **Encre** (`{colors.ink}` — #091540) : titres, emphase.
- **Corps** (`{colors.body}` — #3D4F72) : texte courant sur fond clair.
- **Corps fort** (`{colors.body-strong}` — #091540) : aligné sur l’encre.
- **Muted** / **Muted soft** : sous-titres et texte désactivé.
- **Sur primaire** (`{colors.on-primary}` — #091540) : libellé sur bouton or.

### Pastels (états secondaires / timeline)
- **Thinking** (`{colors.timeline-thinking}` — #F0E4C8)
- **Grep** (`{colors.timeline-grep}` — #D4EAD8)
- **Read** (`{colors.timeline-read}` — #CFE8FC)
- **Edit** (`{colors.timeline-edit}` — #D4D8F0)
- **Done** (`{colors.timeline-done}` — #E8C47A) — texte de pilule en `{colors.ink}`.

### Sémantique
- **Succès** (`{colors.semantic-success}` — #1A7F5C)
- **Erreur** (`{colors.semantic-error}` — #C41E3A)

## Typographie

### Famille
**Inter** est la famille display + corps (open source). Repli : `system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif`. Le code peut utiliser **JetBrains Mono**.

### Hiérarchie

| Token | Taille | Graisse | Interligne | Tracking | Usage |
|---|---|---|---|---|---|
| `{typography.display-mega}` | 72px | 400 | 1.1 | -2.16px | Titre d’accueil |
| `{typography.display-lg}` | 36px | 400 | 1.2 | -0.72px | Titres de section |
| `{typography.display-md}` | 26px | 400 | 1.25 | -0.325px | Sous-sections |
| `{typography.display-sm}` | 22px | 400 | 1.3 | -0.11px | Titres de groupe de cartes |
| `{typography.title-md}` | 18px | 600 | 1.4 | 0 | Titres de composant |
| `{typography.title-sm}` | 16px | 600 | 1.4 | 0 | Libellés de liste |
| `{typography.body-md}` | 16px | 400 | 1.5 | 0 | Corps par défaut |
| `{typography.body-tracked}` | 16px | 400 | 1.5 | 0.08px | Corps avec tracking |
| `{typography.body-sm}` | 14px | 400 | 1.5 | 0 | Pied de page |
| `{typography.caption}` | 13px | 400 | 1.4 | 0 | Légendes |
| `{typography.caption-uppercase}` | 11px | 600 | 1.4 | 0.88px | Pastilles, labels section |
| `{typography.code}` | 13px | 400 | 1.5 | 0 | Code — JetBrains Mono |
| `{typography.button}` | 14px | 500 | 1.0 | 0 | Libellés CTA |
| `{typography.nav-link}` | 14px | 500 | 1.4 | 0 | Liens de navigation |

### Principes
- **Grands titres en 400** quand possible — voix calme, pas « tech bold ».
- **Interlignage et letter-spacing** négatifs surtout sur les display (voir tokens).
- **JetBrains Mono** réservé au code.

### Variante plus éditoriale
Pour un ton plus « magazine », **Source Serif 4** ou **Fraunces** en titres se marient bien avec Inter en corps — hors scope du fichier YAML actuel.

## Mise en page

### Espacements
- **Unité de base :** 4px.
- **Tokens :** `{spacing.xxs}` 4px · `{spacing.xs}` 8px · `{spacing.sm}` 12px · `{spacing.base}` 16px · `{spacing.md}` 20px · `{spacing.lg}` 24px · `{spacing.xl}` 32px · `{spacing.xxl}` 48px · `{spacing.section}` 80px.
- **Padding de section :** 80px.

### Grille et conteneur
- Largeur max ~1200px.
- Grille 12 colonnes possible pour le marketing ; le jeu centre surtout une grille 4×4.
- Cartes avantages : 2 ou 3 colonnes au bureau.
- Pied de page : jusqu’à 5 colonnes au bureau.

### Rythme blanc
Espacement généreux type éditorial : le fond neige respire ; les tuiles et cartes se resserrent en 16–24px entre elles.

## Relief et profondeur

Le système repose sur des **filets fins** plutôt que des ombres : le contraste blanc sur neige suffit pour séparer les cartes.

| Niveau | Traitement | Usage |
|---|---|---|
| Plat (canvas) | `{colors.canvas}` (#FCF7F8) | Bandeaux de page, pied de page |
| Carte | `{colors.surface-card}` (#ffffff) | Tuiles, cartes contenu |
| Filet | 1px `{colors.hairline}` | Contours, séparateurs |
| Panneau atténué | `{colors.canvas-soft}` (#F4F2F5) | Zones de grille, panneaux imbriqués |

### Profondeur décorative
- Les **cartes blanches** sur fond neige créent le relief principal.
- Les **pilules pastel** ajoutent de la couleur sans ombre portée.

## Formes

### Rayons de bordure

| Token | Valeur | Usage |
|---|---|---|
| `{rounded.none}` | 0px | Réservé |
| `{rounded.xs}` | 4px | Petites étiquettes |
| `{rounded.sm}` | 6px | Rangées compactes |
| `{rounded.md}` | 8px | CTA, champs de formulaire |
| `{rounded.lg}` | 12px | Cartes, grilles |
| `{rounded.xl}` | 16px | Grandes cartes (rare) |
| `{rounded.pill}` | 9999px | Pilules timeline, badges |
| `{rounded.full}` | 9999px | Avatars (rare) |

## Composants

### Navigation haute

**`top-nav`** — Fond `{colors.canvas}`, texte `{colors.ink}`, hauteur 64px. Exemple de contenu : titre « Connexions Québec » à gauche, lien calendrier / connexion à droite.

### Boutons

**`button-primary`** — CTA or. Fond `{colors.primary}`, texte `{colors.on-primary}`, typo `{typography.button}`, padding 10px × 18px, hauteur 40px, `rounded` `{rounded.md}`.

**`button-primary-active`** — Fond `{colors.primary-active}`.

**`button-secondary`** — Pilule blanche sur neige. Fond `{colors.surface-card}`, texte `{colors.ink}`, bordure 1px `{colors.hairline-strong}`.

**`button-tertiary-text`** — Lien texte marine ; survol possible en `{colors.accent}`.

**`button-download`** — CTA large sombre. Fond `{colors.prussian}`, texte `{colors.canvas}` (ex. « Créer un compte »).

### Hero et maquettes

**`hero-band`** — Fond `{colors.canvas}`, titre `{typography.display-mega}`, sous-texte `{typography.body-md}`, CTAs selon le flux (ex. jouer / se connecter).

**`ide-mockup-card`** — Gabarit réutilisable : grande **carte blanche** pour la grille 4×4 ou un aperçu admin. Fond `{colors.surface-card}`, `rounded` `{rounded.lg}`, bordure `{colors.hairline}`.

**`ide-pane`** — Sous-panneau à l’intérieur d’une carte. Fond `{colors.canvas-soft}`, texte `{colors.body}` ; en code seulement, `{typography.code}` (JetBrains Mono).

### Cartes

**`feature-card`** — Fond `{colors.surface-card}`, texte `{colors.ink}`, typo `{typography.title-md}`, `rounded` `{rounded.lg}`, padding 24px, bordure 1px `{colors.hairline}`.

**`comparison-card`** — Carte deux colonnes (ex. avant / après, ou aide côte à côte).

**`testimonial-card`** — Carte citation. Fond `{colors.surface-card}`, texte `{colors.body}`, `rounded` `{rounded.lg}`, padding 24px.

### Pilules d’état (timeline / jeu)

**`timeline-pill-thinking`** — Fond `{colors.timeline-thinking}`, texte `{colors.ink}`, `{typography.caption-uppercase}`, `{rounded.pill}`.

**`timeline-pill-grep`** — Fond `{colors.timeline-grep}`, même forme.

**`timeline-pill-read`** — Fond `{colors.timeline-read}`.

**`timeline-pill-edit`** — Fond `{colors.timeline-edit}`.

**`timeline-pill-done`** — Fond `{colors.timeline-done}`, texte `{colors.ink}`.

### Code

**`code-block`** — Inline code block. Background `{colors.surface-card}`, text `{colors.ink}` in `{typography.code}`, rounded `{rounded.lg}`, padding 20px, 1px `{colors.hairline}` border.

### Pricing

**`pricing-tier-card`** — Background `{colors.surface-card}`, rounded `{rounded.lg}`, padding 32px, 1px `{colors.hairline}` border.

**`pricing-tier-featured`** — Mise en avant sombre. Fond `{colors.prussian}`, texte `{colors.canvas}`.

### Forms & Tags

**`text-input`** — Background `{colors.surface-card}`, text `{colors.ink}`, rounded `{rounded.md}` (8px), padding 12px × 16px, height 44px.

**`badge-pill`** — Small uppercase pill. Background `{colors.surface-strong}`, text `{colors.ink}`, type `{typography.caption-uppercase}`, rounded `{rounded.pill}`, padding 4px × 10px.

### CTA / Footer

**`cta-band`** — Bandeau d’appel avant pied de page. Fond `{colors.canvas}`, titre `{typography.display-lg}`, CTA or `{colors.primary}`. Padding vertical 96px.

**`footer`** — Closing footer. Background `{colors.canvas}`, text `{colors.body}`. 5-column link list. 64×48px padding.

**`footer-link`** — Background transparent, text `{colors.body}`, type `{typography.body-sm}`.

## Do's and Don'ts

### À faire
- Réserver `{colors.primary}` (or) aux **actions principales** (soumettre, s’inscrire).
- Utiliser `{colors.accent}` pour liens et focus — pas pour remplacer tout le texte.
- Garder le fond **neige** `{colors.canvas}` comme plancher ; les tuiles en `{colors.surface-card}` apportent le contraste.
- Blocs de code en JetBrains Mono si présents.
- Pastels timeline : indices, badges, file d’étapes — pas comme couleur de bouton principal.

### À éviter
- Ne pas multiplier les couleurs d’action chaude : l’or reste la signature CTA.
- Ne pas assombrir toute l’interface en `{colors.accent}` : le jeu reste lisible sur fond clair.
- Pas d’ombres portées lourdes : filets + contraste suffisent.
- Ne pas confondre les **quatre couleurs de groupes** du jeu NYT (jaune / vert / bleu / violet) avec cette charte marque — ce sont des tokens UI **séparés** à définir dans le composant puzzle si besoin.

## Comportement responsive

### Points de rupture

| Nom | Largeur | Changements |
|---|---|---|
| Mobile | < 640px | Hero h1 72→32px ; grille 4×4 scrollable ou compacte ; nav repliable. |
| Tablette | 640–1024px | Hero h1 ~56px ; grille 2×8 ou 4×4 selon maquette. |
| Bureau | 1024–1280px | Grille 4×4 complète ; hero plein format. |
| Large | > 1280px | Contenu capé ~1200px. |

### Zones tactiles
- CTA principal 40px de haut minimum (AA) ; viser 44px pour le confort (AAA).
- CTA large (`button-download`) 44px.

### Repli
- Navigation : menu compact sous 768px.
- Sur mobile, la grille de jeu peut passer en défilement vertical ou colonnes plus étroites.
- Feature grid: 3-up → 2-up → 1-up.

## Guide d’itération

1. Travailler un composant à la fois.
2. CTA par défaut `{rounded.md}` (8px) ; cartes `{rounded.lg}` (12px).
3. Variantes = entrées distinctes sous `components:`.
4. Références `{token.refs}` partout, pas d’hex en dur dans les composants.
5. États de survol : hors scope de ce document.
6. Inter 400 pour les grands titres, 400/500/600 pour le corps ; JetBrains Mono pour le code.
7. L’or `{colors.primary}` reste rare (1 action principale par écran quand c’est possible).
8. Pastels timeline : états secondaires uniquement.

## Lacunes connues

- Couleurs exactes des **quatre difficultés de groupes** (type NYT) à définir dans l’app — hors de la palette « marque Québec » ci-dessus.
- Animations (soumission, révélation de groupe) non spécifiées ici.
- États de formulaire au-delà du focus : à compléter lors de l’implémentation.
