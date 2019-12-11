from django.urls import re_path
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter


from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/tasks/list/$', consumers.TaskListConsumer),
    re_path(r'ws/tasks/id/(?P<task_id>[a-zA-Z0-9_.-]+)/$',
            consumers.TaskConsumer),
]


application = ProtocolTypeRouter({
    # (http->django views is added by default)
    'websocket': AuthMiddlewareStack(
        URLRouter(
            websocket_urlpatterns
        )
    ),
})
