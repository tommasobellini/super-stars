<template>
<div class="container">
    <div>
      <b-card class="teamCard" title="Team ranking" sub-title="Best stars addicted">
        <b-list-group>
        <Ranking @click="openPerson(person.name)" v-for="person in team" :key="person.key" :id="team.indexOf(person) + 1" :name="person.name" :stars="person.totStars" :coffee="person.coffee"/>
        </b-list-group>
      </b-card>
    </div>
  </div>
</template>
<script>
import Ranking from '../../components/card/Ranking'
import firebase from 'firebase'

export default {
  components: { Ranking },
  data () {
    return {
      stars: 1,
      coffee: 0,
      name: 'Tommaso Bellini',
      team: [
      ],
      totList: []
    }
  },
  mounted () {
    console.log('mounted')
    this.readFromRealtimeDb()
  },
  methods: {
    
    async writeToRealtimeDb (name, stars, coffee) {
      var database = firebase.database();
      try {
       var splittedName = name.split(' ')
       await database.ref('/teams/Serpe/' + splittedName[0] + splittedName[1]).set({
          name: name,
          stars: stars,
          coffee: coffee
        })
      } catch (e) {
      }
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
        this.team.sort((a,b) => (a.totStars < b.totStars) ? 1 : ((b.totStars < a.totStars) ? -1 : 0)); 
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
