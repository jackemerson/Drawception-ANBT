import re,subprocess

gitcommand = 'git log origin..main --format="- %s"'

news = subprocess.check_output(gitcommand, shell=True).decode('utf-8')
if len(news)<2:
  print("Nothing new.")
  exit()

f = open("CHANGELOG.txt", "rb")
changelog = f.read()
f.close()

ver = re.match("(\d+)\.(\d+)\.(\d+)\.(\d+)", changelog.decode('utf-8'))
l = list(ver.group(1, 2, 3, 4))
l[1] = int(l[1], 10) + 1
newver = "%s.%s.%s.%s" % tuple(l)

additions = newver + "\n" + news + "\n"

f = open("CHANGELOG.txt", "wb")
f.write(str.encode(additions))
f.write(changelog)
f.close()

print(additions)
