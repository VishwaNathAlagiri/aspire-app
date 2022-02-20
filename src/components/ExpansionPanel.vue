<template>
  <div>
    <v-expansion-panels v-model="panel">
      <v-expansion-panel v-for="(item, i) in items" :key="i">
        <v-expansion-panel-header>
          <img
            :src="require(`../assets/groups/${item.key}.png`)"
            class="img-container"
          />
          {{ item.title }}
          <template v-slot:actions>
            <div class="panel-icon">
              <v-icon color="#0c365a">$expand</v-icon>
            </div>
          </template></v-expansion-panel-header
        >
        <v-expansion-panel-content>
          <v-list>
            <v-list-item-group class="pl-3 pr-3">
              <template v-for="(element, index) in item.items">
                <v-list-item :key="index" class="pa-0 ma-0">
                  <template v-slot:default="{}">
                    <v-list-item-icon>
                      <div
                        class="icon-container"
                        :style="{ 'background-color': element.iconColor }"
                      >
                        <img
                          :src="
                            require(`../assets/transactions/${element.icon}.png`)
                          "
                          class="icon"
                        />
                      </div>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>{{
                        element.storeName
                      }}</v-list-item-title>
                      <v-list-item-subtitle>{{
                        element.transactionDateTime
                      }}</v-list-item-subtitle>
                      <v-list-item-subtitle class="pt-2">
                        <div
                          style="
                            background-color: #325baf;
                            width: 33px;
                            height: 19px;
                            border-radius: 10px;
                            display: flex;
                            float: left;
                          "
                        >
                          <v-icon small color="#fff" class="pl-2"
                            >mdi-credit-card</v-icon
                          >
                        </div>
                        <span class="pl-2">{{ element.reason }}</span>
                      </v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-list-item-action-text
                        class="action-text font-weight-bold"
                        :class="{
                          'action-style': element.type == 'CREDIT',
                        }"
                      >
                        {{ element.type == "CREDIT" ? "+" : "-" }}
                        S$
                        {{ element.amount }}
                      </v-list-item-action-text>
                    </v-list-item-action>
                  </template>
                </v-list-item>
                <v-divider
                  v-if="index < item.items.length - 1"
                  :key="index"
                ></v-divider>
              </template>
            </v-list-item-group>
          </v-list>
          <v-card color="#EDFFF5" flat class="footer">
            <v-card-text class="d-flex justify-center">
              <font color="#01D167">View all card transactions</font>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<script>
export default {
  name: "ExpansionPanel",
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      panel: 1,
    };
  },
};
</script>
<style scoped>
.v-expansion-panel-header {
  background-color: #f5f9ff;
  height: 70px !important;
  color: #0c365a;
}
.v-expansion-panel-header > *:not(.v-expansion-panel-header__icon) {
  flex: initial;
}
.panel-icon {
  width: 20px;
  height: 20px;
  border-radius: 50px;
  background-color: #d7e0f0;
  align-items: center;
  justify-content: center;
  display: flex;
}
.action-text {
  font-size: 14px;
}
.action-style {
  color: #01d167 !important;
}
.img-container {
  width: 25px;
  height: 25px;
  margin-right: 10px;
}
.icon-container {
  width: 60px;
  height: 60px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  display: flex;
}
.icon-container .icon {
  width: 25px;
  height: 25px;
}
.sub-container {
  border: 1px #ddffec;
}
</style>
<style lang="scss" >
.v-expansion-panel-content__wrap {
  padding: 0 !important;
}
@media only screen and (max-width: 900px) {
  .v-card__subtitle, .v-card__text, .v-card__title {
    padding: 0px;
  }
  .footer {
    height: 50px;
    display: flex;
    align-items: center;
  }
}
</style>