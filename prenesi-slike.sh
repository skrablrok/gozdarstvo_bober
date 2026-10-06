#!/usr/bin/env sh
# Prenese slike s trenutne strani v mapo img/, da nova stran ne bo odvisna od stare.
# Zaženi enkrat iz mape, kjer je index.html:  sh prenesi-slike.sh
set -e
B="https://www.gozdarstvo-bober.si"
mkdir -p img
curl -fsSL "$B/templates/g5_hydrogen/custom/images/bober_logo.jpg"                -o img/bober-logo.jpg
curl -fsSL "$B/media/k2/items/cache/01f1a05053c6242fcfa23075e5b963c1_L.jpg"        -o img/obzagovanje.jpg
curl -fsSL "$B/media/k2/items/cache/fa55c8bad0e242eb7986dc1135b50adb_L.jpg"        -o img/sanacija.jpg
curl -fsSL "$B/media/k2/items/cache/fc34f61d23b74be53ee07d469bd32064_L.jpg"        -o img/avtodvigalo.jpg
curl -fsSL "$B/media/k2/items/cache/1c0ae2205709722b62e843abc0471a55_L.jpg"        -o img/kamion.jpg
echo "Slike so v mapi img/"
