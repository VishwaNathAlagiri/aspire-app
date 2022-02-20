<template>
  <v-card
    outlined
    flat
    color="#fff"
  >
    <v-row>
      <v-col
        v-for="item in items"
        :key="item.title"
      >
        <v-row
          justify="space-around"
          align="center"
        >
          <img
            :src="require(`../assets/footer/${item.key}.png`)"
            :width="item.key == 'Card' ? '26px' : '20px'"
            class="pt-2"
          />
        </v-row>
        <v-row
          justify="space-around"
          align="center"
          class="pt-1"
        >
          <span>{{ item.title }}</span>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
export default {
  name: "Footer",
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selected: 1,
    };
  },
  methods: {},
};
</script>
<style scoped>
.text {
  color: #fff;
  opacity: 0.3;
  font-size: 13pt;
}
.title {
  font-size: 14px !important;
  cursor: pointer;
}
.active-class {
  font-weight: 900;
  color: #01d167 !important;
}
</style>