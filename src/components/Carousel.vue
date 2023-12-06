<script setup>

</script>

<template>
  <div class="title">
    <h3>Dein Läufigkeitstracker - Gesundheit und Wohlbefinden deiner Hündin</h3>
  </div>
  <div id="carouselExampleIndicators" class="carousel slide">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <div>
        <p>kurze EInführung in die App und der Funktionaliäten</p></div>
      </div>
      <div class="carousel-item">
         <div>
          <p>Ein interaktiver Kalender, in dem Benutzer den Beginn und die Dauer der Läufigkeit ihrer Hündin verfolgen können.
            Benutzer können Notizen über Veränderungen im Verhalten oder in der Gesundheit ihrer Hündin hinzufügen</p></div>
      </div>
      <div class="carousel-item">
        <div>
        <p>Symptome und Warnsignale</p>
         <p> Liste von Symptomen, auf die Benutzer achten sollten, wenn ihre Hündin läufig ist.
          Warnsignale für mögliche Gesundheitsprobleme während der Läufigkeit.
        </p></div>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<style scoped>
  .carousel-item{
    height: 70vh;
  }
  .carousel-item div{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1rem;
    color: aliceblue;
    font-weight: bold;
  }
  .title{
    margin-top: 1rem;
    margin-bottom: 1rem;
    text-align: center;
    color: aliceblue;
  }
</style>
