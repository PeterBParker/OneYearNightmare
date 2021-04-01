import json
import sys
import os

from shutil import copyfile
from num2words import num2words

# Future TODO: Rewrite this in javascript and use the data API instead of declaring new functions.
# Future TODO: Instead of passing around the data object, open up a temp file and modify the temp.
#               Add a function called "getData" and eliminate passing it around through functions to save memory
# TODO:         Delete folders if the program crashes? idk.

_DATA_FILENAME = "../api/data/pagesData.json"
_WORKING_DATA_FILENAME = "../api/data/pagesData-temp.json"
_BACKUP_FILENAME = "../api/data/pagesData-backup.json"
_DIR_PREFIX = '../../public/OneYearNightmarePages/'

def addChapter(seasonName, chapterName, folderName, numOfPages, id, pages):
    chapterObj = {
        "chapterName": chapterName,
        "folderName": folderName,
        "numOfPages": numOfPages,
        "id": id,
        "pages": pages
    }
    writeChapterAppend(chapterObj, seasonName)

def addFirstChapter(seasonName):
    addChapter(seasonName=seasonName, chapterName="Chapter One", folderName="chapter1", numOfPages=0, id=1, pages=[])

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

def getLastChapterNameInSeason(seasonName):
    data = getData(_WORKING_DATA_FILENAME, 'r')
    seasonObj = getSeason(seasonName)
    chapterIndex = seasonObj["numOfChapters"] - 1
    lastChapterObj = seasonObj["chapters"][chapterIndex]
    return lastChapterObj["chapterName"]

def getLatestSeason():
    data = getData(_WORKING_DATA_FILENAME, 'r')
    latestSeason = max(data["seasons"], key=lambda x: x["id"])
    if latestSeason is None:
        raise Exception("No latest season.")
    return latestSeason

def getLatestSeasonName():
    latestSeason = getLatestSeason()
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
        sys.stdout.write("Please select an option:\n1) Append to " + latestSeasonName + "\n2) Add a new season\n")
        selection = input("> ")
        if (selection == "1"):
            targetSeason = latestSeasonName
            break
        elif selection == "2":
            targetSeason = appendSeason()
        else:
            sys.stdout.write("I don't recognize that option. Try again.\n")
    return (targetSeason)

def enterSeasonName():
    decidingOnSeasonName = True
    newSeasonName = None
    while(decidingOnSeasonName):
        sys.stdout.write("Adding a Season! Please enter the name of the new season:\n")
        newSeasonName = input("Enter New Season Name > ")
        if(doesSeasonExist(newSeasonName)):
            sys.stdout.write("Season already exists! Please add a different season.\n")
            continue
        sys.stdout.write("Confirm you want to add the season, " + newSeasonName +'\n')
        confirmation = input(" y for yes / n for no > ")
        if confirmation == "y":
            decidingOnSeasonName = False
    return newSeasonName

def enterNewOrExistingChapter(seasonName):
    while True:
        lastChapterName = getLastChapterNameInSeason(seasonName)
        sys.stdout.write("Please select an option:\n1) Append to " + seasonName + ", " + lastChapterName + "\n2) Create a new chapter?\n")
        appendOrCreate = input("> ")
        if (appendOrCreate == "1"):
            break
        elif (appendOrCreate == "2"):
            lastChapterName = createNewChapter(seasonName)
            break
    return lastChapterName

def enterPageData(seasonName, chapterName):
    # TODO Write this
    print("Almost there!")

def makeDirectory(dirpath):
    if not os.path.exists(dirpath):
        os.makedirs(dirpath)
    else:
        # Check if the directory is empty or not. We don't want to overwrite data.
        if len(os.listdir(dirpath)) != 0:
            raise Exception("Directory already exists")

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

def writeIncrementSeasonCount():
    data = getData(_WORKING_DATA_FILENAME, 'r')
    data["seasonCount"] += 1
    writeToFile(data, _WORKING_DATA_FILENAME)

def writeNewSeasonOverwrite(seasonObj, seasonIndex):
    data = getData(_WORKING_DATA_FILENAME, 'r')
    data["seasons"][seasonIndex] = seasonObj
    writeToFile(data, _WORKING_DATA_FILENAME)

def writeNewSeasonAppend(seasonObj):
    data = getData(_WORKING_DATA_FILENAME, 'r')
    data["seasons"].append(seasonObj)
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

        sys.stdout.write("Welcome to the Page Appender! I will append a page to the end of a specifed chapter.\n")
        
        # Get Season Name to add the page to
        seasonName = getTargetSeason()

        # Get Chapter Name to add the page to
        chapterName = getTargetChapter(seasonName)

        # Get Page Data
        pageData = enterPageData(seasonName, chapterName)
    finally:
        os.remove(workingDataFileName)
