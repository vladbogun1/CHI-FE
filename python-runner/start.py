import platform
import socketserver
import http.server
import os
import subprocess
import webbrowser
import threading
import sys
import shutil
from termcolor import colored

STATIC_PORT = 8000
BASE_DIR = os.path.abspath("../../CHI-FE/")
NPM_PATH = shutil.which("npm")  # Find the full path of npm

if NPM_PATH is None:
    print("npm not found in PATH. Ensure npm is installed and added to your PATH environment variable.")
    sys.exit(1)

# Define colors for different lectures
colors = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white']

# Function to get color for a lecture
def get_color(lecture_number):
    return colors[lecture_number % len(colors)]

# Function to print logs with color
def print_colored_log(prefix, color, message):
    colored_message = colored(f"{prefix} - {message}", color)
    sys.stdout.write(colored_message + '\n')

# Function to start Next.js server in a new terminal window
def start_nextjs_server(npm_dir, npm_port, lecture_number):
    color = get_color(lecture_number)
    prefix = f"lecture-{lecture_number} log"

    # Check if package.json exists in the directory
    package_json_path = os.path.join(npm_dir, 'package.json')
    if not os.path.exists(package_json_path):
        print_colored_log(prefix, color, f"package.json not found at {package_json_path}. Skipping...")
        return

    # Use raw strings for paths
    npm_path = NPM_PATH.replace("\\", "/")

    # Define the command to run based on the operating system
    if os.name == 'nt':  # Windows
        cmd = fr'title Lecture {lecture_number} && "{npm_dir}/start.bat"'
        full_cmd = f'start cmd /k "{cmd}"'
    elif platform.system() == 'Darwin':  # macOS
        cmd = f'bash "{npm_dir}/start.sh"'
        full_cmd = f'osascript -e \'tell application "Terminal" to do script "{cmd}"\''
    else:  # Unix-like OS (Linux)
        cmd = f'bash "{npm_dir}/start.sh"'
        # You can use 'gnome-terminal', 'xterm', or other terminal emulators
        full_cmd = f'gnome-terminal -- bash -c "{cmd}; exec bash"'

    # Open a new cmd window and execute the command
    subprocess.Popen(full_cmd, shell=True)

# Function to check if a port is available
def is_port_in_use(port):
    import socket
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        return s.connect_ex(('localhost', port)) == 0

# Function to start static server
def start_static_server():
    os.chdir(BASE_DIR)
    handler = http.server.SimpleHTTPRequestHandler

    with socketserver.TCPServer(("", STATIC_PORT), handler) as httpd:
        print(f"Serving static files at http://localhost:{STATIC_PORT}")
        webbrowser.open(f'http://localhost:{STATIC_PORT}')
        httpd.serve_forever()

# Function to start Next.js servers concurrently
def start_nextjs_servers():
    directories = [f for f in os.listdir(BASE_DIR) if os.path.isdir(os.path.join(BASE_DIR, f))]
    npm_lecture_dirs = [f for f in directories if f.startswith('lesson-') and 4 <= int(f.split('-')[1]) <= 13]

    for lecture_dir in npm_lecture_dirs:
        lecture_path = os.path.join(BASE_DIR, lecture_dir)
        lesson_number = int(lecture_dir.split('-')[1])
        current_port = 8000 + lesson_number
        print(f"Processing {lecture_path} on port {current_port}...")

        # Start the Next.js server for the current lecture in a new terminal window
        threading.Thread(target=start_nextjs_server, args=(lecture_path, current_port, lesson_number)).start()

if __name__ == "__main__":
    # Start the static server in a new thread
    static_thread = threading.Thread(target=start_static_server)
    static_thread.start()

    # Start Next.js servers
    start_nextjs_servers()

    # Wait for the static server thread to complete (it won't, but this keeps the main thread alive)
    static_thread.join()
