<template>
  <div class="container">
    <div>
      <b-card class="teamCard" title="Serpe Team" sub-title="Stars in progress">
        <div class="bottonDiv">
          <AddInTeam @saved="onSaved"/>
        </div>
        <b-list-group>
          <ItemListCard @click="openPerson(person.name)" v-for="person in team" :key="person.key" :name="person.name" :stars="person.stars" :coffee="person.coffee"/>
        </b-list-group>
      </b-card>
      
    </div>
  </div>
</template>

<script>
import ItemListCard from '../components/card/ItemListCard'
import AddInTeam from '../components/card/AddInTeam'
import firebase from 'firebase'

export default {
  components: {
    ItemListCard,
    AddInTeam
  },
  data () {
    return {
      team: [
      ],
      totList: []
    }
  },
  mounted () {
    this.readFromRealtimeDb()
  },
  methods: {
    onSaved() {
      this.readFromRealtimeDb();
    },
    async readFromRealtimeDb () {
      var database = firebase.database();
      const teamsRef = database.ref('/teams/Serpe')
      try {
        const snapshot = await teamsRef.once('value')
        let data = Object.values(snapshot.val())
        data.forEach(item => {
          this.team = data;
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 50px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.teamCard {
  margin-top: 5vh;
  width: 80vw;
  height: 70vh;
}

.bottonDiv {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
