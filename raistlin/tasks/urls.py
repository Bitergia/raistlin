from . import views

from django.conf.urls import url
from django.views.generic import RedirectView


urlpatterns = [
    url(r'^$', RedirectView.as_view(url='list')),
    url(r'^list', views.TasksList.as_view(), name='tasks list'),
    url(r'^id/(?P<task_id>[a-zA-Z0-9_.-]+)/$', views.Task.as_view(),
        name='task by id')
]
