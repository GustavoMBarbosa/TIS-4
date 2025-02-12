<template>
  <Template>
    <nuxt-link class="text-primary-500 hover:underline" to="/receipts">
      < Voltar</nuxt-link
    >
    <PrintTemplate title="Recibo">
      <div class="content">
        <p><b>Recebi(emos) de:</b> {{ receipt.pacient.name }}</p>
        <div class="content-item">
          <div class="item">
            <p><b>Referente</b> a consulta médica</p>
            <p><b>Importância de</b> {{ importance }}</p>
          </div>
          <div class="item items-end text-end">
            <p>{{ date }}</p>
            <p><b>Valor:</b> R$ {{ receipt.value }}</p>
          </div>
        </div>
        <div class="content-item">
          <p><b>Emitente:</b> {{ user.name }}</p>
          <p><b>CPF:</b> {{ user.cpf }}</p>
        </div>
      </div>
    </PrintTemplate>
  </Template>
</template>

<script lang="ts">
import { formatDate } from "~/util";
import { authStore } from "~/stores/auth";

//+ Carlos R. L. Rodrigues
//@ http://jsfromhell.com/string/extenso [rev. #3]
String.prototype.extensive = function (c) {
  var ex = [
    [
      "zero",
      "um",
      "dois",
      "três",
      "quatro",
      "cinco",
      "seis",
      "sete",
      "oito",
      "nove",
      "dez",
      "onze",
      "doze",
      "treze",
      "quatorze",
      "quinze",
      "dezesseis",
      "dezessete",
      "dezoito",
      "dezenove",
    ],
    [
      "dez",
      "vinte",
      "trinta",
      "quarenta",
      "cinqüenta",
      "sessenta",
      "setenta",
      "oitenta",
      "noventa",
    ],
    [
      "cem",
      "cento",
      "duzentos",
      "trezentos",
      "quatrocentos",
      "quinhentos",
      "seiscentos",
      "setecentos",
      "oitocentos",
      "novecentos",
    ],
    [
      "mil",
      "milhão",
      "bilhão",
      "trilhão",
      "quadrilhão",
      "quintilhão",
      "sextilhão",
      "setilhão",
      "octilhão",
      "nonilhão",
      "decilhão",
      "undecilhão",
      "dodecilhão",
      "tredecilhão",
      "quatrodecilhão",
      "quindecilhão",
      "sedecilhão",
      "septendecilhão",
      "octencilhão",
      "nonencilhão",
    ],
  ];
  var a,
    n,
    v,
    i,
    n = this.replace(c ? /[^,\d]/g : /\D/g, "").split(","),
    e = " e ",
    $ = "real",
    d = "centavo",
    sl;
  for (
    var f = n.length - 1, l, j = -1, r = [], s = [], t = "";
    ++j <= f;
    s = []
  ) {
    j && (n[j] = (("." + n[j]) * 1).toFixed(2).slice(2));
    if (
      !((a = (v = n[j]).slice((l = v.length) % 3).match(/\d{3}/g)),
      (v = l % 3 ? [v.slice(0, l % 3)] : []),
      (v = a ? v.concat(a) : v)).length
    )
      continue;
    for (a = -1, l = v.length; ++a < l; t = "") {
      if (!(i = v[a] * 1)) continue;
      (i % 100 < 20 && (t += ex[0][i % 100])) ||
        ((i % 100) + 1 &&
          (t +=
            ex[1][(((i % 100) / 10) >> 0) - 1] +
            (i % 10 ? e + ex[0][i % 10] : "")));
      s.push(
        (i < 100
          ? t
          : !(i % 100)
          ? ex[2][i == 100 ? 0 : (i / 100) >> 0]
          : ex[2][(i / 100) >> 0] + e + t) +
          ((t = l - a - 2) > -1
            ? " " + (i > 1 && t > 0 ? ex[3][t].replace("ão", "ões") : ex[3][t])
            : "")
      );
    }
    a =
      (sl = s.length) > 1
        ? ((a = s.pop()), s.join(" ") + e + a)
        : s.join("") || ((!j && n[j + 1] * 1 > 0) || r.length ? "" : ex[0][0]);
    a &&
      r.push(
        a +
          (c
            ? " " +
              (v.join("") * 1 > 1
                ? j
                  ? d + "s"
                  : (/0{6,}$/.test(n[0]) ? "de " : "") + $.replace("l", "is")
                : j
                ? d
                : $)
            : "")
      );
  }
  return r.join(e);
};

export default {
  name: "ReceiptTemplate",

  setup() {
    return {
      receipt: ref({}),
      ...authStore(),
    };
  },

  beforeMount() {
    if (!this.$route.query.receipt) this.$router.back();
    this.receipt = JSON.parse(decodeURIComponent(this.$route.query.receipt));
  },

  computed: {
    date() {
      return formatDate(new Date(this.receipt.date), {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    },

    importance() {
      const parsedValue = this.receipt.value.toString().split(".");
      const reais = `${parsedValue[0].extensive()} reais`;
      let cents = "";
      if (parsedValue.length > 1)
        cents = `e ${parsedValue[1].extensive()} centavo(s)`;
      return `${reais} ${cents}`;
    },
  },
};
</script>

<style scoped>
.content {
  @apply flex flex-col gap-base;

  b {
    @apply text-gray-500;
  }
}

.content-item {
  @apply flex justify-between gap-base;
}

.item {
  @apply flex flex-col gap-sm;
}
</style>
