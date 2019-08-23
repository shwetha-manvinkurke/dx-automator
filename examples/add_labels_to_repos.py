import datetime
import json

from common.automator_client import client
from common.repos import ALL_REPOS

request_body = {
    "org": "sendgrid",
    "repo": "sendgrid-python",
    "username": "thinkingserious"
}
response = client.github.add_label_to_repo.post(request_body=request_body)
print(response.body)
