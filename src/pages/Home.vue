<template>
  <v-container>
    <Modal
      @close="open = $event"
      @add="addNewCard"
      :open="open"
      :disbaled="!valid"
      :validateBtn="true"
      title="Add new card"
    >
      <v-form
        v-model="valid"
        slot="content"
      >
        <v-text-field
          v-model="newCard.cardName"
          :rules="[v => !!v || 'Required']"
          label="Enter card name"
        ></v-text-field>
      </v-form>
    </Modal>
    <Modal
      @close="deleteCard = $event"
      @add="cancelCard"
      :open="deleteCard"
      primaBtnLabel="Yes"
    >
      <v-card-text
        slot="content"
        class="d-flex text-center justify-center align-center font-weight-bold text-h5"
      >
        <font color="#0c365a">Are you sure you want to delete this card ?</font>
      </v-card-text>
    </Modal>
    <v-row
      justify="space-between"
      align="center"
      class="mobile"
      :class="isMobile ? 'pt-8 pl-5 pr-5' : 'pt-12'"
    >
      <v-col class="pa-5">
        <v-row>
          <span class="pl-3 mobile-text-color">Available balance</span>
        </v-row>
        <v-row justify="start" align="center">
          <v-col cols="3" sm="2" xs="2" md="1" xl="1">
            <div class="currency">S$</div>
          </v-col>
          <v-col>
            <div class="amount pl-2 mobile-text-color">3,000</div>
          </v-col>
        </v-row>
      </v-col>
      <v-col class="justify-end">
        <v-row
          v-if="isMobile"
          justify="end"
          align="center"
        >
          <img
            :src="require(`../assets/Logo.png`)"
            width="40px"
            height="40px"
            class="mr-5"
          />
        </v-row>
        <v-row
          justify="end"
          align="center"
          class="pt-2"
        >
          <v-btn
            @click="open = true"
            :color="isMobile ? '#23CEFD' : '#325BAF'"
            :text="isMobile"
            dark
            class="text-none"
          >
            <v-icon class="pr-3">mdi-plus-circle</v-icon>New card
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
    <v-tabs
      :background-color="isMobile ? '#0C365A' : ''"
      class="mobile"
    >
      <v-tabs-slider color="primary"></v-tabs-slider>
      <v-tab class="text-none mobile-text-color">My debit cards</v-tab>
      <v-tab class="text-none mobile-text-color"> All company cards</v-tab>
      <v-tab-item>
        <v-card outlined>
          <v-card-title
            v-if="!isMobile"
            class="title justify-center pb-0 mobile"
          >
            <v-icon
              @click="showCardnumber = !showCardnumber"
              small
              color="#01D167"
            >mdi-eye</v-icon>
            <font
              @click="showCardnumber = !showCardnumber"
              color="#01D167"
              class="pa-2"
            >Show card number</font>
          </v-card-title>
          <v-card-text class="pt-0">
            <v-container>
              <v-row justify="space-around">
                <v-col
                  cols="12"
                  sm="6"
                  lg="7"
                  xl="6"
                  md="1"
                  class="pr-0 pl-0 mobile pb-0"
                >
                  <Carousel
                    v-if="cards && cards.length"
                    @input="carousel = $event"
                    @showCardNumber="showCardnumber = $event"
                    :items="cards"
                    :hide-delimiter="true"
                    :mask="showCardnumber"
                    :isMobile="isMobile"
                    :height="isMobile ? '300' : '350'"
                    message="Note: This card has been forzen"
                    card-color="#01d167"
                  >
                    <img
                      slot="primary-image"
                      :src="require(`../assets/AspireLogo.png`)"
                      width="130px"
                      height="40px"
                    />
                    <img
                      slot="secondary-image"
                      :src="require(`../assets/VisaLogo.png`)"
                      width="100px"
                      height="30px"
                    />
                  </Carousel>
                  <ActionCard
                    v-if="cards && cards.length"
                    @freezeCard="freezeCard(carousel)"
                    @cancelCard="deleteCard = true"
                    :value="carousel"
                    :items="cards"
                    background-color="#EDF3FF"
                    class="pr-2 pl-2"
                  ></ActionCard>
                  <v-card
                    v-else
                    class="d-flex align-center justify-center mobile"
                  >
                    <v-card
                      height="300"
                      class="disabled card-container"
                      flat
                      outlined
                    >
                      <span>No cards are avilable, click on "New card" button to add your new card.</span>
                    </v-card>
                  </v-card>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  lg="5"
                >
                  <ExpansionPanel
                    v-if="Object.keys(cardInformation).length"
                    :items="cardInformation"
                  ></ExpansionPanel>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>
<script>
import Modal from "../components/Modal.vue";
import Carousel from "../components/Carousel.vue";
import ExpansionPanel from "../components/ExpansionPanel.vue";
import ActionCard from "../components/ActionCard.vue";
import { getData } from "../utility";

export default {
  props: {
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Modal,
    Carousel,
    ExpansionPanel,
    ActionCard,
  },
  data() {
    return {
      valid: false,
      showCardnumber: false,
      carousel: 0,
      panel: 1,
      open: false,
      deleteCard: false,
      newCard: {
        cardName: undefined,
        cardNumber: "1234567821212020",
        expirationDate: "12/20",
        cvv: "222",
        status: "ACTIVE",
      },
      cards: [
        {
          cardName: "Mark Henry",
          cardNumber: "1234567821212020",
          expirationDate: "12/20",
          cvv: "222",
          status: "ACTIVE",
        },
      ],
      cardInformation: {},
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    addNewCard() {
      this.open = false;
      this.newCard.cardNumber = this.generateCardNumber();
      this.newCard.cvv = Math.floor(Math.random() * (999 - 100 + 1) + 100);
      this.newCard.expirationDate = this.generateData();
      this.cards.push(this.newCard);
      this.clearData();
    },
    cancelCard() {
      this.deleteCard = false;
      this.cards.splice(this.carousel, 1);
    },
    freezeCard(index) {
      if (this.cards[index].status == "FROZEN") {
        this.cards[index].status = "ACTIVE";
      } else {
        this.cards[index].status = "FROZEN";
      }
    },
    clearData() {
      this.newCard = {
        cardName: "",
        cardNumber: "",
        expirationDate: "",
        cvv: "",
        status: "ACTIVE",
      };
    },
    generateData() {
      let date = new Date();
      let dateString = new Date(date.setFullYear(date.getFullYear() + 5));
      return `${("0" + dateString.getMonth()).slice(-2)}/${dateString.getFullYear().toString().substr(-2)}`;
    },
    generateCardNumber() {
      let str = "";
      for (let i = 0; i < 4; i++) {
        str += (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
      }
      return str;
    },
    async getData() {
      try {
        let response = await getData();
        if (response) {
          this.cardInformation = response.data.cardInformation;
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
<style scoped>
.disabled {
  background-color: #edf3ff;
  align-items: center;
  display: flex;
  justify-content: center;
  font-size: 20px;
  text-align: center;
}
.v-expansion-panel-header {
  background-color: #f5f9ff;
  height: 70px !important;
  color: #0c365a;
}
.list .title {
  font-size: 13pt !important;
  font-weight: 400;
}
.list .subtitle {
  display: flex;
}
.sub-title {
  font-size: 10pt !important;
  opacity: 0.7;
}
.card-container {
  border-radius: 15px;
}
.currency {
  width: 30pt;
  height: 20pt;
  background-color: #01d167;
  border-radius: 4pt;
  color: #fff;
  font-size: 12pt;
  text-align: center;
  justify-content: center;
  padding-top: 2px;
}
.amount {
  font-size: 2rem;
  font-weight: bold;
}
.title {
  font-size: 14px !important;
  cursor: pointer;
}
.text {
  color: #fff;
  opacity: 0.3;
  font-size: 15pt;
}
.v-tab--active {
  color: #000 !important;
}
@media only screen and (max-width: 900px) {
  .mobile {
    background-color: #0c365a;
  }
  .mobile-text-color {
    color: #fff !important;
  }
  .container {
    padding: 0px !important;
  }
  .card-container {
    width: 90%;
    height: 250px !important;
    border-radius: 25px !important;
    margin: 15px 0 25px 0;
  }
}
</style>
