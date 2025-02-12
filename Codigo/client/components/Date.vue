<script lang="ts">
import { formatDate, capitalize, getEventByDate, isToday } from "../util";

export default {
  name: "Date",
  props: {
    modelValue: [Array, Date],
    selected: Date,
    events: {
      type: Array,
      default: () => [],
    },
    maxDate: Date,
    minDate: Date,
    isCompare: Boolean,
    isEvent: Boolean,
  },
  emits: ["update:modelValue", "update:selected"],
  setup() {
    return {
      weekDays: ref(["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]),
      model: ref(),
      calendarDate: ref(null),
      hoverDate: ref(),
      isBack: ref(false),
      show: ref(true),
      showingMonths: ref(false),
      showingYears: ref(false),
    };
  },

  created() {
    if (this.modelValue) {
      this.model = this.modelValue;
    } else {
      this.resetDate();
    }

    this.isExpanded = this.expanded;
    this.calendarDate = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' })).getTime();
    if (!this.selected) this.$emit("update:selected", this.calendarDate);
  },

  watch: {
    modelValue() {
      this.model = this.modelValue ? new Date(this.modelValue) : null;
    },
    isCompare() {
      this.resetDate();
    },
    isEvent() {
      this.resetDate();
    },
    selected() {
      this.updateSelected(new Date(this.selected));
    },
  },

  computed: {
    actualDate() {
      return new Date(this.calendarDate);
    },

    months() {
      const date = new Date("2021-01-03T23:15:30");
      const months: any = [];
      for (let i = 0; i < 12; i++) {
        const formattedDay = date.toLocaleDateString("pt-BR", {
          month: "short",
        });
        months.push(formattedDay);
        date.setMonth(date.getMonth() + 1);
      }
      return months;
    },

    years() {
      const years: number[] = [];
      const date = this.actualDate;

      for (let i = date.getFullYear(); i >= date.getFullYear() - 120; i--) {
        years.push(i);
      }
      return years;
    },

    status() {
      const template = { year: "numeric", month: "2-digit", day: "2-digit" };
      if (this.isCompare && !this.isEvent && this.model[0] instanceof Date) {
        return (
          formatDate(this.model[0], template) +
          (this.model[1] instanceof Date
            ? `-${formatDate(this.model[1], template)}`
            : "")
        );
      } else if (this.model instanceof Date) {
        return formatDate(this.model, template);
      }
      return "";
    },

    title() {
      let template: any = { month: "long", year: "numeric" };
      if (this.showingMonths || this.showingYears) {
        template = { year: "numeric" };
      }

      const title = formatDate(this.actualDate, template);
      return capitalize(title);
    },

    days() {
      const date = this.actualDate;
      const year = date.getFullYear();
      const month = date.getMonth();
      const firstDay = new Date(year, month, 1).getDay();
      const maxDays = new Date(year, month + 1, 0).getDate();
      let day = 1;
      const days = [];
      for (let i = 0; i < 6; i++) {
        const week: any = [];
        for (let j = 0; j < 7; j++) {
          if ((i === 0 && j < firstDay) || day > maxDays) {
            week.push("");
          } else {
            const newDate = new Date(year, month, day);
            week.push(newDate);
            day++;
          }
        }
        days.push(week);
      }

      return days;
    },
  },

  methods: {
    isToday,

    changeModel(value: Date[] | Date) {
      this.model = value;
      this.$emit("update:modelValue", this.model);
    },

    selectDate(date: Date) {
      if (this.isCompare && !this.isEvent) {
        if (this.model.length == 2) this.model = [];

        if (this.model.length == 1) {
          const date1 = this.model[0];

          if (
            date1.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }).substring(0, 10) >
            date.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }).substring(0, 10)
          ) {
            this.model[0] = date;
            this.model[1] = date1;
          } else {
            this.model.push(date);
          }
        } else {
          this.model[0] = date;
        }
      } else {
        this.model = date;
      }
      this.$emit("update:modelValue", this.model);
    },

    resetDate() {
      if (this.isEvent) this.changeModel(new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' })));
      else if (this.isCompare) this.changeModel([]);
      else this.changeModel(null);
    },

    changeViewMonth(day: number) {
      this.isBack = day === -1;
      this.show = false;
      const date = this.actualDate;
      date.setMonth(date.getMonth() + day);
      this.changeSelected(date);
      setTimeout(() => {
        this.show = true;
      }, 100);
    },

    showMonthsOrYears() {
      if (this.showingMonths && !this.showingYears) {
        this.showingYears = true;
        return;
      }
      this.showingMonths = !this.showingMonths;
      this.showingYears = false;
    },

    changeMonth(month: number) {
      this.showingMonths = false;
      const date = this.actualDate;
      date.setMonth(month);
      this.changeSelected(date);
    },

    changeYear(year: any) {
      this.showingMonths = false;
      this.showingYears = false;
      const date = this.actualDate;
      date.setFullYear(year);
      this.changeSelected(date);
    },

    updateSelected(value: Date) {
      const day = new Date(value).toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }).substring(0, 10);
      const calendarDay = this.actualDate.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }).substring(0, 10);
      if (day == calendarDay) return;

      this.isBack = day < calendarDay;
      this.show = false;
      this.changeSelected(value, false);

      setTimeout(() => {
        this.show = true;
      }, 100);
    },

    changeSelected(date: Date, emit: boolean = true) {
      this.calendarDate = date.getTime();
      if (emit) this.$emit("update:selected", this.calendarDate);
    },

    isDateSelected(date: Date) {
      const day = date.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }).substring(0, 10);

      if (this.isCompare && !this.isEvent) {
        if (this.model.length === 2) {
          return (
            this.model[0].toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }).substring(0, 10) <= day &&
            this.model[1].toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }).substring(0, 10) >= day
          );
        } else if (this.model.length === 1) {
          return this.model[0].toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }).substring(0, 10) == day;
        }
      } else if (this.model) {
        return new Date(this.model).toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }).substring(0, 10) == day;
      }
      return false;
    },

    isBetween(date: Date) {
      if (!this.isCompare || this.model.length !== 1) return false;

      const day = date.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }).substring(0, 10);
      const modelDay = this.model[0].toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }).substring(0, 10);
      return (
        (modelDay < day &&
          this.hoverDate >= day &&
          this.hoverDate > modelDay) ||
        (modelDay > day && this.hoverDate <= day && this.hoverDate < modelDay)
      );
    },

    isDisabled(date: Date) {
      let disabled = false;
      const day = date.toISOString().substring(0, 10);

      if (this.minDate) {
        disabled = this.minDate.toISOString().substring(0, 10) > day;
      }
      
      if (this.maxDate) {
        disabled = this.maxDate.toISOString().substring(0, 10) < day;
      }

      return disabled;
    },

    findEventByDay(day: Date) {
      return !!this.events.find(
        (event) => getEventByDate(event, day) && event.pacient_id
      );
    },
  },
};
</script>

<template>
  <div class="flex flex-col gap-base w-fit relative overflow-hidden">
    <div class="flex items-center justify-center gap-sm">
      <Transition :name="!isBack ? 'slide-fade' : 'slide-fade-out'">
        <h1 class="date-title" v-if="show" @click="showMonthsOrYears">
          {{ title }}
        </h1>
      </Transition>
      <div class="flex">
        <div class="chevron" @click="changeViewMonth(-1)">
          <Icon name="chevron_left" />
        </div>
        <div class="chevron" @click="changeViewMonth(1)">
          <Icon name="chevron_right" />
        </div>
      </div>
    </div>
    <div>
      <Transition :name="!isBack ? 'slide-fade' : 'slide-fade-out'">
        <table v-if="show">
          <tr>
            <th
              v-for="(weekDay, index) in weekDays"
              :key="index"
              class="text-gray-400 text-12 font-normal"
            >
              {{ weekDay.substring(0, isEvent ? 3 : 1) }}
            </th>
          </tr>
          <tr
            v-for="(week, index) in days"
            :key="index"
            class="date-space"
            :class="week"
          >
            <td v-for="(day, index) in week" :key="index">
              <div class="flex flex-col items-center" v-if="day">
                <div
                  class="day"
                  :class="{
                    selected: isDateSelected(day),
                    hover: hoverDate && isBetween(day),
                    disabled: isDisabled(day),
                    today: isToday(day),
                    event: isEvent,
                  }"
                  @mouseenter="hoverDate = day.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }).substring(0, 10)"
                  @mouseleave="hoverDate = null"
                  @click="selectDate(day)"
                >
                  {{ day.getDate() }}
                </div>
                <div
                  class="h-1 w-1 ml-[1px] rounded-full bg-primary-500"
                  v-if="findEventByDay(day)"
                />
              </div>
            </td>
          </tr>
        </table>
      </Transition>
    </div>
    <Transition name="appear">
      <div v-if="showingMonths && !showingYears" class="appear-card">
        <div
          v-for="(month, index) in months"
          :key="index"
          class="month-card"
          :class="{ active: actualDate.getMonth() === index }"
          @click="changeMonth(index)"
        >
          {{ month }}
        </div>
      </div>
    </Transition>
    <Transition name="appear">
      <div v-if="showingYears" class="appear-card year">
        <div
          v-for="(year, index) in years"
          :key="index"
          class="year-card"
          :class="{ active: actualDate.getFullYear() === year }"
          @click="changeYear(year)"
        >
          {{ year }}
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.chevron {
  @apply flex items-center rounded-full p-xxs cursor-pointer text-gray-400 duration-300 hover:bg-gray-200;

  .icon {
    @apply text-24;
  }
}

.day {
  @apply flex justify-center items-center min-w-[23px] text-gray-500 rounded-full m-xs px-xs py-xxs text-12 cursor-pointer hover:text-white hover:bg-primary-500;
}

.day.selected,
.day.hover {
  @apply text-white bg-primary-500;
}

.day.disabled {
  @apply pointer-events-none bg-gray-200;
}

.day.event {
  @apply hover:text-primary-500 hover:bg-primary-100;
}

.day.event.selected {
  @apply text-primary-500 bg-primary-100;
}

.day.event.today {
  @apply text-primary-500;
}

.day.event.hover {
  @apply text-gray-500 bg-transparent;
}

.date-title {
  @apply text-14 font-bold cursor-pointer text-gray-500;
}

.appear-card {
  @apply grid w-full absolute top-[40px] left-0 gap-xs p-base bg-white;
  height: calc(100% - 40px);
  grid-template-columns: 1fr 1fr 1fr;
}

.appear-card.year {
  @apply flex flex-col overflow-y-auto divide-y-1 p-0 gap-0 divide-gray-100;
}

.month-card {
  @apply flex justify-center items-center max-h-[50px] text-white rounded-4 text-14 bg-gray-200 p-sm cursor-pointer hover:bg-primary-500;
}

.month-card.active {
  @apply bg-primary-500;
}

.year-card {
  @apply w-full flex justify-center items-center text-gray-500 text-14 px-base py-xxs cursor-pointer hover:bg-primary-100 hover:text-primary-500;
}

.year-card.active {
  @apply bg-primary-100 text-primary-500;
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

.appear-enter-active {
  @apply transition-all duration-500 ease-out;
}

.appear-leave-active {
  @apply transition-all duration-500 ease-out;
}

.appear-enter-from,
.appear-leave-to {
  transform: translate(-500px, 0);
}
</style>
