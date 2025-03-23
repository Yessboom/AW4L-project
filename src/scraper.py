import requests
from bs4 import BeautifulSoup
import json

# URL of the page to scrape
url = 'https://jacklich10.com/bigboard/nfl/'

# Send a GET request to the URL
response = requests.get(url)
# Parse the HTML content using BeautifulSoup
soup = BeautifulSoup(response.content, 'html.parser')

# Find all player rows
player_rows = soup.find_all('div', class_='rt-tr-group')
print(player_rows)

# List to store player information
players = []

# Iterate over each player row and extract the required information
for row in player_rows:
    player_info = row.find('div', class_='rt-tr')
    if player_info:
        ranking = player_info.find('div', class_='rt-td-inner').text.strip()
        school_logo = player_info.find_all('img')[0]['src']
        player_image = player_info.find_all('img')[1]['src']
        position = player_info.find_all('div', class_='rt-td-inner')[3].find('span').text.strip()
        year = player_info.find_all('div', class_='rt-td-inner')[3].find_all('span')[1].text.strip()
        firstname = player_info.find_all('div', class_='rt-td-inner')[4].find('span').text.strip()
        lastname = player_info.find_all('div', class_='rt-td-inner')[4].find_all('span')[1].text.strip()
        school = player_image.split('/')[-1].split('-')[0]

        # Append the extracted information to the players list
        players.append({
            'firstname': firstname,
            'lastname': lastname,
            'ranking': int(ranking),
            'school': school,
            'position': position,
            'schoolLogo': school_logo,
            'playerImage': player_image,
            'year': year,
        })

# Convert the players list to JSON format
players_json = json.dumps(players, indent=4)

# Print the JSON output
print(players_json)
