from . import views

from django.conf.urls import url
from django.views.generic import RedirectView


urlpatterns = [
    url(r'^$', RedirectView.as_view(url='list')),
    url(r'^list', views.TasksList.as_view(), name='tasks list'),
    url(r'^id/(?P<task_id>[a-zA-Z0-9_.-]+)/$', views.Task.as_view(),
        name='task by id'),
    url(r'^job_id/(?P<job_id>[a-zA-Z0-9_.-]+)/$', views.Job.as_view(),
        name='job by id'),
    url(r'^add_task', views.AddTask.as_view(), name='add task'),
    url(r'^remove_task', views.RemoveTask.as_view(), name='remove task'),
]
