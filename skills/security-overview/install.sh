#!/bin/bash

# Security Overview Skill Installation Script
# This script sets up the security-overview skill for choochoo

set -e

echo "🔒 Installing Security Overview Skill..."

# Create skill directory if it doesn't exist
mkdir -p "$HOME/.config/opencode/skills/choochoo/security-overview"

# Copy skill files
cp security_overview.py "$HOME/.config/opencode/skills/choochoo/security-overview/"
cp SKILL.md "$HOME/.config/opencode/skills/choochoo/security-overview/"
cp README.md "$HOME/.config/opencode/skills/choochoo/security-overview/"

# Install required dependencies
echo "📦 Installing required dependencies..."

# Check for ripgrep (rg)
if ! command -v rg &> /dev/null; then
    echo "❌ ripgrep (rg) not found. Installing..."
    if command -v brew &> /dev/null; then
        brew install ripgrep
    elif command -v apt-get &> /dev/null; then
        sudo apt-get install -y ripgrep
    elif command -v yum &> /dev/null; then
        sudo yum install -y ripgrep
    else
        echo "⚠️  Please install ripgrep manually: https://github.com/BurntSushi/ripgrep"
    fi
else
    echo "✅ ripgrep found"
fi

# Check for Python 3
echo "🐍 Checking Python 3..."
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 not found. Please install Python 3 first."
    exit 1
fi

echo "✅ Python 3 found"

# Create virtual environment (optional but recommended)
echo "🧪 Setting up virtual environment..."
if [ ! -d "$HOME/.config/opencode/skills/choochoo/security-overview/venv" ]; then
    python3 -m venv "$HOME/.config/opencode/skills/choochoo/security-overview/venv"
    source "$HOME/.config/opencode/skills/choochoo/security-overview/venv/bin/activate"
    pip install --upgrade pip
    pip install -r requirements.txt 2>/dev/null || echo "⚠️  No requirements.txt found, using built-in dependencies"
else
    echo "✅ Virtual environment already exists"
fi

echo ""
echo "✅ Security Overview Skill installed successfully!"
echo ""
echo "Usage:"
echo "  /security-overview scan"
echo "  /security-overview report"
echo "  /security-overview dashboard"
echo "  /security-overview compliance"
echo ""
echo "Options:"
echo "  --path=<directory>      Directory to scan (default: current)"
echo "  --profile=<web|api|mobile|desktop|iot>  Application profile"
echo "  --framework=<react|node|django|flutter|etc>  Technology framework"
echo "  --severity=<low|medium|high|critical>  Filter by severity"
echo "  --category=<auth|input|secrets|deps|crypto|config|infra|data|compliance>  Filter by category"
echo "  --compliance=<soc2|iso27001|gdpr|hipaa|pci>  Compliance framework"
echo "  --output=<markdown|json|html|pdf>  Output format (default: markdown)"
echo "  --budget=<number>      Token budget for context assembly (default: 2000)"
echo ""
echo "Example:"
echo "  /security-overview scan --profile=web --framework=react --compliance=soc2"
echo ""
echo "🔍 Skill location: $HOME/.config/opencode/skills/choochoo/security-overview"
echo ""
echo "🚀 You're ready to perform comprehensive security assessments!"