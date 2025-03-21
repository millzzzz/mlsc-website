#!/bin/bash
# start.sh - Helper script to run the MLSC Studio website in different modes

# Create scripts directory if it doesn't exist
mkdir -p $(dirname "$0")

# Define colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default port
PORT=${PORT:-3000}

# Load .env file if it exists
if [ -f .env ]; then
  echo -e "${BLUE}Loading environment from .env file${NC}"
  export $(grep -v '^#' .env | xargs)
fi

# Show help
if [ "$1" == "help" ] || [ "$1" == "--help" ] || [ "$1" == "-h" ]; then
  echo -e "${GREEN}MLSC Studio Website - Helper Script${NC}"
  echo ""
  echo "Usage: ./scripts/start.sh [command] [options]"
  echo ""
  echo "Commands:"
  echo "  dev          Run with Bun development server (with hot reload)"
  echo "  node         Run with Node.js fallback server"
  echo "  build        Build the project"
  echo "  clean        Remove build artifacts"
  echo "  check        Run type checking"
  echo ""
  echo "Options:"
  echo "  --port=XXXX  Set custom port (default: 3000 or PORT from .env)"
  echo "  --help       Show this help message"
  echo ""
  echo "Examples:"
  echo "  ./scripts/start.sh dev --port=4000"
  echo "  ./scripts/start.sh node"
  echo "  ./scripts/start.sh build"
  exit 0
fi

# Parse port from arguments
for arg in "$@"; do
  if [[ $arg == --port=* ]]; then
    PORT="${arg#*=}"
  fi
done

# Determine command
CMD="$1"

case "$CMD" in
  "dev")
    echo -e "${GREEN}Starting Bun development server on port ${PORT}${NC}"
    echo -e "${YELLOW}Preview URL: http://localhost:${PORT}/?preview=${PREVIEW_SECRET}${NC}"
    PORT=$PORT bun --watch src/index.ts
    ;;
    
  "node")
    echo -e "${GREEN}Starting Node.js fallback server on port ${PORT}${NC}"
    echo -e "${YELLOW}Preview URL: http://localhost:${PORT}/?preview=${PREVIEW_SECRET}${NC}"
    echo -e "${BLUE}Building for Node.js...${NC}"
    
    # Build first
    bun build src/index.ts --outdir ./dist --target node
    
    # Run with Node.js
    PORT=$PORT node server.js
    ;;
    
  "build")
    echo -e "${GREEN}Building project...${NC}"
    bun build src/index.ts --outdir ./dist --target node
    echo -e "${GREEN}Build complete. Output in ./dist directory${NC}"
    ;;
    
  "clean")
    echo -e "${GREEN}Cleaning build artifacts...${NC}"
    rm -rf dist
    echo -e "${GREEN}Clean complete${NC}"
    ;;
    
  "check")
    echo -e "${GREEN}Running type checking...${NC}"
    bun typecheck
    ;;
    
  *)
    echo -e "${RED}Unknown command: ${CMD}${NC}"
    echo "Run './scripts/start.sh help' for usage information"
    exit 1
    ;;
esac 