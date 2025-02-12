<template>
  <Template :title="isTablet ? 'Agenda' : null">
    <div class="flex gap-2xl h-full">
      <div class="calendar-container" v-if="!isTablet">
        <h1 class="title">Agenda</h1>
        <Card class="calendar-card items-center justify-center">
          <Date
            v-model="date"
            v-model:selected="date"
            :events="appointmentsWithPacient"
            is-event
          />
        </Card>
        <Card class="calendar-card">
          <template v-if="todayAppointments.length">
            <h2 class="text-16 font-bold text-gray-500">Hoje</h2>
            <div
              v-for="appointment in todayAppointments"
              :key="appointment.id"
              class="flex justify-between gap-xs"
            >
              <div class="flex items-center gap-xs">
                <div class="w-[8px] h-[8px] rounded-full bg-primary-500" />
                <span class="text-12 text-gray-500">{{
                  appointment.pacient && appointment.pacient.name
                    ? appointment.pacient.name
                    : "Ausente"
                }}</span>
              </div>
              <div class="flex items-center gap-xs text-gray-400">
                <Icon name="schedule" class="text-14" />
                <span class="text-12"
                  >{{ formatTime(appointment.startDate) }} -
                  {{ formatTime(appointment.endDate) }}</span
                >
              </div>
            </div>
          </template>
          <template v-else>
            <div
              class="flex-1 text-14 text-gray-400 flex items-center justify-center gap-sm"
            >
              <Icon name="schedule" />
              {{ loading ? "Carregando..." : "Sem consultas hoje" }}
            </div>
          </template>
        </Card>
      </div>
      <Weekly
        v-model="date"
        :events="appointments"
        :is-phone="isPhone"
        @select="editAppointment"
      >
        <template #actions>
          <RoundButton @click="formOpened = true" />
        </template>
      </Weekly>
    </div>

    <Sidebar
      v-model="formOpened"
      title="Agendamento"
      width="fit-content"
      :loading="formLoading"
      @update:model-value="closeSidebar"
      @save="saveAppointment"
    >
      <template #actions v-if="newAppointment.id">
        <div class="delete" @click="deleteDialog = true">
          <Icon name="delete" />
        </div>
      </template>

      <div class="flex flex-col gap-lg">
        <div class="flex items-end gap-xs">
          <DatePicker
            v-model="newAppointment.startDate"
            label="Início"
            required
          />
          <span class="text-12 text-gray-500 mb-sm">-</span>
          <Input
            v-model="newAppointment.startHour"
            icon="schedule"
            placeholder="00:00"
            mask="time"
            required
          />
        </div>
        <div class="flex items-end gap-xs">
          <DatePicker
            v-model="newAppointment.endDate"
            label="Término"
            required
            :min-date="
              newAppointment.startDate
                ? new Date(newAppointment.startDate)
                : null
            "
          />
          <span class="text-12 text-gray-500 mb-sm">-</span>
          <Input
            v-model="newAppointment.endHour"
            icon="schedule"
            placeholder="00:00"
            mask="time"
            required
          />
        </div>
        <Select
          v-model="newAppointment.pacient"
          :items="pacients"
          label-key="name"
          label="Paciente"
          class="flex-1"
          :loading="formLoading"
          :required="!hasPacient"
          :disabled="hasPacient"
          @update:model-value="(pacient: Pacient) => newAppointment.pacient_id = pacient.id"
        />
        <Checkbox v-model="hasPacient" @update:model-value="resetPacient"
          >Ausente</Checkbox
        >
        <RadioGroup
          v-model="newAppointment.frequency"
          :items="frequencyOptions"
          vertical
        />
      </div>
    </Sidebar>
    <DeleteAppointmentDialog
      v-model="deleteDialog"
      :appointment="newAppointment"
      @confirm="handleDeleteConfirm"
    />
  </Template>
</template>

<script lang="ts">
import { ref } from "vue";
import { formatTime, isToday } from "~/util";
import DeleteAppointmentDialog from "~/views/appointment/DeleteDialog.vue";

export default {
  name: "Agenda",

  components: {
    DeleteAppointmentDialog,
  },

  async setup() {
    try {
      const { listPacients } = usePacients();
      const pacients = ref(await listPacients());

      return {
        isPhone: ref(true),
        isTablet: ref(true),
        formOpened: ref(false),
        formLoading: ref(false),
        date: ref(null),
        period: ref(new Date()),
        appointments: ref([]),
        pacients,
        newAppointment: ref({
          frequency: "ONCE",
        }),
        listPacients,
        loading: ref(true),
        deleteDialog: ref(false),
        hasPacient: ref(false),
        ...useEvents(),
        ...useAppointments(),
      };
    } catch (error) {
      console.error("Error initializing setup:", error);
      return {
        isPhone: ref(false),
        isTablet: ref(false),
      };
    }
  },

  computed: {
    todayAppointments() {
      return this.appointments?.filter(
        (appointment: Appointment) => {
          const cleanedDates =
            appointment.canceledAppointmentDates?.replace(/\\/g, '').replace(/[{}]/g, '').replace(/"/g, '') || '';

          const canceledDates = cleanedDates ? cleanedDates.split(',').map((date) => date.trim()) : [];

          const deleted = canceledDates.find((date: string) => isSameDay(new Date(date), new Date()));
          return appointment.pacient?.name && isToday(new Date(appointment.startDate)) && !deleted;
        }
      ) || [];
    },

    appointmentsWithPacient() {
      return (
        this.appointments?.filter(
          (appointment: Appointment) => !!appointment.pacient_id
        ) || []
      );
    },

    frequencyOptions() {
      return [
        {
          value: "ONCE",
          label: "Repertir só uma vez",
        },
        {
          value: "DAILY",
          label: "Todos os dias",
        },
        {
          value: "WEEKLY",
          label: "Semanal",
        },
        {
          value: "MONTHLY",
          label: "Mensal",
        },
      ];
    },
  },

  beforeMount() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },

  async mounted() {
    this.handleResize();
    await this.getAppointments();
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },

  methods: {
    async getAppointments() {
      this.loading = true;
      this.appointments = await this.listAppointments();
      this.loading = false;
    },

    formatTime(date: Date) {
      return formatTime(new Date(date));
    },

    handleResize() {
      this.isPhone = window?.innerWidth <= 768;
      this.isTablet = window?.innerWidth <= 1145;
    },

    closeSidebar() {
      this.formOpened = false;
      this.formLoading = false;
      this.newAppointment = {
        frequency: "ONCE",
      };
      this.hasPacient = false;
    },

    resetPacient() {
      this.newAppointment.pacient = null;
      this.newAppointment.pacient_id = null;
    },

    editAppointment(appointment: Appointment) {
      this.newAppointment = { ...appointment };
      this.newAppointment.startHour = formatTime(
        new Date(appointment.startDate)
      );
      this.newAppointment.endHour = formatTime(new Date(appointment.endDate));
      this.hasPacient = !appointment.pacient_id;
      this.formOpened = true;
    },

    async saveAppointment() {
      if (
        !this.newAppointment.startDate &&
        !this.newAppointment.startHour &&
        !this.newAppointment.endDate &&
        !this.newAppointment.endHour &&
        !this.newAppointment.pacient &&
        !this.hasPacient
      ) {
        this.alert({
          message: "Preencha todos os campos obrigatórios antes de salvar",
          type: "error",
          timeout: 3000,
        });
        return;
      }

      this.newAppointment.startDate = new Date(
        `${new Date(this.newAppointment.startDate)
          .toISOString()
          .substring(0, 10)}T${this.newAppointment.startHour}`
      );
      this.newAppointment.endDate = new Date(
        `${new Date(this.newAppointment.endDate)
          .toISOString()
          .substring(0, 10)}T${this.newAppointment.endHour}`
      );

      if (
        this.newAppointment.startDate.getTime() >
        this.newAppointment.endDate.getTime()
      ) {
        this.alert({
          message: "A data de início deve ser menor que a data de término",
          type: "error",
          timeout: 3000,
        });
        return;
      }

      delete this.newAppointment.startHour;
      delete this.newAppointment.endHour;
      delete this.newAppointment.pacient;
      this.formLoading = true;

      try {
        if (this.newAppointment.id) {
          await this.updateAppointment(this.newAppointment);
        } else {
          await this.createAppointment(this.newAppointment);
        }
        this.alert({
          message: "Agendamento salvo com sucesso",
          type: "success",
          timeout: 3000,
        });
        await this.getAppointments();
      } catch {
        this.alert({
          message: "Erro ao salvar agendamento",
          type: "error",
          timeout: 3000,
        });
      }

      this.closeSidebar();
    },

    async handleDeleteConfirm(type: string) {
      try {
        this.formLoading = true;
        await this.deleteAppointment(this.newAppointment, type);
        this.alert({
          message: "Agendamento deletado com sucesso",
          type: "success",
          timeout: 3000,
        });
        await this.getAppointments();
      } catch {
        this.alert({
          message: "Erro ao deletar agendamento",
          type: "error",
          timeout: 3000,
        });
      }

      this.closeSidebar();
    },
  },
};
</script>

<style scoped>
.calendar-container {
  @apply flex flex-col gap-base;
}

.title {
  @apply text-24 font-bold text-gray-500;
}

.calendar-card {
  @apply flex flex-col gap-sm min-w-[275px] min-h-[258px] max-h-[50%] w-fit overflow-auto;
}

.delete {
  @apply flex items-center gap-xs p-xs cursor-pointer text-gray-400 select-none font-bold text-12 hover:bg-gray-100 ease-in-out duration-300 rounded-full w-fit;

  .icon {
    @apply text-24;
  }
}
</style>
