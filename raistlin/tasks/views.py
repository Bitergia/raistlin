import json
import requests

from django.http import HttpResponse, JsonResponse
from django.template import loader
from django.views import View
from django.conf import settings


class List(View):

    http_method_names = ['get']

    def get(self, request):
        err = None
        try:
            response = requests.get(settings.ARTHUR_SERVER + "/tasks")
            tasks = json.loads(response.text)['tasks']

            context = {'active_page': 'tasks list',
                       'tasks': tasks,
                       'err': err}

        except requests.exceptions.RequestException:
            err = "Impossible connect to Arthur"
            context = {'active_page': 'tasks list',
                       'err': err}

        except json.decoder.JSONDecodeError:
            err = "Error parsing response, please check the url"
            context = {'active_page': 'tasks list',
                       'err': err}

        template = loader.get_template('index.html')
        render_index = template.render(context, request)
        return JsonResponse(tasks, safe=False)
