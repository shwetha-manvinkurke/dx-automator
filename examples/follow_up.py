from python_http_client import Client
import os
import json
import repos

all_repos = repos.ALL_REPOS

def get_items(repo, item_type):
    client = Client(host="http://{}".format(os.environ.get("DX_IP")))
    query_params = {
        "repo": repo,
        "item_type": item_type,
        "states[]": ["OPEN"],
        "limit[]": ["first", "100"]
    }
    response = client.github.items.get(query_params=query_params)
    items = json.loads(response.body)

    # Filter down to items in need of follow-up.
    return [item for item in items if item["follow_up_needed"]]


total_issues = 0
total_prs = 0
for org in all_repos:
    for repo in all_repos[org]:
        for pr in get_items(repo, "pull_requests"):
            text = "{} , {}".format(pr["url"], pr["createdAt"])
            print(text)
            total_prs = total_prs + 1
        for issue in get_items(repo, "issues"):
            text = "{} , {}".format(issue["url"], issue["createdAt"])
            print(text)
            total_issues = total_issues + 1

print("There are a total of {} prs needing a response across all repos".format(total_prs))
print("There are a total of {} issues needing a response across all repos".format(total_issues))
print("There are a total of {} issues + prs needing a response across all repos".format(total_prs + total_issues))
