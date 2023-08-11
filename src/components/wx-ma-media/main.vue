<template>
  <div>
    <img
      v-if="isUrl"
      :style="'width: ' + width + 'px; ' + 'height: ' + height + 'px'"
      :src="url"
    />
    <img
      v-if="showImg && mediaData"
      :style="'width: ' + width + 'px; ' + 'height: ' + height + 'px'"
      :src="'data:image/jpg;base64,' + mediaData"
    />
    <el-upload
      v-if="disabled == false"
      :action="'/weixin/wxmamedia/upload?mediaType=image&appId=' + appId"
      :show-file-list="false"
      :headers="headers"
      :on-success="uploadSuccess"
    >
      <el-button type="text">上传</el-button>
    </el-upload>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import { getMaMedia } from "@/api/wxma/wxapp";

export default {
  name: "wx-ma-media",
  components: {},
  props: {
    appId: {
      type: String,
    },
    showImg: {
      type: Boolean,
      default() {
        return true;
      },
    },
    width: {
      type: Number,
      default() {
        return 100;
      },
    },
    height: {
      type: Number,
      default() {
        return 100;
      },
    },
    url: {
      type: String,
    },
    disabled: {// 是否禁用编辑
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      headers: {
        Authorization: "Bearer " + store.getters.access_token,
      },
      mediaId: null,
      mediaData: null,
    };
  },
  created() {
    this.getMedia();
  },
  // 计算属性
  computed: {
    ...mapGetters(["permissions"]),
    // 是否是url
    isUrl() {
      return this.url && this.url.indexOf("http") == 0;
    },
  },
  methods: {
    uploadSuccess(response, file, fileList) {
      if (response.code != 0) {
        this.$message({
          showClose: true,
          message: "上传出错" + response.msg,
          type: "error",
        });
      } else {
        this.mediaId = response.data.mediaId;
        this.$emit("change", this.mediaId);
        this.getMedia();
      }
    },
    getMedia() {
      if (this.mediaId) {
        getMaMedia(this.appId, this.mediaId)
          .then((response2) => {
            let mediaData = response2.data.data;
            this.mediaData = mediaData;
          })
          .catch(() => {});
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
