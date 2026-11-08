# Artwork Naming Map

Use this reference when a gallery task crosses routes, translation keys and public directories.
Verify the actual page, both locale files and the asset tree before deriving a new identifier.
The filesystem and message hierarchy are related but are not interchangeable.

## Domains

| Context                   | Painting             | Ceramic             |
| ------------------------- | -------------------- | ------------------- |
| Route and page directory  | `painting`           | `ceramic`           |
| Page message namespace    | `pages.painting`     | `pages.ceramic`     |
| Picture message namespace | `pictures.paintings` | `pictures.ceramics` |
| Public directory          | `public/paintings`   | `public/ceramics`   |

## Techniques

| Technique             | Route segment      | Page message segment       | Picture message segment                                            | Public directory segment   |
| --------------------- | ------------------ | -------------------------- | ------------------------------------------------------------------ | -------------------------- |
| Acrylique             | `acrylic`          | `acrylic`                  | `acrylic`                                                          | `acrylic`                  |
| Huile                 | `oil`              | Inspect the requested page | Existing standalone work uses `pictures.paintings.abstract_autumn` | Inspect the supplied files |
| Encres                | `inks`             | `inks`                     | `inks`                                                             | `inks`                     |
| Technique mixte       | `mixed-technique`  | `mixed_technique`          | `mixed_technique`                                                  | `mixed_technique`          |
| Grès, four électrique | `electric-kiln`    | `electric_kiln`            | `electric_kiln`                                                    | `electric_kiln`            |
| Porcelaine            | `porcelain`        | `porcelain`                | `porcelain`                                                        | `porcelain`                |
| Raku et enfumage      | `raku-smouldering` | `raku_and_smouldering`     | `raku_smouldering`                                                 | `raku_smouldering`         |

The menu also contains planned techniques such as charcoal, pastel and wheel pottery.
Read their existing labels before adding routes; a menu label does not prove a page or asset directory exists.
For a genuinely new technique, use kebab-case routes and snake_case message/directory names consistently with the surrounding collection.

## Categories And Groups

| Existing route                           | Picture namespace below `pictures.ceramics`                   | Public directory below `public/ceramics`                          |
| ---------------------------------------- | ------------------------------------------------------------- | ----------------------------------------------------------------- |
| `/ceramic/porcelain/nature`              | `porcelain.nature.fp1`                                        | `porcelain/nature/flowers/FP1.webp`                               |
| `/ceramic/electric-kiln/nature`          | `electric_kiln.nature.flowers.f1`                             | `electric_kiln/nature/flowers/F1.webp`                            |
| `/ceramic/electric-kiln/nature`          | `electric_kiln.nature.leaves.feuilles1`                       | `electric_kiln/nature/leaves/Feuilles1.webp`                      |
| `/ceramic/electric-kiln/animals`         | `electric_kiln.animals.cats.cats1`                            | `electric_kiln/animals/cats/Cats1.webp`                           |
| `/ceramic/electric-kiln/vases-and-pots`  | `electric_kiln.vases_and_pots.intuitive_pots.pots_intuitifs1` | `electric_kiln/vases_and_pots/intuitive_pots/PotsIntuitifs1.webp` |
| `/ceramic/electric-kiln/various-objects` | `electric_kiln.various_objects.boite1`                        | `electric_kiln/various_objects/boxes/Boite1.webp`                 |
| `/ceramic/raku-smouldering/nature`       | `raku_smouldering.nature.fr1`                                 | `raku_smouldering/nature/FR1.webp`                                |

Grouping can add a filesystem level without adding a picture-key level, as porcelain flowers and ceramic boxes demonstrate.
Do not create `/ceramic/porcelain/flowers` merely because the image folder ends with `flowers`.

## Artwork Keys

| Filename                  | Existing picture key   | Rule illustrated                                                |
| ------------------------- | ---------------------- | --------------------------------------------------------------- |
| `AutomaticPainting1.webp` | `automatic_painting_1` | Preserve the established expanded key                           |
| `EC1.webp`                | `ec1`                  | Lowercase compact code                                          |
| `TMn1.webp`               | `tmn1`                 | Preserve mixed filename casing on disk                          |
| `FP1.webp`                | `fp1`                  | Lowercase compact code                                          |
| `PotsIntuitifs1.webp`     | `pots_intuitifs1`      | Existing multiword key is not a mechanical lowercase conversion |

Do not derive every image key by lowercasing its filename.
Reuse the existing series convention and verify both locales.
Preserve public filenames exactly, including spaces and case, because deployment paths are case-sensitive.
