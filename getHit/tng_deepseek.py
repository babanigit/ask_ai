

def tng_deepseek():

    print("--start tng_deepseek--")
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
        "model": "tngtech/deepseek-r1t2-chimera:free",
        "messages": [
        {
            "role": "user",
            "content": "What is the meaning of life?"
        }
        ]
    })
    )  
    print(response.status_code)
    print(response.text.strip()) 
    print("--end tng_deepseek--")
    return 0