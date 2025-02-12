<script lang="ts">
import {
  formatDate,
  formatTime,
  capitalize,
  isSameHour,
  getEventByDate,
  isToday,
} from "../util";

export default {
  name: "Weekly",

  props: {
    modelValue: Date,
    isPhone: Boolean,
    events: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["update:modelValue", "select"],

  setup() {
    return {
      weekDays: ref(["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"]),
      model: ref(),
      calendarDate: ref(null),
      hoverDate: ref(),
      isBack: ref(false),
      show: ref(true),
      showingMonths: ref(false),
      showingYears: ref(false),
      calendar: ref(null),
    };
  },

  created() {
    this.model = this.modelValue || new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' })).getTime();
  },

  mounted() {
    setTimeout(() => {
      this.scrollToHour();
    }, 300);
  },

  watch: {
    modelValue() {
      const time =
        this.modelValue instanceof Date
          ? this.modelValue.getTime()
          : this.modelValue;
      const diffInDays = Math.round(
        (time - this.model) / (1000 * 60 * 60 * 24)
      );
      this.changeWeek(diffInDays, false);
    },

    isPhone() {
      this.scrollToHour();
    },
  },

  computed: {
    title() {
      const title = formatDate(new Date(this.model), {
        month: "long",
        year: "numeric",
      });
      return capitalize(title);
    },

    week() {
      const date = new Date(this.model);
      const currentDay = date.getDay();
      const diff = date.getDate() - currentDay + (currentDay == 0 ? -6 : 1);
      const monday = new Date(date.setDate(diff));

      const week = [];
      for (let i = 0; i < 7; i++) {
        const day = new Date(monday);
        day.setDate(monday.getDate() + i);
        week.push(day);
      }

      return week;
    },

    hours() {
      const hours = [];
      for (let i = 0; i < 25; i++) {
        const hour = new Date();
        hour.setHours(i, 0, 0, 0);
        hours.push(hour);
      }
      return hours;
    },
  },

  methods: {
    isToday,

    changeModel(value: Date, emit = true) {
      this.model = value.getTime();
      if (emit) this.$emit("update:modelValue", this.model);
    },

    getHour(date: Date) {
      return formatTime(date);
    },

    changeWeek(day: number, emit = true) {
      this.isBack = day < 0;
      this.show = false;

      const date = new Date(this.model);
      date.setDate(date.getDate() + day);
      this.changeModel(date, emit);

      setTimeout(() => {
        this.show = true;
        this.scrollToHour();
      }, 100);
    },

    scrollToHour() {
      if (this.calendar && !this.isPhone) {
        const hour = new Date();
        this.calendar.scrollTo({
          top: hour.getHours() * 40,
        });
      }
    },

    getEventsByDayAndHour(day: Date, hour: Date) {
      return this.events.filter(
        (event) =>
          getEventByDate(event, day) &&
          isSameHour(this.getDate(event.startDate), hour)
      );
    },

    getEventsByDay(day: Date) {
      return this.events.filter((event) => getEventByDate(event, day));
    },

    selectEvent(event: Appointment) {
      this.$emit("select", event);
    },

    getDate(date: Date | string) {
      return new Date(date);
    },
  },
};
</script>

<template>
  <div class="flex flex-col gap-base w-full h-full">
    <div class="flex items-center justify-between gap-sm">
      <div class="flex items-center gap-sm">
        <div class="flex">
          <div class="chevron" @click="changeWeek(-7)">
            <Icon name="chevron_left" />
          </div>
          <div class="chevron" @click="changeWeek(7)">
            <Icon name="chevron_right" />
          </div>
        </div>
        <Transition :name="!isBack ? 'slide-fade' : 'slide-fade-out'">
          <h1 class="date-title" v-if="show">
            {{ title }}
          </h1>
        </Transition>
      </div>
      <slot name="actions" />
    </div>
    <Transition :name="!isBack ? 'slide-fade' : 'slide-fade-out'">
      <div class="calendar" v-if="show && !isPhone">
        <div ref="calendar" class="flex overflow-auto">
          <div class="column first">
            <div class="date select-none [&>*]:opacity-0">
              <span class="week-day">12</span>
              <span>12</span>
            </div>
            <div v-for="hour in hours" :key="hour" class="hour">
              <div class="date-hour">
                {{ getHour(hour) }}
              </div>
              <div class="line first" />
            </div>
          </div>
          <div class="column flex-1" v-for="(day, index) in week">
            <div class="date" :class="{ active: isToday(day) }">
              <span class="week-day">
                {{ weekDays[index] }}
              </span>
              {{ day.getDate() }}
            </div>
            <div v-for="hour in hours" :key="hour" class="hour">
              <div
                class="flex items-center w-full h-[2px] left-[-3px] bg-primary-800 absolute z-[2]"
                :style="{
                  width: `calc(100% + 3px)`,
                  top: `calc(50% + ${new Date().getMinutes()}px)`,
                }"
                v-if="isToday(day) && hour.getHours() == new Date().getHours()"
              >
                <div class="w-[6px] h-[6px] bg-primary-800 rounded-full" />
              </div>
              <div class="date-hour content">
                <Event
                  v-for="event in getEventsByDayAndHour(day, hour)"
                  :model-value="event"
                  :key="event.id"
                  class="desktop-event"
                  :style="{
                    height: `${
                      (this.getDate(event.endDate).getHours() +
                        this.getDate(event.endDate).getMinutes() / 60 -
                        (this.getDate(event.startDate).getHours() +
                          this.getDate(event.startDate).getMinutes() / 60)) *
                      60
                    }px`,
                    top: `calc(50% + ${this.getDate(
                      event.startDate
                    ).getMinutes()}px)`,
                  }"
                  @click="selectEvent(event)"
                />
              </div>
              <div class="line" />
            </div>
          </div>
        </div>
      </div>
      <div class="calendar is-phone" v-else-if="show">
        <div class="overflow-y-auto">
          <div v-for="(day, index) in week" :key="index" class="week">
            <div class="date" :class="{ active: isToday(day) }">
              <span class="week-day">
                {{ weekDays[index] }}
              </span>
              {{ day.getDate() }}
            </div>
            <div class="flex flex-col gap-base w-full" v-if="events.length">
              <Event
                v-for="event in getEventsByDay(day)"
                :key="event.id"
                :model-value="event"
                show-hour
                @click="selectEvent(event)"
              />
            </div>
            <div v-else class="text-14 text-gray-400 flex items-center gap-sm">
              <Icon name="schedule" />
              Sem consultas
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.chevron {
  @apply flex items-center rounded-full p-xxs cursor-pointer text-gray-400 duration-300 hover:bg-gray-200;

  .icon {
    @apply text-[30px];
  }
}

.date-title {
  @apply text-20 font-bold text-gray-500;
}

.calendar {
  @apply flex flex-col shadow-normal rounded-24 bg-white overflow-hidden flex-1;
}

.column {
  @apply flex flex-col border-r-1 border-gray-300;
}

.column.first {
  @apply border-none;
}

.date {
  @apply z-[3] sticky top-0 flex flex-col items-center flex-1 h-auto px-2xl py-base text-center text-gray-500 text-20 font-bold bg-gray-100;
}

.is-phone .date {
  @apply flex-none w-[65px] bg-transparent static;
}

.date-hour {
  @apply flex items-center flex-1 min-w-[50px] min-h-[60px] text-12 text-gray-500 p-base;
}

.date-hour.content {
  @apply p-0;
}

.date.active {
  @apply text-primary-500;
}

.week-day {
  @apply text-14 font-normal;
}

main {
  @apply flex flex-col overflow-y-auto;
}

.week {
  @apply flex items-center gap-base border-b-1 border-gray-300 pr-xl py-base;
}

.week:last-child {
  @apply border-b-0;
}

.hour {
  @apply flex items-center relative;
}

.line {
  @apply absolute w-full h-[1px] top-[50%] left-0 bg-gray-300;
}

.line.first {
  @apply left-[50px];
  width: calc(100% - 50px);
}

.desktop-event {
  @apply absolute w-[90%];
}

.slide-fade-enter-active {
  @apply transition-all duration-300 ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  @apply opacity-0;
  transform: translateX(20px);
}

.slide-fade-out-enter-active {
  @apply transition-all duration-300 ease-out;
}

.slide-fade-out-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-out-enter-from,
.slide-fade-out-leave-to {
  @apply opacity-0;
  transform: translateX(-20px);
}
</style>
