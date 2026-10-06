# Prenese slike s trenutne strani v mapo img\, da nova stran ne bo odvisna od stare.
# Zaženi enkrat iz mape, kjer je index.html:  powershell -ExecutionPolicy Bypass -File prenesi-slike.ps1
$B = "https://www.gozdarstvo-bober.si"
New-Item -ItemType Directory -Force -Path img | Out-Null
$slike = @{
  "bober-logo.jpg"  = "/templates/g5_hydrogen/custom/images/bober_logo.jpg"
  "obzagovanje.jpg" = "/media/k2/items/cache/01f1a05053c6242fcfa23075e5b963c1_L.jpg"
  "sanacija.jpg"    = "/media/k2/items/cache/fa55c8bad0e242eb7986dc1135b50adb_L.jpg"
  "avtodvigalo.jpg" = "/media/k2/items/cache/fc34f61d23b74be53ee07d469bd32064_L.jpg"
  "kamion.jpg"      = "/media/k2/items/cache/1c0ae2205709722b62e843abc0471a55_L.jpg"
}
foreach ($k in $slike.Keys) { Invoke-WebRequest -Uri ($B + $slike[$k]) -OutFile ("img\" + $k) }
Write-Host "Slike so v mapi img\"
