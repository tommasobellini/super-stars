<template>
  <b-list-group-item>
    <div class="itemInList">
      <div>{{ id }}. {{ name }}</div>
      <!-- <b-modal id="modal-2" ref="modal-2" centered hide-footer :title="name">
        <div class="starCoffeeSection">
          <div style="font-size: 80px;">
            <b-icon-star-fill @click="changeStarColor" :color="starColor"  :style="deleteLastStar ? 'opacity: 10;' : 'opacity: 100;'"/>
          </div>
          <br />
          <br />
          <a v-show="imgCoffee == true" @click="changeCoffeeIcon">
            <img src="../../assets/coffee-shop.svg" width="80"  :style="deleteLastStar ? 'opacity: 10;' : 'opacity: 100;'"/>
          </a>
          <a v-show="imgCoffee == false" @click="changeCoffeeIcon">
            <img src="../../assets/coffee-shop-green.svg" width="80"  :style="deleteLastStar ? 'opacity: 10;' : 'opacity: 100;'"/>
          </a>
        </div>
        <div>
          <b-check v-model="deleteLastStar" :value="true">Delete last star</b-check>
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
      </b-modal> -->
      <div class="icon-sec">
        <div>
          <BIconStarFill color="#fce903" style="font-size: 20;" />
          <b-badge variant="primary">{{ stars }}</b-badge>
        </div>
        <div v-if="coffee > 0">
          <img src="../../assets/coffee-shop.svg" width="15" v-for="cof in coffee" :key="cof.key" />
          <b-badge variant="danger">{{ coffee }}</b-badge>
        </div>
      </div>
    </div>
  </b-list-group-item>
</template>
<script>
import { BIconStarFill } from "bootstrap-vue";
import firebase from "firebase";

export default {
  name: "Ranking",
  components: { BIconStarFill },
  data() {
    return {
      starColor: "",
      imgCoffee: true,
      deleteLastStar: false
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
        let totStars = null
        let totCoffee = null
        console.log(stars);
        console.log(coffee);
        console.log(starColor);
        console.log(imgCoffee);
        if (this.deleteLastStar) {
          totStars = stars - 1;
          totCoffee = coffee;
        } else {
          totStars = starColor === "" ? stars + 0 : stars + 1;
          totCoffee = imgCoffee == true ? coffee + 0 : coffee + 1;
        }

        console.log(totStars);
        console.log(totCoffee);
        await teamsRef.set({
          name: name,
          stars: totStars,
          coffee: totCoffee
        });
        this.$refs["modal-2"].hide();
        this.stars = totStars;
        this.coffee = totCoffee;
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
    id: {
      type: Number
    },
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
</style>
