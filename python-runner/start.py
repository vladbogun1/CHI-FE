import socketserver
import http.server
import os
import time
import webbrowser

PORT = 8000
DIRECTORY = "../../CHI-FE/"


Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    os.chdir(DIRECTORY)
    print("Server running on port", PORT)

    # Open the web browser after a slight delay to ensure the server is ready
    time.sleep(1)
    webbrowser.open(f"http://localhost:{PORT}")

    httpd.serve_forever()