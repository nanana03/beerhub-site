# Design — Beer Hub 公開サイト

このサイト（index / privacy / terms）で共有する設計。ページを直すときは先にここを読む。
生成部分（地図・県の一覧・塗りの図・目次・フォントの link）は
`Product\_site_redesign_2026-10\beerhub\build.py` が作る（手で書き換えない）。

## 方向
「地ビールの旅日記」（ストアのサブタイトル）を紙の地図として見せる。
主役はアプリが同梱している**実データ**＝県境（`BeerHub/assets/prefpoly.json`）と
醸造所の位置（`BeerHub/assets/breweries.json`）。点ひとつが醸造所ひとつ。
偽のスマホ枠・ストアバッジ・作った画面は使わない（まだ未提出＝ストアへの導線は置かない）。

## Genre / 構成
- Genre: editorial（custom テーマ）
- トップ: Map / Diagram — 地図がヒーロー → 県別の掲載数（地方ごと・地図と連動）→ 道のり（できること 3 つを点線の旅程でつなぐ）→ 決めごと（台帳）→ お酒の注意（二重罫）→ 奥付
- 書類: Long Document — 本文は 44rem の一段。1024px 以上で左に目次（h2 から生成・読んでいる節に琥珀の線）
- Nav: N9（ワードマーク左・書類 2 つ右）／ Footer: Ft1（大きなワードマーク＋窓口）

## 色（アプリ `src/theme.js` の taproom / cellar を OKLCH に換算）
| token | 昼 (Taproom) | 夜 (Cellar) |
|---|---|---|
| `--c-paper` | oklch(97.4% 0.017 88) #FBF6EA | oklch(18.9% 0.013 77.8) #17130D |
| `--c-ink` | oklch(31.4% 0.033 75.7) #3B2F1E | oklch(93.3% 0.023 84.6) #F0E8D8 |
| `--c-ink-2` | oklch(50.5% 0.053 84) | oklch(70% 0.048 85.8) |
| `--c-accent`（文字の琥珀） | oklch(54.5% 0.124 58.6) #A45B10 | oklch(73.9% 0.134 70) #E09A3E |
| `--c-amber`（塗り専用） | oklch(65% 0.135 64.4) #C77B21 | #E09A3E |
| `--c-hop`（制覇） | oklch(50% 0.098 130.4) | oklch(74.8% 0.141 130.2) #8FBF5A |
| `--c-fill-mid` / `--c-fill-all` | prefFill と同じ rgba | 同左 |

- 夜は `prefers-color-scheme: dark` で自動（アプリと同じ）。
- 琥珀を文字に使うときは `--c-accent`（昼の `--c-amber` は文字には薄い＝アプリと同じ規則）。

## 字
- ワードマーク: Kaushan Script（アプリの起動画面と同じ）。Google Fonts `text=BeerHub` だけ。
- 見出し: Shippori Mincho B1 700。Google Fonts の `text=` で**見出しに出る字だけ**（約 260 字）を落とす。
  見出しを足したら `build.py` を回せば字が足される。
- 本文: 端末の角ゴシック（Hiragino Sans / Yu Gothic UI …）＝0 バイト。
- 見出しは `word-break: auto-phrase`（文節で折る）。斜体の見出しは使わない。

## 余白・動き
- 4pt 系の `--space-*`。左右の余白は `--gutter: clamp(1rem, 4.5vw, 4rem)` で全セクション共通。
- 動きは 1 つだけ：地図の点が県の順にふわっと現れる（opacity のみ・700ms）。
  `prefers-reduced-motion: reduce` では動かない。
- フォーカス: 2px の琥珀の outline（アニメーションしない）。

## ページが共有するもの
ワードマーク／マスト／色と字／罫線（1px `--c-rule`、区切りの強調は 2px の墨）。

## 法務ページの約束
`<main>` の中の文字は一字一句変えない。足してよいのは `<main>` の外（マスト・目次）と、
属性（h2 の id・表の data-label）だけ。照合＝`check.py` の「法務本文の一致」。
