# this file converts .ts files in commands folder to .js

import os
import shutil

commands_js_dir = "src/commands-js"
commands_ts_dir = "src/commands-ts"

def splitall(path): # taken from: https://www.oreilly.com/library/view/python-cookbook/0596001673/ch04s16.html
    allparts = []
    while 1:
        parts = os.path.split(path)
        if parts[0] == path:  # sentinel for absolute paths
            allparts.insert(0, parts[0])
            break
        elif parts[1] == path: # sentinel for relative paths
            allparts.insert(0, parts[1])
            break
        else:
            path = parts[0]
            allparts.insert(0, parts[1])
    return allparts

def joinall(splitted_path): # i actually made this
    result = ""

    for part in splitted_path:
        result = os.path.join(result, part)

    return result

for folder in os.scandir(commands_js_dir):
    shutil.rmtree(folder.path)

for folder in os.scandir(commands_ts_dir):

    if folder.is_dir():
        for file in os.scandir(folder.path):
            if file.is_file():
                if os.path.splitext(file.path)[1] == ".ts":
                    file_changed_ext = os.path.splitext(file.path)[0] + ".js"

                    splitted_file_path = splitall(file_changed_ext)
                    index_of_old_folder = splitted_file_path.index("commands-ts")
                    splitted_file_path[index_of_old_folder] = "commands-js"

                    out_file = joinall(splitted_file_path)

                    os.system(f"tsc {file.path}")

                    os.renames(file_changed_ext, out_file)