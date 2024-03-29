<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { getRandSpots } from '@/api/spot';
  import type { ITour } from '@/api/spot';
  import { redirectSpot } from '@/router/utils';
  import { limitMaxLength } from '@/utils/format';

  export interface IProps {
    line: 1 | 2;
  }

  const props = withDefaults(defineProps<IProps>(), { line: 2 });

  const tours = ref<ITour[]>();

  const init = async () => {
    const { data } = await getRandSpots();
    tours.value = data.slice(0, 8);
  };

  onMounted(async () => {
    init();
  });
</script>

<template>
  <section>
    <!-- 前四个 -->
    <div class="flex justify-around">
      <template v-for="(item, index) in tours" :key="item.id">
        <div
          v-if="index < 4"
          class="card w-1/4 bg-base-100 p-4 hover-card"
          style="height: 400px"
        >
          <img
            :src="item.thumbUrl"
            class="shadow-xl h-1/2 rounded-lg"
            style="object-fit: cover"
            alt="Shoes"
          />
          <div class="card-body">
            <h2 class="text-xl font-semibold truncate"> {{ item.name }} </h2>
            <p>
              {{ limitMaxLength(item.description) }}
              <a class="link link-hover link-primary">
                [ {{ item.region }} ]
              </a>
            </p>
            <div class="card-actions justify-end">
              <button class="btn btn-primary" @click="redirectSpot(item.id)">
                Watch
              </button>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- 后四个 -->
    <div v-if="line === 2" class="flex justify-around">
      <template v-for="(item, index) in tours" :key="item.id">
        <div
          v-if="index >= 4"
          class="card w-1/4 bg-base-100 p-4 hover-card"
          style="height: 400px"
        >
          <img
            :src="item.thumbUrl"
            class="shadow-xl h-1/2 rounded-lg"
            style="object-fit: cover"
            :alt="item.name"
          />
          <div class="card-body">
            <h2 class="text-xl font-semibold truncate"> {{ item.name }} </h2>
            <p>
              {{ limitMaxLength(item.description) }}
              <a class="link link-hover link-primary">
                [ {{ item.region }} ]
              </a>
            </p>
            <div class="card-actions justify-end">
              <button class="btn btn-primary" @click="redirectSpot(item.id)">
                Watch
              </button>
            </div>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<style scoped>
  /* less 结合 tailwind 会出现问题 */
  .card-title {
    min-width: 0;
    max-width: 200px;
  }

  .truncate {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .hover-card,
  .hover-img {
    transition: all 0.33s;
  }

  .hover-card:hover {
    @apply w-1/2;
  }

  .hover-img:hover {
    transform: scale(1.14);
  }
</style>
