import os
import hashlib
import re

def get_file_hash(filepath):
    hasher = hashlib.md5()
    with open(filepath, 'rb') as f:
        buf = f.read(65536)
        while len(buf) > 0:
            hasher.update(buf)
            buf = f.read(65536)
    return hasher.hexdigest()

def main():
    project_root = r"f:\computer science and engiering for jobs after grad documnet\pujo porikroma project"
    public_dir = os.path.join(project_root, "public")
    src_dir = os.path.join(project_root, "src")
    
    referenced_paths = set()
    for root, _, files in os.walk(src_dir):
        for file in files:
            if file.endswith(('.js', '.jsx')):
                with open(os.path.join(root, file), 'r', encoding='utf-8') as f:
                    content = f.read()
                    matches = re.findall(r'(/songs/[^"\'\`]+\.mp3)', content)
                    for m in matches:
                        full_path = os.path.abspath(os.path.join(public_dir, m.lstrip('/')))
                        referenced_paths.add(full_path.lower())

    all_mp3s = []
    for root, _, files in os.walk(project_root):
        if 'node_modules' in root or '.git' in root:
            continue
        for file in files:
            if file.lower().endswith('.mp3'):
                all_mp3s.append(os.path.abspath(os.path.join(root, file)))

    hash_map = {}
    for filepath in all_mp3s:
        try:
            h = get_file_hash(filepath)
            if h not in hash_map:
                hash_map[h] = []
            hash_map[h].append(filepath)
        except Exception:
            pass

    to_delete = []
    for h, files in hash_map.items():
        if len(files) > 1:
            ref_files = []
            unref_files = []
            for f in files:
                if f.lower() in referenced_paths:
                    ref_files.append(f)
                else:
                    unref_files.append(f)
            
            if len(ref_files) > 0:
                for f in unref_files:
                    to_delete.append(f)
            else:
                for f in unref_files[1:]:
                    to_delete.append(f)

    with open(os.path.join(project_root, "scratch", "delete_plan.txt"), "w", encoding="utf-8") as f:
        for p in to_delete:
            f.write(p + "\n")

if __name__ == "__main__":
    main()
