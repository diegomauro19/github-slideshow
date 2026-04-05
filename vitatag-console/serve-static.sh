#!/bin/bash
# Serve the VitaTag Console static build
# Usage: ./serve-static.sh
cd "$(dirname "$0")/out"
echo "🚀 VitaTag Console running at: http://localhost:3002"
echo "   Open http://localhost:3002/dashboard in your browser"
echo ""
echo "   Press Ctrl+C to stop"
npx serve -l 3002 -s . 2>/dev/null || python3 -m http.server 3002 2>/dev/null || python -m SimpleHTTPServer 3002
