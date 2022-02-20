<template>
  <v-card height="900">
    <v-navigation-drawer
      color="#0C365A"
      dark
      permanent
      width="400"
      class="pl-7 pt-6"
    >
      <img
        :src="require(`../assets/PrimaryLogo.png`)"
        alt="Logo"
        width="200px"
        height="60px"
        class="mt-12"
      />
      <p class="text pt-4">Trusted way of banking for 3,000+ SMEs and startups in Singapore</p>
      <v-list class="pt-4 pl-0">
        <v-list-item-group
          v-model="selected"
          color="primary"
        >
          <v-list-item
            v-for="item in items"
            :key="item.title"
            active-class="active-class"
            class="pl-0 pt-4 pb-4 title"
          >
            <v-list-item-icon>
              <img :src="require(`../assets/${item.key}.png`)" />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>
<script>
export default {
  name: "Menu",
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