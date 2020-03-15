<template>
  <div class="addButton">
    <p class="h1 mb-2" v-b-modal.modal-1>
      <b-icon-plus color="white"/>
    </p>
    <b-modal id="modal-1" ref="modal-1" centered hide-footer title="Add new colleague">
      <div>
        <b-input-group prepend="Complete Name" class="mt-3">
          <b-form-input v-model="completeName"></b-form-input>
        </b-input-group>
      </div>
      <div class="modalButtons">
        <b-button class="mt-3" variant="outline-danger" block @click="cancelModal">Cancel</b-button>
        <b-button class="mt-3" variant="outline-info" block @click="saveModal">Save</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { BIconPlus } from "bootstrap-vue";
import firebase from "firebase";

export default {
  name: "AddInTeam",
  components: { BIconPlus },
  data() {
    return {
      completeName: ""
    };
  },
  watch: {
    completeName() {}
  },
  methods: {
    addInTeam() {
      alert("add in team");
    },
    saveModal() {
      if (this.completeName !== "") {
        this.writeToRealtimeDb(this.completeName, 0, 0, 0);
        this.$refs["modal-1"].hide();
      }
      this.$emit('saved', true)
    },
    cancelModal() {
      this.$refs["modal-1"].hide();
    },
    async writeToRealtimeDb(name, stars, coffee, totStars) {
      var database = firebase.database();
      try {
        var splittedName = name.split(" ");
        await database
          .ref("/teams/Serpe/" + splittedName[0] + splittedName[1])
          .set({
            name: name,
            stars: stars,
            coffee: coffee,
            totStars: totStars
          });
      } catch (e) {}
    }
  }
};
</script>

<style scoped>
.addButton {
  width: 50px;
  margin-bottom: 1vh;
  height: 50px;
  background-color: #3b8070;
  opacity: 0.8;
  border-radius: 50%;
}
.modalButtons {
  display: flex;
  flex-direction: row;
}
</style>