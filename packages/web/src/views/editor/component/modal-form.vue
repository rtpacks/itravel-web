<script lang="ts" setup>
  import { ref } from 'vue';
  import { FileItem, Message } from '@arco-design/web-vue';
  import { ArticleModel, patchArticle, postArticle } from '@/api/article';
  import useVisible from '@/hooks/visible';
  import useLoading from '@/hooks/loading';
  import { cloneDeep } from 'lodash';
  import { uploadFile } from '@/api/upload';
  import { redirectArticle } from '@/router/utils';

  const { visible, setVisible } = useVisible();
  const { loading, setLoading } = useLoading();

  let form: Partial<ArticleModel> = {};
  let isUpdated = false;
  let uploadImages: () => Promise<string[]>;
  const states = ref({ hasThumbUrl: true, fileList: [] as FileItem[] });

  const onClose = () => {
    setVisible(false);
    setLoading(false);
  };

  const onComfirm = async () => {
    setLoading(true);
    try {
      Message.info('提交中...');
      form.images = await uploadImages();
      const { hasThumbUrl, fileList } = states.value;
      if (hasThumbUrl) {
        const formData = new FormData();
        formData.append('file', fileList[0].file as File);
        const {
          data: { url },
        } = await uploadFile(formData);

        form.thumbUrl = url;
      } else {
        form.thumbUrl = form.images?.[0];
      }

      if (isUpdated) {
        const {
          data: { id },
        } = await patchArticle(form.id as string, form);
        redirectArticle(id);
      } else {
        const {
          data: { id },
        } = await postArticle(form as ArticleModel);
        redirectArticle(id);
      }
      Message.info('提交成功');
    } finally {
      setLoading(false);
    }
  };

  const init = (
    data: ArticleModel,
    _isUpdated: boolean,

    _uploadImages: () => Promise<string[]>
  ) => {
    form = cloneDeep(data);
    isUpdated = _isUpdated;
    uploadImages = _uploadImages;
    if (isUpdated) {
      const url = form.thumbUrl || form.images?.[0];
      states.value.fileList = [
        { uid: form.thumbUrl as string, name: '缩略图', url },
      ];
      console.log(states.value.fileList);
    }
    setVisible(true);
  };
  defineExpose({ init });
</script>

<template>
  <a-modal
    v-model:visible="visible"
    :footer="false"
    :closable="false"
    :modal-style="{
      borderRadius: '12px',
    }"
    unmount-on-close
    simple
    @close="onClose"
  >
    <a-form :model="states" auto-label-width>
      <!-- <a-form-item tooltip="选择第一张作为缩略图"></a-form-item> -->
      <a-form-item
        field="hasThumbUrl"
        label="缩略图"
        tooltip="关闭时默认选择第一张作为缩略图"
      >
        <a-switch
          v-model="states.hasThumbUrl"
          checked-color="#ff7744"
          unchecked-color="#f2f3f5"
        ></a-switch>
      </a-form-item>
      <a-form-item v-if="states.hasThumbUrl">
        <!-- 图库 -->
        <a-upload
          v-model:file-list="states.fileList"
          :auto-upload="false"
          :limit="1"
          list-type="picture-card"
          image-preview
          class="w-2/3"
        >
          <template #retry-icon></template>
        </a-upload>
      </a-form-item>
    </a-form>
    <a-space class="w-full mt-4 justify-center">
      <a-button :disabled="loading" @click.stop="onClose">取消</a-button>
      <a-button :loading="loading" @click.stop="onComfirm">确定</a-button>
    </a-space>
  </a-modal>
</template>
