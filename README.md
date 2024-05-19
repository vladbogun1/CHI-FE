
# CHI-FE Project

This project contains lecture materials that can be accessed via a local web server. This guide will help you set up and run the server to view the lectures in your browser.

## Prerequisites

- Python 3.x installed on your machine

## Installation

1. Clone this repository or download the project files.
2. Navigate to the project directory.

```bash
git clone https://github.com/vladbogun1/CHI-FE
cd CHI-FE
```

3. Ensure you have a virtual environment set up (optional but recommended).

```bash
python -m venv venv
source venv/bin/activate    # On Windows, use `venv\Scripts\activate`
```

4. Install the required dependencies.

Run a `requirements.txt` file:


```bash
pip install -r python-runner/requirements.txt
```

## Running the Server

1. Open a terminal and navigate to the directory containing `start.py`.
2. Run the `start.py` file.

```bash
python python-runner/start.py
```

This will start a local web server on port 8000.

## Accessing the Lectures

Once the server is running, it will automatically open your default web browser and navigate to `http://localhost:8000`. You will see a list of directories containing the lecture materials.

## Directory Structure

- `lesson-1/` - Lecture materials for Lesson 1
- `lesson-2/` - Lecture materials for Lesson 2
- `lesson-3/` - Lecture materials for Lesson 3
- `README.md` - Project README file
- `shared/` - Shared resources `(hidden)`
- `python-runner/` - Python runner files `(hidden)`
- `.idea/` - IDE configuration files `(hidden)`
- `.git/` - Git repository files `(hidden)`
- `venv/` - Virtual environment directory `(hidden)`



## Troubleshooting

- Ensure that you have Python 3.x installed.
- Verify that no other processes are using port 8000.
- If the server doesn't start or the browser doesn't open, check the terminal for error messages and ensure you have the necessary permissions.

## Contact

For further assistance, please contact **_Vlad Bogun_** at `vladbogun@gmail.com`.

---

Enjoy your lectures!
