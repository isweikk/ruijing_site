#!/bin/bash
# 锐境 AI Website - Quick Start Script

echo "========================================"
echo "锐境 AI Website"
echo "========================================"
echo ""

show_menu() {
    echo "Please select an option:"
    echo "1. Install dependencies"
    echo "2. Start development server"
    echo "3. Build website"
    echo "4. Clean build files"
    echo "5. Exit"
    echo ""
}

install_deps() {
    echo ""
    echo "Installing dependencies..."
    pip install -r requirements.txt
    echo ""
    echo "Dependencies installed successfully!"
    echo ""
}

start_server() {
    echo ""
    echo "Starting development server..."
    echo "Open http://127.0.0.1:8000 in your browser"
    echo "Press Ctrl+C to stop the server"
    echo ""
    mkdocs serve
}

build_site() {
    echo ""
    echo "Building website..."
    mkdocs build
    echo ""
    echo "Website built successfully! Files are in the 'site' folder."
    echo ""
}

clean_site() {
    echo ""
    echo "Cleaning build files..."
    rm -rf site
    echo "Build files cleaned!"
    echo ""
}

while true; do
    show_menu
    read -p "Enter your choice (1-5): " choice
    
    case $choice in
        1)
            install_deps
            ;;
        2)
            start_server
            ;;
        3)
            build_site
            ;;
        4)
            clean_site
            ;;
        5)
            echo ""
            echo "Goodbye!"
            exit 0
            ;;
        *)
            echo "Invalid choice, please try again."
            echo ""
            ;;
    esac
done
