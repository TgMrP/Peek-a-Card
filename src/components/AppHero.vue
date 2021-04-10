<template>
  <h1 class="title">Peek-a-Card</h1>
  <section :class="$style.description">
    <p>Welcome to Peek-a-Card, a card matching game!</p>
    <p :class="$style['powered-wrapper']">
      Powered by
      <a :class="$style['powered-link']" href="https://v3.vuejs.org/">
        Vue.js 3
      </a>
      <span>, </span>
      <a
        :class="$style['powered-link']"
        href="https://www.netlify.com/?utm_source=github&utm_medium=peekavue-bh&utm_campaign=devex"
      >
        Netlify
      </a>
      <span> & </span>
      <a
        :class="$style['powered-link']"
        href="https://www.github.com/bencodezen/peek-a-vue"
      >
        GitHub
      </a>
    </p>
  </section>
</template>

<style module>
.description {
  font-family: 'Titillium Web', sans-serif;
}

.description p {
  margin: 0;
  font-size: 1rem;
}

.description p:last-child {
  margin-top: 10px;
  margin-bottom: 30px;
  font-size: 0.9rem;
}

.powered-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
}

.powered-link {
  padding: 0 5px;
}

.powered-link:first-child,
.powered-link:last-child {
  padding-right: 0;
}

.powered-logo {
  width: 18px;
}

.title {
  padding-bottom: 30px;
}
</style>
