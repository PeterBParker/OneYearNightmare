import os
import json

_DATA_FILENAME = "../api/data/pagesData.json"

if __name__ == "__main__":
    print("Are you sure you want to reset the database? This action is irreversible.\n")
    answer = input("absolutely / no > ")
    if answer == "absolutely":
        newBook = {
            "pageCount": 0,
            "seasonCount": 0,
            "seasons": []
        }
        with open(_DATA_FILENAME, 'w', encoding='utf-8') as f:
            json.dump(newBook, fensure_ascii=False, indent=4)
            json.truncate()
