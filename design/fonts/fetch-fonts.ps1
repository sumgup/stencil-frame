# Vendor design-system webfonts
# Run this locally: powershell -ExecutionPolicy Bypass -File design/fonts/fetch-fonts.ps1

$FontsDir = "design/fonts"
$GFRawURL = "https://raw.githubusercontent.com/google/fonts/main"

Write-Host "Vendoring design-system webfonts..." -ForegroundColor Green

# 1. DM MONO
Write-Host "`nFetching DM Mono..." -ForegroundColor Cyan
$dmMonoFiles = @(
    "DMMono-Light.ttf",
    "DMMono-Regular.ttf",
    "DMMono-Medium.ttf",
    "DMMono-Italic.ttf",
    "DMMono-LightItalic.ttf",
    "DMMono-MediumItalic.ttf"
)

foreach ($file in $dmMonoFiles) {
    $url = "$GFRawURL/ofl/dmmono/$file"
    $output = "$FontsDir/dm-mono/$file"
    try {
        Invoke-WebRequest -Uri $url -OutFile $output
        Write-Host "  [OK] $file" -ForegroundColor Green
    }
    catch {
        Write-Host "  [FAIL] $file" -ForegroundColor Red
    }
}

try {
    Invoke-WebRequest -Uri "$GFRawURL/ofl/dmmono/OFL.txt" -OutFile "$FontsDir/dm-mono/OFL.txt"
    Write-Host "  [OK] OFL.txt" -ForegroundColor Green
}
catch {
    Write-Host "  [FAIL] OFL.txt" -ForegroundColor Red
}

# 2. FRAUNCES
Write-Host "`nFetching Fraunces..." -ForegroundColor Cyan
$frauncesFiles = @(
    "Fraunces%5BOPSZ%2CSOFT%2Cwght%5D.ttf",
    "Fraunces-Italic%5BOPSZ%2CSOFT%2Cwght%5D.ttf"
)

foreach ($encoded in $frauncesFiles) {
    $url = "$GFRawURL/ofl/fraunces/$encoded"
    $decoded = $encoded -replace "%5B", "[" -replace "%5D", "]" -replace "%2C", ","
    $output = "$FontsDir/fraunces/$decoded"
    try {
        Invoke-WebRequest -Uri $url -OutFile $output
        Write-Host "  [OK] $decoded" -ForegroundColor Green
    }
    catch {
        Write-Host "  [FAIL] $decoded" -ForegroundColor Red
    }
}

try {
    Invoke-WebRequest -Uri "$GFRawURL/ofl/fraunces/OFL.txt" -OutFile "$FontsDir/fraunces/OFL.txt"
    Write-Host "  [OK] OFL.txt" -ForegroundColor Green
}
catch {
    Write-Host "  [FAIL] OFL.txt" -ForegroundColor Red
}

# 3. ANTON
Write-Host "`nFetching Anton..." -ForegroundColor Cyan
try {
    Invoke-WebRequest -Uri "$GFRawURL/ofl/anton/Anton-Regular.ttf" -OutFile "$FontsDir/anton/Anton-Regular.ttf"
    Write-Host "  [OK] Anton-Regular.ttf" -ForegroundColor Green
}
catch {
    Write-Host "  [FAIL] Anton-Regular.ttf" -ForegroundColor Red
}

try {
    Invoke-WebRequest -Uri "$GFRawURL/ofl/anton/OFL.txt" -OutFile "$FontsDir/anton/OFL.txt"
    Write-Host "  [OK] OFL.txt" -ForegroundColor Green
}
catch {
    Write-Host "  [FAIL] OFL.txt" -ForegroundColor Red
}

# 4. CAVEAT (placeholder)
Write-Host "`nFetching Caveat (placeholder)..." -ForegroundColor Cyan
try {
    Invoke-WebRequest -Uri "$GFRawURL/ofl/caveat/Caveat-VariableFont_wght.ttf" -OutFile "$FontsDir/caveat/Caveat[wght].ttf"
    Write-Host "  [OK] Caveat[wght].ttf" -ForegroundColor Green
}
catch {
    Write-Host "  [FAIL] Caveat[wght].ttf" -ForegroundColor Red
}

try {
    Invoke-WebRequest -Uri "$GFRawURL/ofl/caveat/OFL.txt" -OutFile "$FontsDir/caveat/OFL.txt"
    Write-Host "  [OK] OFL.txt" -ForegroundColor Green
}
catch {
    Write-Host "  [FAIL] OFL.txt" -ForegroundColor Red
}

Write-Host "`nFont fetch complete." -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  git add design/fonts"
Write-Host "  git commit --amend --no-edit"
Write-Host "  git push"
