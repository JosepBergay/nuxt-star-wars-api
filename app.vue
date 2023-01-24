<template>
  <Head>
    <Title>STAR WARS</Title>
    <Meta type="description" content="Long long time ago..." />
  </Head>
  <header >
    <nav>
      <ul class="header">
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li><NuxtLink to="/films">Films</NuxtLink></li>
        <li><NuxtLink to="/admin">Admin</NuxtLink></li>
      </ul>
    </nav>
  </header>
  <div class="flex">
    <!-- <NuxtWelcome /> -->
    <NuxtPage />
  </div>
</template>

<style>
.header {
  display: flex;
  min-width: 100%;
  justify-content: center;
  padding: 0px;
  /* flex-direction: column; */
}
.header>li {
  margin: 20px
}
.router-link-active {
  background-color: teal;
  color: white;
}
</style>