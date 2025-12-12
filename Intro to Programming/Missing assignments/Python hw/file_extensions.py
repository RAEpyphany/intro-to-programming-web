def get_file_extension(filename):
    return filename.split(".")[1]

def main():
    print(get_file_extension("document.pdf"))
    print(get_file_extension("archive.zip"))
    print(get_file_extension("image.jpeg"))

main()
