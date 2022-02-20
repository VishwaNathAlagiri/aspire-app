<template>
  <v-app>
    <v-row
      no-gutters
      class="main"
    >
      <v-col
        lg="2"
        class="d-none d-lg-block"
      >
        <Menu :items="menu" />
      </v-col>
      <v-col lg="8">
        <router-view :isMobile="isMobile"></router-view>
      </v-col>
    </v-row>
    <Footer
      v-if="isMobile"
      :items="menu"
      class="footer"
    ></Footer>
  </v-app>
</template>
<script>
import Menu from "./components/Menu.vue";
import Footer from "./components/Footer.vue";
import { menu } from "./config/appConfiguration.json";

export default {
  name: "App",
  components: {
    Menu,
    Footer,
  },
  data() {
    return {
      menu,
    };
  },
  computed: {
    isMobile() {
      return this.$store.state.isMobile;
    },
  },
  mounted() {
    this.loadscreenWidth();
  },
  methods: {
    loadscreenWidth() {
      let screenWidth = window.innerWidth;
      if (screenWidth < 860) {
        this.setIsMobile(true);
      } else {
        this.setIsMobile(false);
      }
    },
    setIsMobile(flag) {
      this.$store.commit("setScreen", flag);
    },
  },
};
</script>
<style scoped>
.main {
  padding-bottom: 80px;
}
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 70px;
  background-color: #fff;
  z-index: 1;
}
</style>