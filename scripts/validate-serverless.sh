#!/bin/bash

# Exit on error
set -e

echo "🔍 Validating Serverless configuration..."

# Check if serverless is installed
if ! command -v serverless &> /dev/null; then
    echo "❌ Serverless CLI is not installed"
    exit 1
fi

# Print the resolved configuration
echo "📋 Printing resolved configuration..."
serverless print

# Package the service
echo "📦 Packaging service..."
serverless package

echo "✅ Serverless validation completed successfully!" 