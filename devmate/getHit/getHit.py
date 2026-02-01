

def gethit():

    print("--start--")


    import requests
    import json

    response = requests.post(
        url="https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization": "Bearer <KEY_HERE>",
            "Content-Type": "application/json",
            # "HTTP-Referer": "<YOUR_SITE_URL>", # Optional. Site URL for rankings on openrouter.ai.
            # "X-Title": "<YOUR_SITE_NAME>", # Optional. Site title for rankings on openrouter.ai.
        },
        data=json.dumps({
            "model": "mistralai/mistral-small-3.1-24b-instruct:free",
            "messages": [
            {
                "role": "user",
                "content": [
                {
                    "type": "text",
                    "text": "What is in this image?"
                },
                {
                    "type": "image_url",
                    "image_url": {
                    "url": "https://live.staticflickr.com/3851/14825276609_098cac593d_b.jpg"
                    }
                }
                ]
            }
            ]
        })
    )

    print(response.status_code)
    print(response.text)


    print("--end--")
    return 0