<template>
  <div>
    <v-card
      flat
      :color="backgroundColor"
      class="container mt-7"
    >
      <v-row
        justify="space-around"
        align="center"
        class="pt-5 pb-5"
      >
        <v-col>
          <v-row
            justify="space-around"
            align="center"
          >
            <img
              @click="$emit('freezeCard', value)"
              :src="require('../assets/actions/freezeCard.png')"
              width="35px"
            />
          </v-row>
          <v-row
            justify="space-around"
            align="center"
            class="pt-2"
          >
            <span>{{ items[value] && items[value].status == "ACTIVE" ? "Freeze card" : "Unfreeze card" }}</span>
          </v-row>
        </v-col>
        <v-col>
          <v-row
            justify="space-around"
            align="center"
          >
            <img
              :src="require('../assets/actions/setSpendLimit.png')"
              width="35px"
            />
          </v-row>
          <v-row
            justify="space-around"
            align="center"
            class="pt-2"
          >
            <span>Set spend limit</span>
          </v-row>
        </v-col>
        <v-col>
          <v-row
            justify="space-around"
            align="center"
          >
            <img
              :src="require('../assets/actions/gPay.png')"
              width="35px"
            />
          </v-row>
          <v-row
            justify="space-around"
            align="center"
            class="pt-2"
          >
            <span>Add to GPay</span>
          </v-row>
        </v-col>
        <v-col>
          <v-row
            justify="space-around"
            align="center"
          >
            <img
              :src="require('../assets/actions/replaceCard.png')"
              width="35px"
            />
          </v-row>
          <v-row
            justify="space-around"
            align="center"
            class="pt-2"
          >
            <span>Replace card</span>
          </v-row>
        </v-col>
        <v-col>
          <v-row
            justify="space-around"
            align="center"
          >
            <img
              @click="$emit('cancelCard', value)"
              :src="require('../assets/actions/cancelCard.png')"
              width="35px"
            />
          </v-row>
          <v-row
            justify="space-around"
            align="center"
            class="pt-2"
          >
            <span>Cancel card</span>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script>
export default {
  name: "ActionCard",
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Number,
      default: 0,
    },
    backgroundColor: {
      type: String,
      default: "#EDF3FF",
    },
  },
  data() {
    return {};
  },
};
</script>
<style scoped>
.container {
  border-radius: 15px;
  color: #0c365a !important;
}
@media only screen and (max-width: 900px) {
  span {
    font-size: 11px;
  }
  .container {
    border-radius: 15px 15px 0 0;
  }
}
</style>