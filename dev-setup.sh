#!/bin/bash

# This script helps set up the development environment for vue-translate

echo "Setting up development environment for vue-translate..."

# Build the core package
cd packages/vue-translate
echo "Building vue-translate core package..."
npm install
npm run build
cd ../..

# Build the unplugin package
cd packages/unplugin-vue-translate
echo "Building unplugin-vue-translate package..."
npm install
npm run build
cd ../..

# Setup the example
cd example
echo "Setting up example..."
npm install

echo "\nSetup complete! You can now run the example with:\n"
echo "cd example"
echo "npm run dev"