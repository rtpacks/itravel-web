<script lang="ts" setup>
  import { ref } from 'vue';
</script>

<template>
  <div class="itravel-article-card">
    <!-- 个人信息 -->
    <a-row class="text-center pt-1 pb-1" align="center">
      <a-col :span="4">
        <a-avatar>A</a-avatar>
      </a-col>
      <a-col :span="16" class="text-left">
        <a-row>
          <a-col :span="12" class="font-bold truncate">人间不值得</a-col>
          <a-col :span="12" class="truncate">官方精选讲师</a-col>
        </a-row>
        <a-row class="text-xs">{{ new Date().toLocaleDateString() }}</a-row>
      </a-col>
      <a-col :span="4" class="text-sm"> <span>关注</span> </a-col>
    </a-row>

    <!-- 文章简略信息展示 -->
    <a-row justify="center" class="pt-1 pb-1">
      <a-col :span="22">
        <a-row class="mt-1 mb-1">
          <a-col :span="14" class="truncate font-bold">
            朱自清《荷塘月色》片段
          </a-col>
        </a-row>
        <a-row style="text-indent: 2rem">
          <a-typography-text
            type="secondary"
            :ellipsis="{
              rows: 2,
            }"
            class="text-sm mt-2 mb-2"
          >
            路上只我一个人，背着手踱着。这一片天地好像是我的;我也像超出了平常旳自己，到了另一世界里。我爱热闹，也爱冷静;爱群居，也爱独处。像今晚上，一个人在这苍茫旳月下，什么都可以想，什么都可以不想，便觉是个自由的人。白天里一定要做的事，一定要说的话，现在都可不理。这是独处的妙处，我且受用这无边的荷香月色好了。
          </a-typography-text>
        </a-row>
        <a-row>
          <a-image
            width="100%"
            height="170px"
            fit="cover"
            alt="图片描述"
            show-loader
            src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
            style="border-radius: var(--itravel-secondary-radius)"
          />
        </a-row>
      </a-col>
    </a-row>

    <!-- 操作栏 -->
    <a-row justify="center" align="center" class="pt-1 pb-1 text-sm">
      <a-col :span="22">
        <a-row justify="space-between" align="center">
          <a-col :span="12">
            <a-row align="center">
              <a-avatar-group :size="24" :max-count="3" z-index-ascend>
                <a-avatar :style="{ backgroundColor: '#7BC616' }">A</a-avatar>
                <a-avatar :style="{ backgroundColor: '#14C9C9' }">B</a-avatar>
                <a-avatar :style="{ backgroundColor: '#168CFF' }">C</a-avatar>
                <a-avatar :style="{ backgroundColor: '#FF7D00' }"
                  >Arco</a-avatar
                >
                <a-avatar :style="{ backgroundColor: '#FFC72E' }">
                  Design
                </a-avatar>
              </a-avatar-group>
              <span class="align-middle">等喜欢</span>
            </a-row>
            <a-row class="mt-1" style="color: var(--itravel-text-third-color)">
              共{{ Math.floor(Math.random() * 1000) }}评论
            </a-row>
          </a-col>
          <a-col :span="12">
            <a-space
              fill
              class="float-right"
              style="color: var(--itravel-text-third-color)"
            >
              <IconFont type="icon-xihuan" :size="16"></IconFont>
              <IconFont type="icon-shoucang" :size="16"></IconFont>
              <IconFont type="icon-pinglun" :size="16"></IconFont>
              <IconFont type="icon-map-pin-range-fill" :size="16"></IconFont>
            </a-space>
          </a-col>
        </a-row>

        <!-- <a-row class="mt-1">
          <a-col>
            <a-row
              v-for="item in 2"
              :key="item"
              style="color: var(--itravel-text-secondary-color)"
              class="mt-1 text-xs"
            >
              <a-col :span="6" class="truncate">人间四月是清明</a-col>
              <a-col :span="14" class="truncate">
                ：太好看了求机位点：太好看了求机位点
              </a-col>
            </a-row>
          </a-col>
        </a-row> -->

        <a-row justify="center" class="mt-2 text-center">
          <a-col>查看更多评论 ></a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<style lang="less" scoped>
  .itravel-article-card {
    width: 96%;
    margin: 12px auto;
    padding: 16px 4px;
    border-radius: 12px;
    box-shadow: 0 0 12px 2px rgba(131, 131, 131, 0.2);
  }
</style>