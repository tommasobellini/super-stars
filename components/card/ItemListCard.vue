<template>
  <b-list-group-item>
    <div class="itemInList" @click="openPerson(name)">
      <div>{{ name }}</div>
      <b-modal id="modal-2" ref="modal-2" centered hide-footer :title="name">
        <div class="starCoffeeSection">
          <div style="font-size: 80px;">
            <b-icon-star-fill
              @click="changeStarColor"
              :color="starColor"
              :style="deleteLastStar ? 'opacity: 10;' : 'opacity: 100;'"
            />
          </div>
          <br />
          <br />
          <a v-show="imgCoffee == true" @click="changeCoffeeIcon">
            <img
              src="../../assets/coffee-shop.svg"
              width="80"
              :style="deleteLastStar ? 'opacity: 10;' : 'opacity: 100;'"
            />
          </a>
          <a v-show="imgCoffee == false" @click="changeCoffeeIcon">
            <img
              src="../../assets/coffee-shop-green.svg"
              width="80"
              :style="deleteLastStar ? 'opacity: 10;' : 'opacity: 100;'"
            />
          </a>
        </div>
        <div class="deleteLasts">
          <div>
            <b-check switch v-model="deleteLastStar" :value="true">Delete last star</b-check>
          </div>
          <div>
            <b-check switch v-model="deleteLastCoffee" :value="true">Delete last coffee</b-check>
          </div>
        </div>
        <div class="modalButtons">
          <b-button class="mt-3" variant="outline-danger" block @click="cancelModal">Cancel</b-button>
          <b-button
            class="mt-3"
            variant="outline-info"
            block
            @click="saveStarsCoffee(name, starColor, imgCoffee)"
          >Save</b-button>
        </div>
      </b-modal>
      <div class="icon-sec">
        <div>
          <BIconStarFill color="#fce903" style="font-size: 20;" />
          <b-badge variant="primary">{{ stars }}</b-badge>
        </div>
        <div v-if="coffee > 0">
          <img src="../../assets/coffee-shop.svg" width="15" />
          <b-badge variant="danger">{{ coffee }}</b-badge>
        </div>
      </div>
    </div>
  </b-list-group-item>
</template>
<script>
import { BIconStarFill } from "bootstrap-vue";
import firebase from "firebase";
import axios from "axios";

export default {
  name: "ItemListCard",
  components: { BIconStarFill },
  data() {
    return {
      starColor: "",
      imgCoffee: true,
      deleteLastStar: false,
      deleteLastCoffee: false,
      confirmStar: false,
      confirmCoffee: false
    };
  },
  methods: {
    openPerson(name) {
      console.log("clicked");
      this.$refs["modal-2"].show();
    },
    saveModal() {
      if (this.completeName !== "") {
        this.writeToRealtimeDb(this.completeName, 0, 0);
        this.$refs["modal-2"].hide();
      }
    },
    cancelModal() {
      this.$refs["modal-2"].hide();
    },
    changeStarColor() {
      this.starColor === ""
        ? (this.starColor = "#fce903")
        : (this.starColor = "");
    },
    changeCoffeeIcon() {
      console.log("clickeddd");
      this.imgCoffee = !this.imgCoffee;
    },
    async saveStarsCoffee(name, starColor, imgCoffee) {
      console.log("clickkkkkk");
      console.log(name);
      var database = firebase.database();
      var splittedName = name.split(" ");
      console.log(splittedName);
      const teamsRef = database.ref(
        "/teams/Serpe/" + splittedName[0] + splittedName[1]
      );
      try {
        const app = this;
        const snapshot = await teamsRef.once("value");
        let data = snapshot.val();
        const stars = data["stars"];
        const coffee = data["coffee"];
        const totalStars = data["totStars"];
        let totStars = null;
        let totCoffee = null;
        let tot2Stars = null;
        if (this.deleteLastStar && totStars >= 0) {
          totStars = stars - 1;
          tot2Stars = totalStars - 1;
          totCoffee = coffee;
        } else {
          totStars = starColor === "" ? stars + 0 : stars + 1;
          totCoffee = imgCoffee == true ? coffee + 0 : coffee + 1;
          tot2Stars = totalStars + 1;
        }
        if (this.deleteLastCoffee && totCoffee >= 0) {
          totCoffee = coffee - 1;
        }
        console.log(totStars);
        if (totStars == 5) {
          totStars = 0;
          totCoffee = coffee + 1;
        }
        await teamsRef.set({
          name: name,
          stars: totStars,
          coffee: totCoffee,
          totStars: tot2Stars
        });
        this.$refs["modal-2"].hide();
        this.stars = totStars;
        this.coffee = totCoffee;
        if (stars != totStars) {
          this.confirmStar = true;
        }
        if (coffee != totCoffee) {
          this.confirmCoffee = true;
        }
        if (this.confirmStar == true && this.confirmCoffee == false) {
          console.log("ciao");
          axios.post(
            "https://hooks.slack.com/services/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",
            { json: { text: "New Star assigned to " + name } }
          ).then((resp) => {
            console.log(resp)
          })
        }
        if (this.confirmStar == false && this.confirmCoffee == true) {
          axios.post(
            "https://hooks.slack.com/services/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",
            { json: { text: "New Coffee assigned to " + name } }
          );
        }
        if (this.confirmStar == true && this.confirmCoffee == true) {
          axios.post(
            "https://hooks.slack.com/services/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",
            { json: { text: "New Star and Coffee assigned to " + name } }
          );
        }
        this.confirmStar = false;
        this.confirmCoffee = false;
      } catch (e) {
        console.log(e);
      }
      //     var splittedName = name.split(" ");
      //     await database
      //       .ref("/teams/Serpe/" + splittedName[0] + splittedName[1])
      //       .set({
      //         name: name,
      //         stars: stars,
      //         coffee: coffee
      //       });
    }
  },
  props: {
    name: {
      type: String,
      default: ""
    },
    stars: {
      type: Number,
      default: 0
    },
    coffee: {
      type: Number,
      default: 0
    }
  }
};
</script>
<style scoped>
.itemInList {
  display: flex;
  justify-content: space-between;
}
.icon-sec {
  display: flex;
}
.icon-sec div {
}
.modalButtons {
  display: flex;
  flex-direction: row;
}
.starCoffeeSection {
  height: 30vh;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.deleteLasts {
  display: flex;
  justify-content: space-between;
}
</style>
