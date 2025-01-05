<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError,
})

const handleErrorHB = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="w-full relative bg-[#051D49] h-screen overflow-hidden">
    <img
      src="/images/404.png"
      class="w-full h-full object-cover"
      alt=""
    >
    <div class="absolute top-0 left-0 w-full h-full z-20 flex items-center justify-center">
      <div class="flex flex-col px-5 items-center justify-center gap-5">
        <h1 class="text-[100px] lg:text-[192px] leading-[192px] font-butlerLight-Arial text-white text-center">
          {{ props?.error?.statusCode }}
        </h1>
        <div class="">
          <h1 class="text-white title-40 font-butlerLight-Arial text-center">
            You’re Lost
          </h1>
          <p class="text-center pt-2 pb-5 text-white font-butlerLight-Arial title-20">
            The page you're looking for is no longer here.
          </p>
          <p class="max-w-[588px] text-white text-center">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti consequuntur, facere exercitationem sunt
            quasi a.
          </p>
          <div class="w-full flex lg:flex-row flex-col items-center lg:gap-10 gap-5 justify-center lg:mt-20 mt-10">
            <button @click="handleErrorHB">
              <SharedButtonComponent arrow-variant="white">
                <p class="text-white font-bold">
                  Return to Homepage
                </p>
              </SharedButtonComponent>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
