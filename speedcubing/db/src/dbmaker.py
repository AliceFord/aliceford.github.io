import xml.etree.ElementTree as ET
import os
import shutil

def build(path, relativePath, thisPagesData):
    initial = ET.parse("C:\\Users\\olive\\Desktop\\Coding\\techiehelper.github.io\\speedcubing\\db\\src\\" + path)
    root = initial.getroot()

    with open('/'.join(relativePath) + "/" + thisPagesData["name"] + ".html", "w") as f:
        f.write("hi")

    for page in root:
        pageData = {}
        for descriptor in page:
            currentFunc = build
            if descriptor.tag == "pagetype":
                pageData["pagetype"] = descriptor.text
                if descriptor.text != "routing":
                    print("not routing page")
            elif descriptor.tag == "name":
                pageData["name"] = descriptor.text
                shutil.rmtree('/'.join(relativePath) + "/" + descriptor.text)
                os.mkdir('/'.join(relativePath) + "/" + descriptor.text)
                currentFunc(descriptor.text + ".xml", relativePath + [descriptor.text], pageData)


build("index.xml", ["speedcubing", "db"], {"name": "index"})
