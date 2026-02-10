from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

from ai.prompt import build_prompt
from ai.services import ask_openai, ask_openai2
# from ratelimit.decorators import ratelimit
from django_ratelimit.decorators import ratelimit


@csrf_exempt
@ratelimit(key="ip", rate="5/m", block=True)
def ask_ai(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST only"}, status=405)

    body = json.loads(request.body)

    language = body.get("language", "javascript")
    intent = body.get("intent", "explain")
    user_input = body.get("input")
    
    if not user_input:
        return JsonResponse({
            "error": "No input provided"
        }, status=400)

    prompt = build_prompt(language, intent, user_input)
    # ai_response = ask_openai(prompt)
    ai_response = ask_openai2(prompt)

    return JsonResponse({
        "response": ai_response
    })

