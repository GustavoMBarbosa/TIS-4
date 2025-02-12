<script lang="ts">
import { ref } from "vue";

export default {
  name: "PacientBiography",

  props: {
    modelValue: {
      type: Object,
      required: true,
    },
  },

  setup() {
    const sections = ref({
      zeroToSeven: "0 - 7",
      eightToFourteen: "8 - 14",
      fifteenToTwentyOne: "15 - 21",
      twentyTwoToTwentyEight: "22 - 28",
      twentyNineToThirtyFive: "29 - 35",
      thirtySixToFortyTwo: "36 - 42",
      fortyThreeToFortyNine: "43 - 49",
      fiftyToFiftySix: "50 - 56",
      fiftySevenToSixtyThree: "57 - 63",
      sixtyFourToSeventy: "64 - 70",
      seventyOneAndAbove: "71+",
    });

    return {
      sections,
    };
  },

  created() {
    this.modelValue.biography = this.modelValue.biography || {};
  },
};
</script>

<template>
  <div class="flex flex-col gap-lg">
    <div class="section-wrapper">
      <Card>
        <Input
          v-model="modelValue.biography.observations"
          text-area
          label="Observações"
        />
      </Card>
    </div>

    <div v-for="(label, key) in sections" :key="key" class="section-wrapper">
      <Collapse>
        <template #header>
          <div>{{ label }} anos</div>
        </template>
        <div>
          <Input
            v-model="modelValue.biography[key]"
            text-area
            :placeholder="`${label} anos`"
          />
        </div>
      </Collapse>
    </div>
  </div>
</template>
