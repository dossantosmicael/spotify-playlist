import os
import requests
import base64

def get_access_token():
  client_id = os.getenv('CLIENT_ID')
  client_secret = os.getenv('CLIENT_SECRET')

  if not client_id or not client_secret:
      raise ValueError('CLIENT_ID or CLIENT_SECRET not found in environment')

  auth_string = f'{client_id}:{client_secret}'
  auth_bytes = auth_string.encode('utf-8')
  auth_base64 = base64.b64encode(auth_bytes).decode('utf-8')

  headers = {
      'Authorization': f'Basic {auth_base64}',
      'Content-Type': 'application/x-www-form-urlencoded'
  }

  data = {
      'grant_type': 'client_credentials'
  }

  url = 'https://accounts.spotify.com/api/token'

  try:
      response = requests.post(url, headers=headers, data=data)
      response.raise_for_status()  # Raise an exception for non-2xx status codes
      return response.json()['access_token']
  except requests.exceptions.RequestException as e:
      print(f"An error occurred: {e}")
      raise  # Re-raise the exception to propagate it upwards