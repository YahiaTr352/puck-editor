file_path = r"C:\Users\user\Desktop\questionn\puck-editor\src\puck\config.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

if "next/link" in content or "import Link" in content:
    print("Link is imported!")
else:
    print("Link is not imported.")
