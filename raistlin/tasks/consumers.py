import json
import requests
import time

from channels.generic.websocket import WebsocketConsumer

from django.conf import settings


class TaskListConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()
        while True:
            tasks, err = get_tasks_list()
            if err:
                self.send(text_data=json.dumps(
                    {'status': 'false', 'message': err}))
            else:
                self.send(text_data=json.dumps(tasks))
            time.sleep(3)

    def disconnect(self):
        super().disconnect()


class TaskConsumer(WebsocketConsumer):
    def connect(self):
        task_id = self.scope['url_route']['kwargs']['task_id']
        self.accept()
        while True:
            task, err = get_task(task_id)
            if err:
                self.send(text_data=json.dumps(
                    {'status': 'false', 'message': err}))
            else:
                self.send(text_data=json.dumps(task))
            time.sleep(3)

    def disconnect(self):
        super().disconnect()


def get_tasks_list():
    try:
        response = requests.get(settings.ARTHUR_SERVER + "/tasks")
        tasks = json.loads(response.text)['tasks']
    except requests.exceptions.RequestException:
        err = "Impossible connect to Arthur"
        return {'status': 'false', 'message': err}
    except json.decoder.JSONDecodeError:
        err = "Error parsing response, please check the KingArthur url"
        return 'false', err
    return tasks, None


def get_task(task_id):
    try:
        response = requests.get(settings.ARTHUR_SERVER +
                                "/task/{}".format(task_id))
        task = json.loads(response.text)
    except requests.exceptions.RequestException:
        err = "Impossible connect to Arthur"
        return 'false', err
    except json.decoder.JSONDecodeError:
        err = "Task not found, please check the task ID"
        return 'false', err
    return task, None
