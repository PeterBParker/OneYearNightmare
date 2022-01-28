import datetime
import json
import ntpath
import os

from shutil import copyfile
from num2words import num2words

# Future TODO: Rewrite this in javascript and use the data API instead of declaring new functions.
# TODO:         Delete folders if the program crashes? idk.

_DATA_FILENAME = "../api/data/pagesData.json"
_USERS_FILENAME = "../api/data/users.json"
_WORKING_DATA_FILENAME = "../api/data/pagesData-temp.json"
_BACKUP_FILENAME = "../api/data/pagesData-backup.json"
_DIR_PREFIX = '../../public/MnMPages/'

def addChapter(seasonName, chapterName, folderName, numOfPages, id, pages):
    chapterObj = {
        "chapterName": chapterName,
        "folderName": folderName,
        "numOfPages": numOfPages,
        "id": id,
        "pages": pages
    }
    writeChapterAppend(chapterObj, seasonName)
    season = getSeason(seasonName)
    makeDirectory(_DIR_PREFIX + season["folderName"] + "/" + folderName)

def addFirstChapter(seasonName):
    addChapter(seasonName=seasonName, chapterName="Chapter One", folderName="chapter1", numOfPages=0, id=1, pages=[])

def addNewPage(seasonName, chapterName, title, message, filepath, user):
    # time, id, and pageNum are generated off of existing values
    data = getData(_WORKING_DATA_FILENAME, 'r')
    chapter = getChapterInSeason(seasonName, chapterName)
    pageNum = chapter["numOfPages"] + 1
    identifier = data["pageCount"] + 1
    time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # Copy image and truncate filename
    filename = pathLeaf(filepath)
    season = getSeason(seasonName)
    destFilepath = _DIR_PREFIX + season["folderName"] + "/" + chapter["folderName"] + "/" + filename
    copyfile(filepath, destFilepath)

    newPage = {
        "pageNum": pageNum,
        "filename": filename,
        "title": title,
        "message": message,
        "datetime": time,
        "id": identifier,
        "user": user,
    }

    writeIncrementChapterPageCount(season["id"], chapter["id"])
    writeIncrementSeasonPageCount(season["id"])
    writeIncrementBookPageCount()
    writeIncrementMaxDisplayPageCount()

    writePageAppend(season["id"], chapter["id"], newPage)

    return True

def appendSeason():
    newSeasonName = enterSeasonName()
    seasonObj = {}
    seasonObj["seasonName"] = newSeasonName
    if not os.path.exists('../../public/OneYearNightmarePages/'+newSeasonName.lower()):
        os.makedirs(_DIR_PREFIX+newSeasonName.lower())
    else:
        raise Exception("Season directory already exists for specified season.")
    seasonObj["folderName"] = newSeasonName.lower()
    seasonObj["numOfPages"] = 0
    seasonObj["maxDisplayPage"] = 0
    seasonObj["numOfChapters"] = 0
    data = getData(_WORKING_DATA_FILENAME, 'r')
    seasonObj["id"] = data["seasonCount"] + 1
    seasonObj["chapters"] = []

    # This function has to come first to create the season the chapter is added to.
    writeNewSeasonAppend(seasonObj)
    addFirstChapter(newSeasonName)
    writeIncrementSeasonCount()

    return newSeasonName

def createNewChapter(seasonName):
    seasonIndex = getSeasonIndex(seasonName)
    season = getSeason(seasonName)
    
    chapterNum = season["numOfChapters"] + 1
    chapterName = "Chapter " + num2words(chapterNum).capitalize()

    # Make folder
    folderName = "chapter" + str(chapterNum)
    print("This is the folderName: ", folderName)
    input("Pause")
    makeDirectory(_DIR_PREFIX+season["folderName"]+'/'+folderName)
    
    addChapter(seasonName, chapterName, folderName, 0, chapterNum, [])
    return chapterName
    
    
def doesSeasonExist(seasonName):
    data = getData(_WORKING_DATA_FILENAME, 'r')
    for season in data['seasons']:
            if seasonName.lower() == season["seasonName"].lower():
                return True
    return False

def getData(filename, r_or_w):
    with open(filename, r_or_w, encoding='utf-8') as dataFile:
        data = json.load(dataFile)
    return data

def getChapterInSeason(seasonName, chapterName):
    data = getData(_WORKING_DATA_FILENAME, 'r')
    seasonObj = getSeason(seasonName)
    for chapter in seasonObj["chapters"]:
        if(chapter["chapterName"] == chapterName):
            return chapter
    return None

def getLastChapterNameInSeason(seasonName):
    data = getData(_WORKING_DATA_FILENAME, 'r')
    seasonObj = getSeason(seasonName)
    chapterIndex = seasonObj["numOfChapters"] - 1
    lastChapterObj = seasonObj["chapters"][chapterIndex]
    return lastChapterObj["chapterName"]

def getLatestSeason():
    data = getData(_WORKING_DATA_FILENAME, 'r')
    if len(data["seasons"]) == 0:
        return None
    latestSeason = max(data["seasons"], key=lambda x: x["id"])
    return latestSeason

def getLatestSeasonName():
    latestSeason = getLatestSeason()
    if latestSeason is None:
        return None
    return latestSeason["seasonName"]

def getSeason(seasonName):
    data = getData(_WORKING_DATA_FILENAME, 'r')
    for season in data["seasons"]:
        if(seasonName == season["seasonName"]):
            return season
    raise Exception("Season not found")

def getSeasonIndex(seasonName):
    data = getData(_WORKING_DATA_FILENAME, 'r')
    for season in data["seasons"]:
        if(seasonName == season["seasonName"]):
            return season["id"] -1
    raise Exception("Season not found")

def getTargetChapter(seasonName):
    return enterNewOrExistingChapter(seasonName)

def getTargetSeason():
    targetSeason = None
    while True:
        latestSeasonName = getLatestSeasonName()
        if latestSeasonName is None:
            print("\nNo seasons found. Please create a season.\n")
            targetSeason = appendSeason()
            continue
        print("\nPlease select an option:\n1) Append to " + latestSeasonName + "\n2) Add a new season\n")
        selection = input("> ")
        if (selection == "1"):
            targetSeason = latestSeasonName
            break
        elif selection == "2":
            targetSeason = appendSeason()
        else:
            print("\nI don't recognize that option. Try again.\n")
    return (targetSeason)

def getUser():
    userData = getData(_USERS_FILENAME, "r")
    usernames = []
    for person in userData["admins"]:
        usernames.append(person["id"])
    user = None
    while True:
        # Ask for user
        print("Who is adding this page?")
        print("Legal values are: ")
        for name in usernames:
            print(name)

        # Get input
        user = input("> ")

        # Validate it matches one of the users allowed
        if user in usernames:
            return user
        else:
            print("That id doesn't match any known user :(")
            continue

def enterSeasonName():
    decidingOnSeasonName = True
    newSeasonName = None
    while(decidingOnSeasonName):
        print("\nAdding a Season! Please enter the name of the new season:\n")
        newSeasonName = input("Enter New Season Name > ")
        if(doesSeasonExist(newSeasonName)):
            print("Season already exists! Please add a different season.\n")
            continue
        print("\nConfirm you want to add the season, " + newSeasonName +'\n')
        confirmation = input("y/n > ")
        if confirmation == "y":
            decidingOnSeasonName = False
    return newSeasonName

def enterNewOrExistingChapter(seasonName):
    while True:
        lastChapterName = getLastChapterNameInSeason(seasonName)
        print("\nPlease select an option:\n1) Append to " + seasonName + ", " + lastChapterName + "\n2) Create a new chapter?\n")
        appendOrCreate = input("> ")
        if (appendOrCreate == "1"):
            break
        elif (appendOrCreate == "2"):
            lastChapterName = createNewChapter(seasonName)
            break
    return lastChapterName

def enterPageData(seasonName, chapterName):
    #user needs to input filename, message, and title
    title = None
    message = None
    filepath = None
    while True:
        print("\nPlease type the title for this page:\n")
        title = input("> ")
        print("\nPlease type the message for this page:\n")
        message = input("> ")
        while True:
            print("\nPlease type the absolute filepath for this page:\n")
            filepath = input("> ")
            if(os.path.exists(filepath)):
                break
            else:
                print("\nThat filepath cannot be found. Check your file extensions, path, and try again.")
        print("\nConfirm you want to add a page with these details:\n\
                            - Append to the end of " + seasonName + ", " + chapterName + "\n\
                            - Title: " + title + "\n\
                            - Filepath: " + filepath + "\n\
                            - Message: " + message + "\n")
        redo = input("y/n > ")
        if(redo == "y"):
            break
    return title, message, filepath

def makeDirectory(dirpath):
    if not os.path.exists(dirpath):
        os.makedirs(dirpath)
    else:
        # Check if the directory is empty or not. We don't want to overwrite data.
        if len(os.listdir(dirpath)) != 0:
            raise Exception("Directory already exists")

def pathLeaf(path):
    head, tail = ntpath.split(path)
    return tail or ntpath.basename(head)

def safeCopyFile(filename, dest):
    if os.path.exists(filename):
        copyfile(filename, dest)
        return _WORKING_DATA_FILENAME
    else:
        raise FileNotFoundError("No Data File Found")

def writeChapterAppend(chapterObj, seasonName):

    data = getData(_WORKING_DATA_FILENAME, 'r')

    seasonObj = getSeason(seasonName)
    seasonObj["chapters"].append(chapterObj)
    seasonObj["numOfChapters"] += 1
    seasonIndex = seasonObj["id"] -1
    # Replace the proper season object with our newly created one.
    data["seasons"][seasonIndex] = seasonObj

    writeToFile(data, _WORKING_DATA_FILENAME)

def writeIncrementBookPageCount():
    data = getData(_WORKING_DATA_FILENAME, 'r')
    data["pageCount"] += 1
    writeToFile(data, _WORKING_DATA_FILENAME)

def writeIncrementMaxDisplayPageCount():
    data = getData(_WORKING_DATA_FILENAME, 'r')
    data["maxDisplayPage"] += 1
    writeToFile(data, _WORKING_DATA_FILENAME)

def writeIncrementSeasonCount():
    data = getData(_WORKING_DATA_FILENAME, 'r')
    data["seasonCount"] += 1
    writeToFile(data, _WORKING_DATA_FILENAME)

def writeIncrementChapterPageCount(seasonId, chapterId):
    data = getData(_WORKING_DATA_FILENAME, 'r')
    data["seasons"][seasonId-1]["chapters"][chapterId-1]["numOfPages"] += 1
    writeToFile(data, _WORKING_DATA_FILENAME)

def writeNewSeasonOverwrite(seasonObj, seasonIndex):
    data = getData(_WORKING_DATA_FILENAME, 'r')
    data["seasons"][seasonIndex] = seasonObj
    writeToFile(data, _WORKING_DATA_FILENAME)

def writeNewSeasonAppend(seasonObj):
    data = getData(_WORKING_DATA_FILENAME, 'r')
    data["seasons"].append(seasonObj)
    writeToFile(data, _WORKING_DATA_FILENAME)

def writePageAppend(seasonId, chapterId, newPage):
    data = getData(_WORKING_DATA_FILENAME, 'r')
    data["seasons"][seasonId-1]["chapters"][chapterId-1]["pages"].append(newPage)
    writeToFile(data, _WORKING_DATA_FILENAME)

def writeIncrementSeasonPageCount(seasonId):
    data = getData(_WORKING_DATA_FILENAME, 'r')
    data["seasons"][seasonId-1]["numOfPages"] += 1
    writeToFile(data, _WORKING_DATA_FILENAME)

def writeToFile(data, filename):
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)
        f.truncate()

if __name__ == "__main__":
    try:
        # Make a backup of the data in case something goes wrong in the script
        safeCopyFile(_DATA_FILENAME, _BACKUP_FILENAME)

        # Make a copy of the data file to make intermediate changes to
        workingDataFileName = safeCopyFile(_DATA_FILENAME, _WORKING_DATA_FILENAME)

        print("Welcome to the Page Appender! I will append a page to the end of a specifed chapter.\n")

        user = getUser()
        
        # Get Season Name to add the page to
        seasonName = getTargetSeason()

        # Get Chapter Name to add the page to
        chapterName = getTargetChapter(seasonName)

        # Get Page Data
        title, message, filepath = enterPageData(seasonName, chapterName)

        print("Adding page...")
        isSuccess = addNewPage(seasonName, chapterName, title, message, filepath, user)
        if(isSuccess):
            print("Page successfully added!")
        
        # Overwrite data file with temp file
        copyfile(_WORKING_DATA_FILENAME, _DATA_FILENAME)
        print("Exiting...")        
    finally:
        os.remove(workingDataFileName)
