<template>
  <div>
    <v-carousel
      v-model="carousel"
      @change="$emit('input', carousel)"
      :height="height"
      :hide-delimiter-background="hideDelimiter"
      :show-arrows-on-hover="true"
    >
      <v-carousel-item
        v-for="(item, index) in items"
        :key="index"
      >
        <div
          v-if="isMobile"
          class="d-flex justify-end show-card-container"
          :class="{ frozen: item.status == 'FROZEN' }"
        >
          <div class="show-card">
            <v-icon
              @click="$emit('showCardNumber', !mask)"
              small
              color="#01D167"
              class="pt-2"
            >mdi-eye</v-icon>
            <font
              @click="$emit('showCardNumber', !mask)"
              color="#01D167"
              class="pa-1"
            >Show card number</font>
          </div>
        </div>
        <v-card
          :color="cardColor"
          :height="height"
          dark
          outlined
          class="pa-2 container"
          :class="{ frozenCard: item.status == 'FROZEN' }"
        >
          <div :class="isMobile ? 'pa-2' : 'pa-9'">
            <div class="float-right">
              <slot name="primary-image" />
            </div>
            <p
              class="font-weight-bold display-1 name"
              :class="isMobile ? 'mt-6 pt-5' : 'mt-12 pt-5'"
            >{{ item.cardName }}</p>
            <v-row
              v-if="!mask"
              justify="start"
              no-gutters
              :class="isMobile ? 'pt-0' : 'pt-3'"
            >
              <v-col
                v-for="(ele, index) of 3"
                cols="3"
                :key="index"
              >
                <span
                  v-for="(n, i) of 4"
                  :key="i"
                  class="dot"
                ></span>
              </v-col>
              <v-col>
                <span
                  v-for="(n, i) of getCardNumber(item.cardNumber).split('')"
                  :key="i"
                  class="digits"
                >{{ n }}</span>
              </v-col>
            </v-row>
            <v-row
              v-else
              justify="start"
              no-gutters
              :class="isMobile ? 'pt-0' : 'pt-3'"
            >
              <v-col
                v-for="(ele, index) of 4"
                :key="index"
              >
                <span
                  v-for="(n, i) of getCardNumber(item.cardNumber)[index]"
                  :key="i"
                  class="digits"
                >{{ n }}</span>
              </v-col>
            </v-row>
            <v-row
              justify="space-between"
              class="pa-3 number-container"
              :class="isMobile ? 'pt-0' : 'pt-1'"
            >
              <v-col
                cols="5"
                lg="4"
                xl="5"
                class="pl-0 sub-text"
              >Thru: {{ item.expirationDate }}</v-col>
              <v-col
                cols="4"
                lg="2"
                class="sub-text pr-0 d-flex flex-row-reverse"
              >CVV:</v-col>
              <v-col
                cols="3"
                class="sub-text"
                :class="{ star: !mask }"
              >{{ !mask ? "***" : item.cvv }}</v-col>
            </v-row>
            <div class="float-right">
              <slot name="secondary-image" />
            </div>
          </div>
        </v-card>
      </v-carousel-item>
    </v-carousel>
    <span
      v-if="message && items[carousel] && items[carousel].status == 'FROZEN'"
      class="error-message container"
    >{{ message }}</span>
    <span v-else>&nbsp;</span>
  </div>
</template>
<script>
export default {
  name: "Carousel",
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    height: {
      type: [String, Number],
      default: 350,
    },
    hideDelimiter: {
      type: Boolean,
      default: false,
    },
    showArrows: {
      type: Boolean,
      default: false,
    },
    cardColor: {
      type: String,
      default: "white",
    },
    mask: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      default: undefined,
    },
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      carousel: 0,
    };
  },
  methods: {
    getCardNumber(number) {
      if (this.mask) {
        let arr = [];
        arr.push(number.substr(0, 4));
        arr.push(number.substr(4, 4));
        arr.push(number.substr(8, 4));
        arr.push(number.substr(12, 4));
        return arr;
      } else {
        return number.substr(-4);
      }
    },
  },
};
</script>
<style scoped>
.card-number-container {
  display: flex;
  align-items: center;
  justify-self: start;
}
.container {
  border-radius: 15px;
  position: relative;
}
.sub-text {
  font-size: 18px;
  font-weight: 500;
  display: inline-block;
  align-items: center;
  position: relative;
}
.frozen {
  visibility: hidden;
}
.frozenCard {
  opacity: 0.5;
}
.dot {
  height: 12px;
  width: 12px;
  background-color: #fff;
  border-radius: 50%;
  display: inline-block;
  margin: 2px;
  align-items: center;
}
.digits {
  font-size: 22px;
  font-weight: 700;
  display: inline-block;
  margin: -7px 0 0 2px;
}
/* .dot:nth-of-type(4n), .digits:nth-of-type(4n) {
  /* margin-right: 30px; 
} */
.error-message {
  color: #ff0000;
}
.number-container {
  width: 70%;
}
.star {
  font-size: 26px;
  padding: 16px 0 0 10px;
}
@media only screen and (max-width: 900px) {
  .container {
    width: 90%;
    height: 250px !important;
  }
  .name {
    font-size: 23px !important;
  }
  .sub-text {
    font-size: 17px;
  }
  .number-container {
    width: 100%;
  }
  .star {
    font-size: 26px;
    padding: 16px 0 0 10px;
  }
  .show-card {
    align-items: flex-start;
    justify-content: center;
    width: 170px;
    height: 40px;
    display: flex;
    background-color: #fff;
    border-radius: 5px 5px 0 0;
  }
  .show-card-container {
    position: relative;
    right: 21px;
    top: 11px;
  }
}
</style>