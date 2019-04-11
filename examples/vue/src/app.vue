<template>
  <div>
    <div>This is Vue sample</div>
    <button id="btn" v-on:click="startTimer">Click Me</button>
    <div>
      Timer Completed:
      <span id="cnt">{{ counter }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data: () => ({
    counter: 0
  }),
  methods: {
    startTimer: function() {
      console.log('clicked');
      setTimeout(() => {
        console.log('timeouted');
        this.counter++;
      }, 2000);
    }
  }
};
</script>