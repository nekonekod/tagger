<template>
  <div id="wrapper">
    <main>
      <div class="left-side">
        <span class="title">
          Welcome to your new project!
        </span>
        <system-information></system-information>
        <br>
        <div class="doc">
          <div class="title">Detail</div>
          <pre v-html="tFileInfo"></pre>
        </div>
      </div>

      <div class="right-side">
        <div class="doc">
          <div class="title" :title="watched">Watched</div>
          <input v-model="dirPath" @keyup.enter="register"/>
          <br>
          <button @click="register">Register</button>
          <button @click="unregister">Unregister</button>
          <br><br>
        </div>
        <div class="doc">
          <div class="title">Query</div>
          <input v-model="keyword" @keyup.enter="query"/>
          <br><br>
        </div>
        <div class="doc">
          <div class="title result">Result</div>
          <ul v-for="(item,$index) in tFiles">
            <li :title="item.path" @click="detail($index)">{{ $index + 1}} : {{ item.fileName }}</li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation'

  function buildQueryParam(keyword){
    return {
      tags:keyword.split(' ')
    }
  }

  export default {
    name: 'landing-page',
    components: { SystemInformation },
    data (){
      return {
        dirPath:'/Users/nekod/Pictures',
        keyword:'',
        watched:[],
        tFiles:[],
        tFileInfo:{}
      }
    } ,
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      register (){
        this.$http.post('/fs/watch/register',{
          path:this.dirPath
        })
        .then(response => {
            // success callback
            this.watched = response.data.data
            console.log(this.watched)
        })
      },
      unregister (){
        this.$http.post('/fs/watch/unregister',{
          path:this.dirPath
        })
        .then(response => {
            // success callback
            console.log(response.data)
            this.watched = response.data.data
        })
      },
      query (){
        this.$http.post('/tfile/query',buildQueryParam(this.keyword))
        .then(response => {
            // success callback
            console.log(response.data)
            this.tFiles = response.data.data
        }, response => {
            // error callback
            console.error(response)
        })
      },
      detail(index){
        this.tFileInfo = this.tFiles[index]
        console.log(this.tFileInfo)
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }

  .left-side {
    display: flex;
    flex-direction: column;
  }

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.result {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }
/* 
  .doc button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  } */

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
  }

  pre {
    width: 30vw;
    overflow:scroll;
  }
</style>
