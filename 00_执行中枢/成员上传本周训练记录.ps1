param(
    [string]$MemberName = "",
    [string]$RoleName = "",
    [string]$WeekLabel = "",
    [string]$RecordPath = ""
)

$ErrorActionPreference = "Stop"

function Stop-WithMessage {
    param([string]$Message)
    Write-Host ""
    Write-Host "STOP: $Message" -ForegroundColor Red
    exit 1
}

function Run-Git {
    param([string[]]$Args)
    & git @Args
    if ($LASTEXITCODE -ne 0) {
        Stop-WithMessage "Git command failed: git $($Args -join ' ')"
    }
}

function Find-TrainingRecordPath {
    $trainingRoot = Get-ChildItem -LiteralPath "." -Directory |
        Where-Object { $_.Name -like "02_*" } |
        Select-Object -First 1

    if ($null -eq $trainingRoot) {
        Stop-WithMessage "Cannot find training data folder: 02_*"
    }

    $rawRecordFolder = Get-ChildItem -LiteralPath $trainingRoot.FullName -Directory |
        Where-Object { $_.Name -like "01_*" } |
        Select-Object -First 1

    if ($null -eq $rawRecordFolder) {
        Stop-WithMessage "Cannot find raw record folder under $($trainingRoot.Name): 01_*"
    }

    return (Join-Path $trainingRoot.Name $rawRecordFolder.Name)
}

try {
    & git --version | Out-Null
    if ($LASTEXITCODE -ne 0) {
        Stop-WithMessage "Git is not installed on this computer."
    }
} catch {
    Stop-WithMessage "Git is not installed on this computer."
}

$repoRoot = (& git rev-parse --show-toplevel 2>$null)
if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($repoRoot)) {
    Stop-WithMessage "Run this script inside the Codex-Project- repository."
}

Set-Location $repoRoot

if ([string]::IsNullOrWhiteSpace($RecordPath)) {
    $RecordPath = Find-TrainingRecordPath
}

$targetPath = Join-Path $repoRoot $RecordPath
if (-not (Test-Path -LiteralPath $targetPath)) {
    Stop-WithMessage "Training record folder not found: $RecordPath"
}

if ([string]::IsNullOrWhiteSpace($MemberName)) {
    $MemberName = Read-Host "Member name, for example MemberA or real name"
}

if ([string]::IsNullOrWhiteSpace($RoleName)) {
    $RoleName = Read-Host "Role, for example SlotPlanning / Copywriting / SystemPlanning"
}

if ([string]::IsNullOrWhiteSpace($WeekLabel)) {
    $WeekLabel = Read-Host "Week label, for example 2026-W21"
}

if ([string]::IsNullOrWhiteSpace($MemberName) -or [string]::IsNullOrWhiteSpace($RoleName) -or [string]::IsNullOrWhiteSpace($WeekLabel)) {
    Stop-WithMessage "Member name, role, and week label are required."
}

Write-Host ""
Write-Host "Repository: $repoRoot" -ForegroundColor Cyan
Write-Host "Commit scope: $RecordPath" -ForegroundColor Cyan

$branch = (& git branch --show-current).Trim()
if ($branch -ne "codex/codexai") {
    Write-Host "Warning: current branch is $branch, not codex/codexai." -ForegroundColor Yellow
    $confirmBranch = Read-Host "Type YES to continue"
    if ($confirmBranch -ne "YES") {
        Stop-WithMessage "Upload canceled by member."
    }
}

Write-Host ""
Write-Host "Step 1: Pull latest changes from GitHub..." -ForegroundColor Cyan
Run-Git @("pull", "--rebase", "--autostash")

Write-Host ""
Write-Host "Step 2: Current changes..." -ForegroundColor Cyan
& git -c core.quotepath=false status --short
if ($LASTEXITCODE -ne 0) {
    Stop-WithMessage "Cannot read git status."
}

Write-Host ""
Write-Host "Step 3: Stage training record folder only..." -ForegroundColor Cyan
Run-Git @("add", "--", $RecordPath)

$stagedChanges = (& git diff --cached --name-only -- $RecordPath)
if ([string]::IsNullOrWhiteSpace(($stagedChanges -join ""))) {
    Write-Host ""
    Write-Host "No training record changes found. Nothing to upload." -ForegroundColor Yellow
    Run-Git @("reset", "--", $RecordPath)
    exit 0
}

Write-Host ""
Write-Host "Files to commit:" -ForegroundColor Cyan
& git -c core.quotepath=false diff --cached --name-status -- $RecordPath
if ($LASTEXITCODE -ne 0) {
    Stop-WithMessage "Cannot show staged files."
}

Write-Host ""
$confirm = Read-Host "Type YES to commit and push"
if ($confirm -ne "YES") {
    Run-Git @("reset", "--", $RecordPath)
    Stop-WithMessage "Upload canceled. Staged training files have been unstaged."
}

$commitMessage = "$MemberName add $WeekLabel $RoleName training records"

Write-Host ""
Write-Host "Step 4: Create commit..." -ForegroundColor Cyan
Run-Git @("commit", "-m", $commitMessage)

Write-Host ""
Write-Host "Step 5: Push to GitHub..." -ForegroundColor Cyan
Run-Git @("push")

Write-Host ""
Write-Host "Upload completed." -ForegroundColor Green
Write-Host "Commit message: $commitMessage" -ForegroundColor Green
Write-Host "The project owner can run git pull to collect these training records." -ForegroundColor Green
