# ============================================================
# GÉNÉRATEUR D'ARBORESCENCE AVEC EXCLUSIONS
# ============================================================

param(
    [string]$OutputFile = "STRUCTURE.md",
    [string[]]$Exclude = @("node_modules", ".vscode", ".git", "dist", "build", ".next")
)

# Supprimer le fichier s'il existe
if (Test-Path $OutputFile) {
    Remove-Item $OutputFile -Force -ErrorAction SilentlyContinue
    Start-Sleep -Milliseconds 500
}

$projectName = (Get-Item .).Name
$output = [System.Collections.ArrayList]@()

# En-tête
[void]$output.Add("# Structure du projet : $projectName")
[void]$output.Add("")
[void]$output.Add("Généré le : $(Get-Date -Format 'dd/MM/yyyy HH:mm')")
[void]$output.Add("")
[void]$output.Add('```')

# Fonction récursive pour parcourir les dossiers
function Get-DirectoryTree {
    param(
        [string]$Path,
        [string]$Prefix = "",
        [bool]$IsLast = $false
    )

    # Récupérer les éléments en excluant les dossiers indésirables
    $items = Get-ChildItem -Path $Path -Force -ErrorAction SilentlyContinue |
        Where-Object {
            $shouldExclude = $false
            foreach ($excludePattern in $Exclude) {
                if ($_.Name -eq $excludePattern) {
                    $shouldExclude = $true
                    break
                }
            }
            -not $shouldExclude
        } |
        Sort-Object @{Expression={$_.PSIsContainer}; Descending=$true}, Name

    $itemCount = $items.Count

    for ($i = 0; $i -lt $itemCount; $i++) {
        $item = $items[$i]
        $isLastItem = ($i -eq $itemCount - 1)

        # Symboles pour l'arborescence
        if ($isLastItem) {
            $connector = [char]0x2514 + [char]0x2500 + [char]0x2500 + " "  # └──
            $extension = "    "
        } else {
            $connector = [char]0x251C + [char]0x2500 + [char]0x2500 + " "  # ├──
            $extension = [char]0x2502 + "   "  # │
        }

        # Ajouter l'élément
        if ($item.PSIsContainer) {
            [void]$output.Add("$Prefix$connector$($item.Name)/")

            # Récursion pour les sous-dossiers
            Get-DirectoryTree -Path $item.FullName -Prefix "$Prefix$extension" -IsLast $isLastItem
        } else {
            [void]$output.Add("$Prefix$connector$($item.Name)")
        }
    }
}

# Démarrer l'arborescence
[void]$output.Add("$projectName/")
Get-DirectoryTree -Path "."

[void]$output.Add('```')
[void]$output.Add("")
[void]$output.Add("---")
[void]$output.Add("Dossiers exclus : $($Exclude -join ', ')")

# Sauvegarder dans le fichier avec gestion d'erreur
try {
    $output | Out-File -FilePath $OutputFile -Encoding UTF8 -Force

    # Vérifier que le fichier a bien du contenu
    $fileInfo = Get-Item $OutputFile
    if ($fileInfo.Length -eq 0) {
        throw "Le fichier a été créé mais est vide"
    }

    # Confirmation
    Write-Host ""
    Write-Host "=======================================" -ForegroundColor Green
    Write-Host "    Structure generee avec succes !    " -ForegroundColor Green
    Write-Host "=======================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Fichier : $OutputFile" -ForegroundColor Cyan
    Write-Host "Taille : $($fileInfo.Length) octets" -ForegroundColor Cyan
    Write-Host "Lignes : $($output.Count)" -ForegroundColor Cyan
    Write-Host "Dossiers exclus : $($Exclude -join ', ')" -ForegroundColor Yellow
    Write-Host ""

    # Ouvrir le fichier dans VS Code (optionnel)
    $openInVSCode = Read-Host "Ouvrir dans VS Code ? (o/n)"
    if ($openInVSCode -eq "o" -or $openInVSCode -eq "O") {
        code $OutputFile
    }

} catch {
    Write-Host ""
    Write-Host "=======================================" -ForegroundColor Red
    Write-Host "         ERREUR !                      " -ForegroundColor Red
    Write-Host "=======================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Erreur : $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "Le contenu sera affiché ci-dessous :" -ForegroundColor Yellow
    Write-Host ""
    $output | ForEach-Object { Write-Host $_ }
}
