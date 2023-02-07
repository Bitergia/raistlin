<template>
  <v-card :to="{path: '/tasks/' + task.task_id }">
    <div class="d-flex flex-no-wrap justify-space-between pa-4">
      <div class="flex-grow-1">
        <v-card-title>
          {{ task.task_id }}
          <v-chip
            size="small"
            class="ml-2 text-capitalize"
            :color="task.status.toLowerCase()"
          >
            {{ task.status }}
          </v-chip>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <p class="mb-3">
                <span class="font-weight-medium">{{ task.jobs.length }}</span> jobs
              </p>
              <v-icon
                v-for="job in task.jobs.slice(0,10)"
                :key="job.job_number"
                :color="job.job_status"
                icon="mdi-square"
              />
            </v-col>
            <v-col>
              <p class="mb-3">
                <v-icon>
                  {{ 'mdi-' + task.backend }}
                </v-icon>
                {{ task.backend }}
              </p>
              <p>
                <v-icon icon="mdi-calendar-month" />
                {{ prettyDate(task.created_on) }}
              </p>
            </v-col>
          </v-row>
        </v-card-text>
      </div>
      <v-card-actions>
        <v-btn
          icon="mdi-delete"
          color="amber-darken-4"
          @click.prevent="$emit('openModal')"
        />
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
import { prettyDate } from './../utils/filters'

export default {
  name: 'TaskCard',
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  emits: ['openModal'],
  setup() {
    return { prettyDate }
  }
}
</script>
