import json
import requests

from django.http import JsonResponse
from django.views import View
from django.conf import settings


class TasksList(View):

    http_method_names = ['get']

    def get(self, request):
        try:
            response = requests.get(settings.ARTHUR_SERVER + "/tasks")
            tasks = json.loads(response.text)['tasks']
        except requests.exceptions.RequestException:
            err = "Impossible connect to Arthur"
            return JsonResponse({'status': 'false', 'message': err},
                                status=500)
        except json.decoder.JSONDecodeError:
            err = "Error parsing response, please check the KingArthur url"
            return JsonResponse({'status': 'false', 'message': err},
                                status=500)
        return JsonResponse(tasks, safe=False)
